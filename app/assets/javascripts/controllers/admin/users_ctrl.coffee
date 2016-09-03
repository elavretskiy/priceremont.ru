app.controller 'AdminUsersCtrl', [
  'AdminUser'
  'action'
  (Model, action) ->
    ctrl = this

    $('.loading').show()

    action 'index', (params) ->
      ctrl.query = (page, search, filter) ->
        $('.loading').show()
        Model.get { page: page, search: search, filter: filter }, (res) ->
          ctrl.users = res
      ctrl.query 1

    action 'show', (params) ->
      ctrl.user = Model.get(id: params.id)

    action 'new', ->
      ctrl.user = Model.new()
      ctrl.save = Model.create

    action 'edit', (params) ->
      ctrl.user = Model.edit(id: params.id)
      ctrl.save = Model.update

    action [
      'index'
      'edit'
      'show'
    ], ->
      ctrl.destroy = (user) ->
        if (confirm("Вы уверены?"))
          Model.destroy { id: user.id }, ->
            if ctrl.users
              ctrl.users.collection = _.select(ctrl.users.collection, (_user) ->
                _user.id != user.id
              )
]
