app.controller 'MainArticlesCtrl', [
  'Article'
  'action'
  '$state'
  (Model, action, $state) ->
    ctrl = this

    $('.loading').show()

    action 'index', (params) ->
      ctrl.query = (page, search, filter) ->
        $('.loading').show()
        Model.get { page: page, search: search, filter: filter }, (res) ->
          ctrl.articles = res
          ctrl.tag = res.filter.by_tag if res.filter
      ctrl.query 1, null, params.filter

    action 'show', (params) ->
      ctrl.article = Model.get(id: params.id)
      ctrl.query = (page, search, filter) ->
        $state.go('articles_by_tags', { filter: filter })
]
