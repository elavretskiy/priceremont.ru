class Admin::TagsController < Admin::BaseController
  defaults resource_class: Tag, collection_name: 'collection',
           instance_name: 'resource'

  add_breadcrumb 'Комментарии', :admin_tags_path

  has_scope :search

  protected

  def collection
    collection = policy_apply_scopes_collection.index.page(params[:page])
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def set_model
    @model = Tag
  end
end
