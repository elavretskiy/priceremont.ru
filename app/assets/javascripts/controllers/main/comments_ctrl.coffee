app.controller 'MainCommentsCtrl', [
  'Comment'
  '$scope'
  '$state'
  (Model, $scope, $state) ->
    ctrl = this

    $scope.save = (params) ->
      $('.loading').show()
      Model.create {
        form_name: params['form_name'],
        comment: {
          text: $scope.comment.text,
          commentable_id: $scope.comment.commentable_id,
          commentable_type: $scope.comment.commentable_type
        }
      }, (res) ->
        $state.reload()
]
