app.controller 'AdminTagsCtrl', [
  'AdminTag'
  'action'
  (Model, action) ->
    ctrl = this

    $('.loading').show()

    ctrl.show_show_btn = true
    ctrl.show_edit_btn = true
    ctrl.show_destroy_btn = true

    action 'index', (params) ->
      ctrl.query = (page, search, filter) ->
        $('.loading').show()
        Model.get { page: page, search: search, filter: filter }, (res) ->
          ctrl.tags = res
      ctrl.query 1

    action 'show', (params) ->
      ctrl.tag = Model.get(id: params.id)

    action 'new', ->
      ctrl.tag = Model.new()
      ctrl.save = Model.create

    action 'edit', (params) ->
      ctrl.tag = Model.edit(id: params.id)
      ctrl.save = Model.update

    action [
      'index'
      'edit'
      'show'
    ], ->
      ctrl.destroy = (tag) ->
        if (confirm("Вы уверены?"))
          Model.destroy { id: tag.id }, ->
            if ctrl.tags
              ctrl.tags.collection = _.select(ctrl.tags.collection, (_tag) ->
                _tag.id != tag.id
              )
]
