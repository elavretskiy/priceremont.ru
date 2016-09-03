class Admin::CommentsController < Admin::BaseController
  defaults resource_class: Comment, collection_name: 'collection',
           instance_name: 'resource'

  add_breadcrumb 'Комментарии', :admin_comments_path

  has_scope :search

  def new
    @resource = current_user.comments.new
    new_breadcrumb
    authorize [@namespace, @resource]
    new!
  end

  def create
    @resource = current_user.comments.new
    authorize [@namespace, @resource]
    @resource.assign_attributes resource_params
    create! { |success, failure| create_respond_json(success, failure) }
  end

  protected

  def collection
    collection = policy_apply_scopes_collection.index.page(params[:page])
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def set_model
    @model = Comment
  end

  def index_render_json
    @collection.index_includes(current_user).as_json(Comment.as_json_include(current_user))
  end

  def show_render_json
    @resource.as_json(Comment.as_json_include(current_user))
  end
end
