class Admin::MainController < Admin::BaseController
  def index
    skip_authorization
  end
end
