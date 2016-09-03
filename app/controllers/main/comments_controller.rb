class Main::CommentsController < Main::BaseController
  include Resource

  before_action :authenticate_user?

  defaults resource_class: Comment, collection_name: 'collection',
           instance_name: 'resource'

  has_scope :search

  def create
    @resource = current_user.comments.new
    authorize [@namespace, @resource]
    @resource.assign_attributes resource_params
    create! { |success, failure| create_respond_json(success, failure) }
  end

  private

  def set_model
    @model = Comment
  end

  def success_create_redirect
    nil
  end

  def success_created_message
    'Комментарий успешно создан'
  end
end
