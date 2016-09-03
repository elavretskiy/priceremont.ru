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

class Profile < User
  validates :current_password, presence: true, length: { within: 6..40 },
            on: :update, if: :validate_current_password?

  validate :current_password_valid?, on: :update,
           if: :validate_current_password?

  def current_password_valid?
    return if User.find(id).valid_password?(current_password)
    errors.add(:current_password, 'указан неверно')
  end

  private

  def validate_current_password?
    password.present? || current_password.present? || password_confirmation.present?
  end
end
