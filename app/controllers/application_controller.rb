class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :set_layout

  private

  def set_layout
    return 'admin_lte_2_login' if devise_controller?
    if request.xhr?
      admin? ? 'admin_wrapper' : 'main_wrapper'
    else
      admin? ? 'admin_lte_2' : 'application'
    end
  end


  def admin?
    self.class.parent == Admin
  end
end
