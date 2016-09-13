# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  role                   :integer          default(1), not null
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :async, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  include IndexPage
  attr_accessor :current_password

  has_many :articles
  has_many :comments, dependent: :nullify
  has_many :articles_comments, through: :articles, source: :comments

  enum role: { admin: 0, user: 1 }

  validates :email, uniqueness: true
  validates :email, :role, presence: true

  validates :password, :password_confirmation, presence: true,
            length: { within: 6..40 }, on: :create

  validates :password, :password_confirmation, presence: true,
            length: { within: 6..40 }, on: :update,
            if: lambda { password.present? || password_confirmation.present? }

  before_destroy :set_articles_as_nullify

  scope :by_ids, -> ids { where(id: ids) }
  scope :without_ids, ->(ids) { where.not(id: ids) }

  scope :by_role, -> role {
    where(role: User.roles[role]) if role != 'all'
  }

  scope :search, -> q {
    where = 'CAST(users.id AS TEXT) LIKE (:q) OR lower(email) LIKE lower(:q)'
    where(where, q: "%#{q}%")
  }

  def collection_roles
    roles = admin? ? User.roles : {}
    roles.map { |key, value| [I18n.t("roles.#{key}"), key] }
  end

  def profile?
    self.class.name == 'Profile'
  end

  private

  def set_articles_as_nullify
    articles_comments.update_all(commentable_id: nil)
    articles.update_all(user_id: nil)
  end
end
