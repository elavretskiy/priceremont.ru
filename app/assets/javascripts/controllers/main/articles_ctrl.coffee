app.controller 'MainArticlesCtrl', [
  'Article'
  'action'
  '$state'
  '$location'
  '$window'
  (Model, action, $state, $location, $window) ->
    ctrl = this

    $('.loading').show()

    action 'index', (params) ->
      ctrl.query = (page, search, filter) ->
        $('.loading').show()
        Model.get { page: page, search: search, filter: filter }, (res) ->
          ctrl.articles = res
          $window.scrollTo(0, 0)
      ctrl.query 1, null, params.filter || { by_tag: $location.search().by_tag }

    action 'show', (params) ->
      ctrl.article = Model.get(id: params.id)
      ctrl.query = (page, search, filter) ->
        $location.url("/?by_tag=#{filter.by_tag}");
]
