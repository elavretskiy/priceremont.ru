module TagHelper
  def tag_cloud_for_tags
    content_tag :div, class: 'tags' do
      html = tag_link_for_name :all, 'label-primary', ''
      tag_classes Tag.counts, Tag.classes do |tag, css|
        html += tag_link_for_name tag.name, css
      end
      html
    end
  end

  def tag_cloud_for_json
    params = {
      class: 'timeline-footer tags',
      'ng-if': "#{ctrl_resource}.tag_classes.length > 0"
    }
    content_tag :div, '', params do
      tag_link_for_json
    end
  end

  private

  def tag_classes(tags, classes)
    max = tags.sort_by(&:count).last
    tags.each do |tag|
      index = tag.count.to_f / max.count * (classes.size - 1)
      yield(tag, classes[index.round])
    end
  end

  def tag_link_for_name(name, css, ng_class = nil)
    params = {
      'ng-click': "ctrl.tag = '#{name}'; #{page_filter_ng_click("{ by_tag: '#{name}' }")}",
      class: "tag label #{css}",
      'ng-class': ng_class || "{'label-primary':ctrl.tag === '#{name}'}"
    }

    content_tag :div, content_tag(:a, name, params)
  end

  def tag_link_for_json
    params = {
      'ng-click': "ctrl.tag = tag.name; #{page_filter_ng_click("{ by_tag: tag.name }")}",
      class: 'tag label',
      'ng-class': "[tag.css, {'label-primary':ctrl.tag === tag.name}]",
      'ng-bind': 'tag.name'
    }
    ng_repeat = "tag in #{ctrl_resource}.tag_classes"

    content_tag :div, content_tag(:a, '', params), 'ng-repeat': ng_repeat
  end
end
