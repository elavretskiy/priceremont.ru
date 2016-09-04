app.controller 'MainArticlesCtrl', [
  'Article'
  'action'
  '$state'
  '$location'
  (Model, action, $state, $location) ->
    ctrl = this

    $('.loading').show()

    action 'index', (params) ->
      ctrl.query = (page, search, filter) ->
        $('.loading').show()
        Model.get { page: page, search: search, filter: filter }, (res) ->
          ctrl.articles = res
      ctrl.query 1, null, params.filter || { by_tag: $location.search().by_tag }

    action 'show', (params) ->
      ctrl.article = Model.get(id: params.id)
      ctrl.query = (page, search, filter) ->
        $location.url("/?by_tag=#{filter.by_tag}");
]
