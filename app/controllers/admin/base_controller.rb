class Admin::BaseController < ApplicationController
  before_action :authenticate_user!

  include Resource

  add_breadcrumb 'Главная', :admin_root_path

  private

  def set_namespace
    @namespace = :admin
  end
end
