# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  text             :text             not null
#  commentable_id   :integer
#  commentable_type :string
#  user_id          :integer
#  role             :string           default("comments")
#  created_at       :datetime
#  updated_at       :datetime
#

class Comment < ActiveRecord::Base
  include IndexPage

  include ActsAsCommentable::Comment

  belongs_to :commentable, :polymorphic => true
  belongs_to :user

  belongs_to :article, -> { where(comments: {commentable_type: 'Article'}) },
             foreign_key: 'commentable_id'

  validates :text, :user_id, presence: true

  default_scope -> {
    where.not(user_id: nil, commentable_id: nil).order(created_at: :desc)
  }

  scope :search, -> q {
    where = 'CAST(comments.id AS TEXT) LIKE (:q) OR ' +
            'lower(comments.text) LIKE lower(:q)'
    where(where, q: "%#{q}%")
  }

  scope :index_includes, -> user {
    user.admin? ? includes(:commentable, :user) : includes(:commentable)
  }

  def self.as_json_include(user)
    return { include: { commentable: { only: [:id, :title] } } } if !user.admin?
    { include: { commentable: { only: [:id, :title] }, user: { only: [:id, :email] } } }
  end
end
