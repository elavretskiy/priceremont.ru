module BoxHelper
  def page_pagination_show?
    collection = model_collection
    "ctrl.#{collection}.total_count > ctrl.#{collection}.page_size"
  end

  def page_pagination(params = {})
    collection = model_collection
    params = {
      paging: '',
      page: "ctrl.#{collection}.page",
      total: "ctrl.#{collection}.total_count",
      'paging-action': "ctrl.query(page,ctrl.#{collection}.search,ctrl.#{collection}.filter)",
      'show-prev-next': params[:show_prev_next] || 'false',
      'show-first-last': params[:show_first_last]|| 'false',
      'page-size': "ctrl.#{collection}.page_size",
      'ul-class': params[:ul_class] || 'pagination pagination-sm no-margin pull-right',
      'scroll-top': 'true',
      'hide-if-empty': 'true'
    }

    content_tag :div, '', params
  end

  def page_filter_search
    params = {
      class: 'form-control filter-search',
      type: 'text',
      'ng-model': 'search',
      placeholder: 'Поиск по странице'
    }

    content_tag :input, '', params
  end

  def page_search
    collection = model_collection
    data_ng_click = "ctrl.query(1,ctrl.#{collection}.search,ctrl.#{collection}.filter)"

    params_text_field_tag = {
      class: 'form-control',
      placeholder: 'Поиск',
      'ng-model': "ctrl.#{collection}.search",
      'ng-keypress': "($event.which === 13) ? #{data_ng_click} : 0"
    }

    params_submit_tag = {
      class: 'btn btn-primary btn-flat',
      'data-ng-click': data_ng_click
    }

    content_tag :div, class: 'input-group' do
      html = text_field_tag :search, nil, params_text_field_tag
      html += content_tag :div, class: 'input-group-btn' do
        submit_tag 'Искать', params_submit_tag
      end
      html
    end
  end

  def page_filter_ng_click(filter)
    "ctrl.query(1,ctrl.#{model_collection}.search,#{filter})"
  end

  def page_filter_ng_repeat
    collection = model_collection
    "#{model_resource} in ctrl.#{collection}.collection | filter:search"
  end
end
