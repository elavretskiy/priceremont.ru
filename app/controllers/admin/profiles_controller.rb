class Admin::ProfilesController < Admin::BaseController
  defaults resource_class: Profile, collection_name: 'collection', instance_name: 'resource'

  add_breadcrumb 'Профиль', :admin_profile_path

  def update
    authorize [@namespace, @resource]
    if @resource.update(update_params)
      sign_in @resource, bypass: true
      success_update_render_json
    else
      failure_render_json
    end
  end

  protected

  def collection
    collection = policy_apply_scopes_collection
    get_collection_ivar || set_collection_ivar(collection)
  end

  private

  def update_params
    params = resource_params
    case true
    when params[:password_confirmation].blank? && params[:password].blank?
      params.except(:password_confirmation, :password)
    when params[:password].blank?
      params.except(:password)
    when params[:password_confirmation].blank?
      params.except(:password_confirmation)
    else
      params
    end
  end

  def set_model
    @model = Profile
  end

  def set_resource
    @resource = policy_scope([@namespace, @model]).find(current_user.id)
  end

  def show_breadcrumb
  end

  def edit_breadcrumb
    add_breadcrumb Breadcrumbs.text(params), edit_admin_profile_path
  end

  def success_update_redirect
    'admin_profile_path'
  end

  def set_path
    @path = 'admin/users/'
  end
end
