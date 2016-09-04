module PunditHelper
  def pundit_new_btn
    return page_header_btn if params[:action] == 'new'
    return if !policy([@namespace, @model]).new?

    params = {
      class: 'btn btn-success btn-sm',
      'ng-if': pundit_ng_if_btn(policy([@namespace, @model]).new?, :new)
    }

    html = link_to [:new, @namespace, model_resource], params do
      content_tag :i, '', class: 'glyphicon glyphicon-plus'
    end

    page_header_btn(html)
  end

  def pundit_show_btn(with_td = true)
    params = {
      class: 'btn btn-primary btn-sm',
      'ui-sref': "#{pundit_namespase}#{model_resource}_path(#{ctrl_resource})",
      'ng-if': pundit_ng_if_btn(policy([@namespace, @model]).show?, :show)
    }

    html = content_tag :a, params do
      content_tag :i, '', class: 'glyphicon glyphicon-eye-open'
    end

    return html if !with_td

    content_tag :td do
      content_tag :div, html, class: 'btn-group-vertical'
    end
  end

  def pundit_edit_btn
    return '' if params[:action] == 'edit' || params[:action] == 'new'

    params = {
      class: 'btn btn-primary btn-sm',
      'ui-sref': "edit_#{pundit_namespase}#{model_resource}_path(#{ctrl_resource})",
      'ng-if': pundit_ng_if_btn(policy([@namespace, @model]).edit?, :edit, :true),
      'ui-sref-active': 'hidden'
    }

    content_tag :a, params do
      content_tag :i, '', class: 'glyphicon glyphicon-edit'
    end
  end

  def pundit_destroy_btn
    return '' if params[:action] == 'new'

    params = {
      class: 'btn btn-danger btn-sm',
      'ng-click': "ctrl.destroy(#{ctrl_resource})",
      'ng-if': pundit_ng_if_btn(policy([@namespace, @model]).edit?, :destroy, :true)
    }

    content_tag :a, params do
      content_tag :i, '', class: 'glyphicon glyphicon-trash'
    end
  end

  def pundit_show_actions_btn
    content = pundit_table_actions_btn
    page_header_btn(content)
  end

  def pundit_table_actions_btn
    edit = pundit_edit_btn
    destroy = pundit_destroy_btn

    content_tag :td do
      content_tag :div, class: 'btn-group-vertical' do
        edit.present? ? edit + ' ' + destroy : destroy
      end
    end
  end

  def pundit_sidebar_menu(model, ui_sref, fa, title)
    return if !policy([@namespace, model]).index?

    content_tag :li, 'ui-sref-active': 'active' do
      link_to [@namespace, model], 'ui-sref': ui_sref do
        html = content_tag :i, '', class: "fa #{fa}"
        html + content_tag(:span, title)
      end
    end
  end

  def page_header_btn(btn = '')
    content_tag :div, btn, class: 'page-header'
  end

  private

  def ctrl_resource
    actions = ['show', 'edit', 'update', 'create', 'new']
    resource = model_resource
    actions.include?(params[:action]) ? "ctrl.#{resource}" : resource
  end

  def model_resource
    @model.model_name.to_s.underscore
  end

  def model_collection
    model_resource.pluralize(3)
  end

  def pundit_ng_if_btn(policy, action, with_resource = false)
    ng_if = if with_resource
      "(#{ctrl_resource}.id && #{policy} && !ctrl.hide_#{action}_btn)"
    else
      "(!ctrl.hide_#{action}_btn && #{policy})"
    end

    ng_if + " || ctrl.show_#{action}_btn"
  end

  def pundit_not_permitted_field?(field, params)
    permit = params[:permit]
    permit.nil? ? !pundit_permitted_attr?(field) : !permit
  end

  def pundit_permitted_attr?(attr_name)
    attrs = [*attr_name]
    permitted_attributes = policy([@namespace, @model]).permitted_attributes
    policy = attrs.map { |attr| permitted_attributes.include?(attr) ? attr : nil }
    attrs.count == policy.compact.count
  end

  def pundit_namespase
    "#{@namespace}_"
  end
end
