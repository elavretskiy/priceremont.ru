app.config(function($stateProvider){
  var resolve = function (action, $stateParams) {
    return function (actionNames, callback) {
      var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];

      if (actionNames.indexOf(action)!=-1) {
        callback($stateParams);
      }
    }
  }

  $stateProvider.state('articles_by_tags', {
    url: '/by_tags',
    params: { filter: null },
    templateUrl: '/?filter=',
    reloadOnSearch: true,
    controller: 'MainArticlesCtrl as ctrl',
    resolve: {
      action: ['$stateParams', function ($stateParams) {
        return resolve('index', $stateParams)
      }]
    }
  })
})
