class Admin::ArticlesController < Admin::BaseController
  defaults resource_class: Article, collection_name: 'collection',
           instance_name: 'resource'

  add_breadcrumb 'Статьи', :admin_articles_path

  has_scope :search
  has_scope :by_is_published, as: :filter, using: [:by_is_published],
            type: :hash, default: { by_is_published: 'all' }

  def new
    @resource = current_user.articles.new(created_at: Time.current)
    new_breadcrumb
    authorize [@namespace, @resource]
    new!
  end

  def create
    @resource = current_user.articles.new
    authorize [@namespace, @resource]
    @resource.assign_attributes update_params
    create! { |success, failure| create_respond_json(success, failure) }
  end

  def update
    authorize [@namespace, @resource]
    if @resource.update(update_params)
      success_update_render_json
    else
      failure_render_json
    end
  end

  protected

  def collection
    collection = policy_apply_scopes_collection.index.page(params[:page])
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def set_model
    @model = Article
  end

  def update_params
    params = resource_params
    params[:created_at].blank? ? params.except(:created_at) : params
  end

  def index_render_json
    @collection.as_json_include_admin_collection(current_user)
  end

  def show_render_json
    @resource.as_json_include_admin_show_resource(current_user)
  end

  def edit_render_json
    @resource.as_json_include_admin_edit_resource
  end
end
