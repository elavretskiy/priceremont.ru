class Admin::UsersController < Admin::BaseController
  defaults resource_class: User, collection_name: 'collection', instance_name: 'resource'

  add_breadcrumb 'Пользователи', :admin_users_path

  has_scope :search
  has_scope :by_role, as: :filter, using: [:by_role],
            type: :hash, default: { by_role: 'all' }

  protected

  def collection
    collection = policy_apply_scopes_collection.index.page(params[:page])
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def set_model
    @model = User
  end
end
