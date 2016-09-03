app.controller 'AdminArticlesCtrl', [
  'AdminArticle'
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
          ctrl.articles = res
      ctrl.query 1

    action 'show', (params) ->
      ctrl.article = Model.get(id: params.id)

    action 'new', ->
      ctrl.article = Model.new()
      ctrl.save = Model.create

    action 'edit', (params) ->
      ctrl.article = Model.edit(id: params.id)
      ctrl.save = Model.update

    action [
      'index'
      'edit'
      'show'
    ], ->
      ctrl.destroy = (article) ->
        if (confirm("Вы уверены?"))
          Model.destroy { id: article.id }, ->
            if ctrl.articles
              ctrl.articles.collection = _.select(ctrl.articles.collection, (_article) ->
                _article.id != article.id
              )
]
