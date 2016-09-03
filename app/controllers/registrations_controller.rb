class RegistrationsController < Devise::RegistrationsController
  before_action :check_captcha, only: [:create]

  private

  def check_captcha
    return if verify_recaptcha
    self.resource = resource_class.new sign_up_params
    resource.valid?
    flash.now[:alert] = 'Ошибка ввода капчи'
    render :new
  end
end
