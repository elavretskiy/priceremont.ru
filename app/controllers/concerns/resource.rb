module Resource
  extend ActiveSupport::Concern

  included do
    inherit_resources

    include Pundit

    rescue_from Exception, with: :render_server_error
    rescue_from Pundit::NotAuthorizedError, with: :render_not_authorized_error

    after_action :verify_authorized

    respond_to :json

    before_action :set_model, :set_namespace, :set_path
    before_action :set_resource, only: [:show, :edit, :update, :destroy]

    def index
      authorize [@namespace, @model]
      index! { |format| format.json { render json: index_respond_json } }
    end

    def show
      authorize [@namespace, @resource]
      show_breadcrumb
      show! { |format| format.json { render json: show_render_json } }
    end

    def new
      @resource = @model.new
      new_breadcrumb
      authorize [@namespace, @resource]
      new!
    end

    def edit
      authorize [@namespace, @resource]
      edit_breadcrumb
      edit! { |format| format.json { render json: edit_render_json } }
    end

    def create
      @resource = @model.new
      authorize [@namespace, @resource]
      @resource.assign_attributes resource_params
      create! { |success, failure| create_respond_json(success, failure) }
    end

    def update
      authorize [@namespace, @resource]
      if @resource.update(resource_params)
        success_update_render_json
      else
        failure_render_json
      end
    end

    def destroy
      authorize [@namespace, @resource]
      destroy! { |format| destroy_respond_json(format) }
    end

    private

    def policy_apply_scopes_collection
      apply_scopes(policy_scope([@namespace, end_of_association_chain]))
        .index.page(params[:page])
    end

    def resource_params
      params.require(model_name.to_sym).permit(policy([@namespace, @resource]).permitted_attributes)
    end

    def set_resource
      @resource = policy_scope([@namespace, @model]).find(params[:id])
    end

    def create_respond_json(success, failure)
      success.json { success_create_render_json }
      failure.json { failure_render_json }
    end

    def failure_render_json
      # msg = @resource.errors.full_messages.uniq.join(', ')
      render json: { errors: @resource.errors }, status: 422
    end

    def index_respond_json
      {
        total_count: @collection.total_count,
        collection: index_render_json,
        page: params[:page] || 1,
        search: params[:search],
        filter: params[:filter],
        page_size: @collection.limit_value
      }
    end

    def index_render_json
      @collection
    end

    def show_render_json
      @resource
    end

    def edit_render_json
      @resource
    end

    def success_create_render_json
      success_render_json(success_created_message, success_create_redirect)
    end

    def success_update_render_json
      success_render_json(success_updated_messages, success_update_redirect)
    end

    def success_render_json(msg, redirect_to)
      render json: { "#{model_name}": @resource, msg: msg, redirect_to: redirect_to }
    end

    def destroy_respond_json(format)
      format.json { success_render_json(success_destroyed_message,
                                        success_destroy_redirect) }
    end

    def success_updated_messages
      t('activerecord.successful.messages.created')
    end

    def success_created_message
      t('activerecord.successful.messages.created')
    end

    def success_destroyed_message
      t('activerecord.successful.messages.destroyed')
    end

    def success_update_redirect
      success_redirect
    end

    def success_create_redirect
      success_redirect
    end

    def success_destroy_redirect
      success_redirect
    end

    def success_redirect
      "#{params[:controller].sub('/', '_')}_path"
    end

    def show_breadcrumb
      add_breadcrumb Breadcrumbs.text(params), [@namespace, @resource]
    end

    def new_breadcrumb
      add_breadcrumb Breadcrumbs.text(params), [:new, @namespace, model_name.to_sym]
    end

    def edit_breadcrumb
      add_breadcrumb Breadcrumbs.text(params), [:edit, @namespace, @resource]
    end

    def set_model; end

    def model_name
      @model.model_name.to_s.underscore
    end

    def set_path
      @path = "#{params[:controller]}/"
    end

    def set_namespace
      @namespace = self.class.parent.to_s.downcase.to_sym
    end

    def render_server_error(e, msg = nil)
      msg = msg || 'Ошибка сервера. Повторите попытку'
      ExceptionNotifier.notify_exception(e, env: request.env, data: { message: msg })
      render_error(msg, 422)
    end

    def render_not_authorized_error
      render_error('У Вас недостаточно прав для выполнения данных действий', 403)
    end

    def render_error(msg, status)
      return render json: { msg: msg }, status: status if request.xhr?
      redirect_to request.referrer || root_path, alert: msg
    end

    def authenticate_user?
      raise Pundit::NotAuthorizedError if !user_signed_in?
    end
  end
end
