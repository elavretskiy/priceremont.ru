module PageHelper
  def page_headers
    page_header
    page_header_small
  end

  def page_headers_text(header, small)
    page_header_text(header)
    page_header_small_text(small)
  end

  def page_header
    content_for :page_header, header_text
  end

  def page_header_text(text)
    content_for :page_header, text
  end

  def page_header_small
    content_for :page_header_small, header_small_text
  end

  def page_header_small_text(text)
    content_for :page_header_small, text
  end

  def page_breadcrumbs
    content_tag :ol, class: 'breadcrumb' do
      render_breadcrumbs separator: '', tag: :li
    end
  end

  private

  def header_text
    case controller.action_name
    when 'index'
      "#{@model.model_name.human count: 70}"
    when 'show'
      'Просмотр'
    when 'edit', 'update'
      'Редактирование'
    when 'new', 'create'
      'Создание'
    end
  end

  def header_small_text
    case controller.action_name
    when 'index'
      'Список'
    when 'show'
      "#{@model.model_name.human count: 2}"
    when 'edit', 'update'
      "#{@model.model_name.human count: 2}"
    when 'new', 'create'
      "#{@model.model_name.human count: 2}"
    end
  end
end
