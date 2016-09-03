app.controller 'AdminCommentsCtrl', [
  'AdminComment'
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
          ctrl.comments = res
      ctrl.query 1

    action 'show', (params) ->
      ctrl.comment = Model.get(id: params.id)

    action 'new', ->
      ctrl.comment = Model.new()
      ctrl.save = Model.create

    action 'edit', (params) ->
      ctrl.comment = Model.edit(id: params.id)
      ctrl.save = Model.update

    action [
      'index'
      'edit'
      'show'
    ], ->
      ctrl.destroy = (comment) ->
        if (confirm("Вы уверены?"))
          Model.destroy { id: comment.id }, ->
            if ctrl.comments
              ctrl.comments.collection = _.select(ctrl.comments.collection, (_comment) ->
                _comment.id != comment.id
              )
]
