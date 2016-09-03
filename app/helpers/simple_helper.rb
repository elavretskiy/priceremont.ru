module SimpleHelper
  def simple_group_field(f, field, params = {})
    return if pundit_not_permitted_field?(field, params)
    content_tag :div, class: 'form-group' do
      ng_model = display_ng(params[:field] || field, params)

      case params[:as]
      when :select
        simple_select_field(f, field, params, ng_model)
      when :association
        simple_association_field(f, field, params, ng_model)
      when :time
        simple_datetime_field(params, ng_model)
      when :date
        simple_datetime_field(params, ng_model)
      else
        simple_input_field(f, field, params, ng_model)
      end
    end
  end

  def page_display_field(field, params = {})
    return if pundit_not_permitted_field?(field, params)

    html = content_tag :dt, @model.human_attribute_name(field.to_sym)
    html += content_tag :dd do
      if params[:as] == :link
        page_display_link(field, params)
      else
        ng_bind = display_ng(params[:field] || field, params)
        content_tag :div, '', 'ng-bind': ng_bind
      end
    end
    html
  end

  def page_display_td(field, params = {})
    return if pundit_not_permitted_field?(field, params)
    ng_bind = display_ng(params[:field] || field, params)

    content_tag :td, '', 'ng-bind': ng_bind
  end

  def page_display_th(field, params = {})
    return if pundit_not_permitted_field?(field, params)
    content_tag :th, @model.human_attribute_name(field)
  end

  def page_display_link(field, params = {})
    return if pundit_not_permitted_field?(field, params)

    field = params[:join] ? "#{params[:join]}.#{params[:field]}" : field
    ng_bind = display_ng(field, params)

    ui_sref = "#{pundit_namespase}#{params[:model] || params[:join] || model_resource}_path(#{ctrl_resource}"
    ui_sref += params[:join].present? ? ".#{params[:join]})" : ')'

    content_tag :td do
      if current_user.admin?
        content_tag :a, '', 'ui-sref': ui_sref, 'ng-bind': ng_bind
      else
        content_tag :div, '', 'ng-bind': ng_bind
      end
    end
  end

  private

  def simple_datetime_field(params, ng_model)
    html = content_tag :label, class: 'select required control-label' do
      html = content_tag :abbr, '*', title: 'обязательное поле'
      html += " #{params[:label]}"
      html
    end

    params = {
      'ng-model': ng_model,
      "uib-#{params[:as]}picker": '',
      'show-meridian': false
    }

    html + content_tag(:div, '', params)
  end

  def simple_association_field(f, field, params, ng_model)
    f.input field,
            label: params[:label],
            collection: params[:collection],
            label_method: params[:label_method] || :name,
            value_method: params[:value_method] || :id,
            include_blank: params[:include_blank],
            class: 'form-control',
            input_html: { 'ng-model': ng_model, 'convert-to-number': '' }
  end

  def simple_select_field(f, field, params, ng_model)
    f.input field,
            label: params[:label],
            collection: params[:collection],
            include_blank: params[:include_blank],
            class: 'form-control',
            input_html: { 'ng-model': ng_model }
  end

  def simple_input_field(f, field, params, ng_model)
    f.input field,
            label: params[:label],
            as: params[:as],
            placeholder: params[:placeholder],
            class: 'form-control',
            input_html: { 'ng-model': ng_model }.merge(params[:input_html] || {})
  end

  def display_ng(field, params)
    ng_bind = "#{ctrl_resource}.#{field}"
    ng_bind += ' | translate' if params[:translate]
    ng_bind += " | #{params[:datetime]}" if params[:datetime]
    ng_bind += " | #{params[:truncate]}" if params[:truncate]
    ng_bind
  end
end
