class Main::ArticlesController < Main::BaseController
  include Resource

  defaults resource_class: Article, collection_name: 'collection',
           instance_name: 'resource'

  has_scope :search
  has_scope :by_tag, as: :filter, using: [:by_tag],
            type: :hash, default: { by_tag: 'all' }

  def update
    authorize [@namespace, @resource]
    params = resource_params[:comment].merge(user_id: current_user.id)
    if @resource.comments.create params
      success_update_render_json
    else
      failure_render_json
    end
  end

  protected

  def collection
    collection = policy_apply_scopes_collection.index.page(params[:page]).per(5)
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def set_model
    @model = Article
  end

  def show_breadcrumb
    add_breadcrumb Breadcrumbs.text(params), [@resource]
  end

  def success_update_redirect
    nil
  end

  def index_render_json
    @collection.as_json_include_main_collection
  end

  def show_render_json
    @resource.as_json_include_main_resource
  end

  def set_resource
    @resource = if request.xhr?
                  policy_scope([@namespace, @model])
                    .includes(comments: :user)
                    .by_ids(params[:id]).limit(1).first
                else
                  policy_scope([@namespace, @model]).find(params[:id])
                end
  end
end
