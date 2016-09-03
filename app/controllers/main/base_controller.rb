class Main::BaseController < ApplicationController
  include Resource

  add_breadcrumb 'Статьи', :root_path
end
