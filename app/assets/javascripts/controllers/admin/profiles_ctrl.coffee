app.controller 'AdminProfilesCtrl', [
  'AdminProfile'
  'action'
  (Model, action) ->
    ctrl = this

    $('.loading').show()

    ctrl.hide_destroy_btn = true
    ctrl.show_edit_btn = true

    action 'show', (params) ->
      ctrl.profile = Model.get()

    action 'edit', (params) ->
      ctrl.profile = Model.edit()
      ctrl.save = Model.update
]
