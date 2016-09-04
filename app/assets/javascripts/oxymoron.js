(function() {
  angular.module("oxymoron.config.http", [])
  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }])
angular.module("oxymoron.config.states", [])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode(true).hashPrefix('!');

    /*
     *  $stateProvider Rails
    */
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      //for later access in tempalteUrl callback
      $stateProvider.oxymoron_location = $location;

      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      }
    });

    var resolve = function (action, $stateParams) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback($stateParams);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    $stateProvider.rails = function () {
      $stateProvider
      
        .state('new_user_session_path', {
          url: '/auth/sign_in',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_user_session_path'](params);
          },
          reloadOnSearch: true,
          controller: 'DeviseSessionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('new_user_password_path', {
          url: '/auth/password/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_user_password_path'](params);
          },
          reloadOnSearch: true,
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_password_path', {
          url: '/auth/password/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_user_password_path'](params);
          },
          reloadOnSearch: true,
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/auth/cancel',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['cancel_user_registration_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('cancel', $stateParams)
            }]
          }
        })
      
        .state('new_user_registration_path', {
          url: '/auth/sign_up',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_user_registration_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/auth/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_user_registration_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('new_user_confirmation_path', {
          url: '/auth/confirmation/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_user_confirmation_path'](params);
          },
          reloadOnSearch: true,
          controller: 'DeviseConfirmationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('root_path', {
          url: '/',
          params: { filter: null },
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['root_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('articles_path', {
          url: '/articles',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['articles_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_article_path', {
          url: '/articles/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_article_path', {
          url: '/articles/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('article_path', {
          url: '/articles/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('comments_path', {
          url: '/comments',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['comments_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_comment_path', {
          url: '/comments/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_comment_path', {
          url: '/comments/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('comment_path', {
          url: '/comments/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'MainCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_root_path', {
          url: '/admin',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_root_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminMainCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('admin_users_path', {
          url: '/admin/users',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_users_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_user_path', {
          url: '/admin/users/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_admin_user_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_user_path', {
          url: '/admin/users/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_admin_user_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_user_path', {
          url: '/admin/users/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_user_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_articles_path', {
          url: '/admin/articles',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_articles_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_article_path', {
          url: '/admin/articles/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_admin_article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_article_path', {
          url: '/admin/articles/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_admin_article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_article_path', {
          url: '/admin/articles/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_article_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminArticlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_comments_path', {
          url: '/admin/comments',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_comments_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_comment_path', {
          url: '/admin/comments/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_admin_comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_comment_path', {
          url: '/admin/comments/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_admin_comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_comment_path', {
          url: '/admin/comments/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_comment_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_tags_path', {
          url: '/admin/tags',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_tags_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminTagsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_tag_path', {
          url: '/admin/tags/new',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['new_admin_tag_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminTagsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_tag_path', {
          url: '/admin/tags/:id/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_admin_tag_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminTagsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_tag_path', {
          url: '/admin/tags/:id',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_tag_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminTagsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_profile_path', {
          url: '/admin/profile',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['admin_profile_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminProfilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_profile_path', {
          url: '/admin/profile/edit',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['edit_admin_profile_path'](params);
          },
          reloadOnSearch: true,
          controller: 'AdminProfilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('rails_info_properties_path', {
          url: '/rails/info/properties',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['rails_info_properties_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('properties', $stateParams)
            }]
          }
        })
      
        .state('rails_info_routes_path', {
          url: '/rails/info/routes',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['rails_info_routes_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('routes', $stateParams)
            }]
          }
        })
      
        .state('rails_info_path', {
          url: '/rails/info',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['rails_info_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('rails_mailers_path', {
          url: '/rails/mailers',
          templateUrl: function(params) {
            params['ng-view']='';
            
            if ($stateProvider.oxymoron_location) {
              var query = _.omit($stateProvider.oxymoron_location.search(), _.keys(params));
              params = angular.extend(query, params); 
            }

            return Routes['rails_mailers_path'](params);
          },
          reloadOnSearch: true,
          controller: 'RailsMailersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
      return $stateProvider;
    }
  }])

  .config(['$provide',
    function($provide) {
      $provide.decorator('$state', ['$delegate', function($delegate) {
        var state = $delegate;
        state.baseGo = state.go;

        var go = function(to, params, options) {
          if (state.defaultParams) {
            var defaultParams = angular.copy(state.defaultParams);
            params = angular.extend(defaultParams, params);
          }

          state.baseGo(to, params, options);
        };
        state.go = go;

        return $delegate;
      }]);
    }
  ])
angular.module("oxymoron.config.debug", [])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);

angular.module("oxymoron.config", ['oxymoron.config.http', 'oxymoron.config.states', 'oxymoron.config.debug'])

  angular.module("oxymoron.services.interceptor", [])
  .factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:progress');
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish', response);
        return response || $q.when(response);
      },
      responseError: function (response) {
        $rootScope.$broadcast('loading:error', response);
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }])
angular.module("oxymoron.services.resources", [])
  .factory('resourceDecorator', [function () {
    return function(resource) {
      return resource;
    };
  }])

  
    .factory('Article', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/articles/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/articles/:id/new.json"},"edit":{"method":"GET","url":"/articles/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('Comment', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/comments/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/comments/:id/new.json"},"edit":{"method":"GET","url":"/comments/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('AdminUser', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/users/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/admin/users/:id/new.json"},"edit":{"method":"GET","url":"/admin/users/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('AdminArticle', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/articles/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/admin/articles/:id/new.json"},"edit":{"method":"GET","url":"/admin/articles/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('AdminComment', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/comments/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/admin/comments/:id/new.json"},"edit":{"method":"GET","url":"/admin/comments/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('AdminTag', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/tags/:id.json', {"id":"@id"}, {"new":{"method":"GET","url":"/admin/tags/:id/new.json"},"edit":{"method":"GET","url":"/admin/tags/:id/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
    .factory('AdminProfile', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/profile.json', {}, {"new":{"method":"GET","url":"/admin/profile/new.json"},"edit":{"method":"GET","url":"/admin/profile/edit.json"},"update":{"method":"PUT"},"create":{"method":"POST"},"destroy":{"method":"DELETE"}}));
    }])
  
angular.module("oxymoron.services.sign", [])
  .service('Sign', ['$http', function ($http) {
    var Sign = this;

    Sign.out = function () {
      $http.delete(Routes.destroy_user_session_path())
        .success(function () {
          window.location = "/";
        })
    }

    Sign.in = function (form) {
      $http.post(Routes.user_session_path(), {user: form})
        .success(function () {
          window.location.reload();
        })
    }

    Sign.up = function (form) {
      $http.post(Routes.user_registration_path(), {user: form})
        .success(function () {
          window.location.reload();
        })
    }
  }])
angular.module("oxymoron.services.validate", [])
  .factory('Validate', [function(){
    return function (form, errors){
      try {
        var $form = angular.element(document.querySelector('[name="'+form+'"]')).scope()[form];
      } catch(e) {
        var $form = {};
      }

      angular
        .element(document.querySelectorAll('.rails-errors')).remove();

      angular.forEach($form, function(ctrl, name) {
        if (name.indexOf('$') != 0) {
          angular.forEach(ctrl.$error, function(value, name) {
            ctrl.$setValidity(name, null);
          });
        }
      });


      angular.forEach(errors, function(errors_array, key) {
        var form_key = form+'['+key+']';
        try {
          if ($form[form_key]) {
            $form[form_key].$setTouched();
            $form[form_key].$setDirty();
            $form[form_key].$setValidity('server', false);
          }
          
          angular
            .element(document.querySelector('[name="'+form_key+'"]'))
            .parent()
            .append('<div class="rails-errors" ng-messages="'+form_key+'.$error"><div ng-message="server">'+errors_array[0]+'</div></div>')
        } catch(e) {
          console.log(e)
          console.warn('Element with name ' + form_key + ' not found for validation.')
        }
      });
    };
  }])

angular.module("oxymoron.services", ["oxymoron.services.interceptor", "oxymoron.services.resources", "oxymoron.services.sign", "oxymoron.services.validate"])
  angular.module("oxymoron.directives.contentFor", [])
  .directive("contentFor", [
    "$compile", function($compile) {
      return {
        compile: function(el, attrs, transclude) {
          var template = el.html();

          return {
            pre: function(scope, iElement, iAttrs, controller) {
              var DOMElements = angular.element(document.querySelectorAll('[ng-yield="'+iAttrs.contentFor+'"]'));
              if (DOMElements.attr("only-text") == "true") {
                template = el.text().replace(/(?:\r\n|\r|\n)/g, ' ');
              }
              DOMElements.html((DOMElements.attr("prefix") || "") + template + (DOMElements.attr("postfix") || ""))
              $compile(DOMElements)(scope);

              
              return iElement.remove();
            }
          };
        }
      };
    }
  ])
angular.module("oxymoron.directives.fileupload", [])
  .directive('fileupload', ['$http', '$timeout', '$cookies', function ($http, $timeout, $cookies) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=",
        hash: "=",
        percentCompleted: "="
      },
      restrict: 'A',
      link: function($scope, element, attrs) {
        $scope.percentCompleted = undefined;

        element.bind('change', function(){
          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            fd.append("attachments[]", file);
          })

          var xhr = new XMLHttpRequest;

          xhr.upload.onprogress = function(e) {
              // Event listener for when the file is uploading
              $scope.$apply(function() {
                  var percentCompleted;
                  if (e.lengthComputable) {
                      $scope.percentCompleted = Math.round(e.loaded / e.total * 100);
                  }
              });
          };

          xhr.onload = function() {
              var res = JSON.parse(this.responseText)

              $scope.$apply(function() {
                if (!$scope.hash) {
                  if (attrs.multiple) {
                    $scope.ngModel = $scope.ngModel || [];
                    angular.forEach(res, function (attachment) {
                      $scope.ngModel.push(attachment);
                    });
                  } else {
                    $scope.ngModel = res[0];
                  }
                } else {
                  $scope.ngModel = $scope.ngModel || {};
                  angular.forEach(res, function(value, key) {
                    $scope.ngModel[key] = $scope.ngModel[key] || [];
                    angular.forEach(value, function (attachment) {
                      $scope.ngModel[key].push(attachment);
                    });
                  });
                }

                $scope.percentCompleted = undefined;
              });
          };


          xhr.open('POST', $scope.fileupload);
          xhr.setRequestHeader('X-XSRF-Token', $cookies.get('XSRF-TOKEN'));
          xhr.send(fd);
          element[0].value = '';
        })
      }
    }
  }])
angular.module("oxymoron.directives.checklistModel", [])
  .directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
    // contains
    function contains(arr, item, comparator) {
      if (angular.isArray(arr)) {
        for (var i = arr.length; i--;) {
          if (comparator(arr[i], item)) {
            return true;
          }
        }
      }
      return false;
    }

    // add
    function add(arr, item, comparator) {
      arr = angular.isArray(arr) ? arr : [];
        if(!contains(arr, item, comparator)) {
            arr.push(item);
        }
      return arr;
    }  

    // remove
    function remove(arr, item, comparator) {
      if (angular.isArray(arr)) {
        for (var i = arr.length; i--;) {
          if (comparator(arr[i], item)) {
            arr.splice(i, 1);
            break;
          }
        }
      }
      return arr;
    }

    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
       // exclude recursion, but still keep the model
      var checklistModel = attrs.checklistModel;
      attrs.$set("checklistModel", null);
      // compile with `ng-model` pointing to `checked`
      $compile(elem)(scope);
      attrs.$set("checklistModel", checklistModel);

      // getter / setter for original model
      var getter = $parse(checklistModel);
      var setter = getter.assign;
      var checklistChange = $parse(attrs.checklistChange);
      var checklistBeforeChange = $parse(attrs.checklistBeforeChange);

      // value added to list
      var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


      var comparator = angular.equals;

      if (attrs.hasOwnProperty('checklistComparator')){
        if (attrs.checklistComparator[0] == '.') {
          var comparatorExpression = attrs.checklistComparator.substring(1);
          comparator = function (a, b) {
            return a[comparatorExpression] === b[comparatorExpression];
          };
          
        } else {
          comparator = $parse(attrs.checklistComparator)(scope.$parent);
        }
      }

      // watch UI checked change
      scope.$watch(attrs.ngModel, function(newValue, oldValue) {
        if (newValue === oldValue) { 
          return;
        } 

        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
          scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
          return;
        }

        setValueInChecklistModel(value, newValue);

        if (checklistChange) {
          checklistChange(scope);
        }
      });

      function setValueInChecklistModel(value, checked) {
        var current = getter(scope.$parent);
        if (angular.isFunction(setter)) {
          if (checked === true) {
            setter(scope.$parent, add(current, value, comparator));
          } else {
            setter(scope.$parent, remove(current, value, comparator));
          }
        }
        
      }

      // declare one function to be used for both $watch functions
      function setChecked(newArr, oldArr) {
        if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
          setValueInChecklistModel(value, scope[attrs.ngModel]);
          return;
        }
        scope[attrs.ngModel] = contains(newArr, value, comparator);
      }

      // watch original model change
      // use the faster $watchCollection method if it's available
      if (angular.isFunction(scope.$parent.$watchCollection)) {
          scope.$parent.$watchCollection(checklistModel, setChecked);
      } else {
          scope.$parent.$watch(checklistModel, setChecked, true);
      }
    }

    return {
      restrict: 'A',
      priority: 1000,
      terminal: true,
      scope: true,
      compile: function(tElement, tAttrs) {
        if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
          throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
        }

        if (!tAttrs.checklistValue && !tAttrs.value) {
          throw 'You should provide `value` or `checklist-value`.';
        }

        // by default ngModel is 'checked', so we set it if not specified
        if (!tAttrs.ngModel) {
          // local scope var storing individual checkbox model
          tAttrs.$set("ngModel", "checked");
        }

        return postLinkFn;
      }
    };
  }]);
angular.module("oxymoron.directives.clickOutside", [])
  .directive('clickOutside', ['$document', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutside: '&',
        clickOutsideIf: '='
      },
      link: function (scope, el, attr) {
        var handler = function (e) {
          if (scope.clickOutsideIf && el !== e.target && !el[0].contains(e.target) && document.body.contains(e.target)) {
            scope.$apply(function () {
                scope.$eval(scope.clickOutside);
            });
          }
        }

        $document.bind('click', handler);

        scope.$on('$destroy', function () {
          $document.unbind('click', handler)
        })
      }
    }
  }])

angular.module("oxymoron.directives", ['oxymoron.directives.fileupload', 'oxymoron.directives.contentFor', 'oxymoron.directives.checklistModel', 'oxymoron.directives.clickOutside'])
  angular.module("oxymoron.notifier", [])
  .run(['$rootScope', 'ngNotify', 'Validate', '$state', '$http', '$location', function ($rootScope, ngNotify, Validate, $state, $http, $location) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    $rootScope.$on('loading:finish', function (h, res) {
      callback('success', res)
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      callback('error', res)
    })

    function callback (type, res) {
      if (res.data && angular.isObject(res.data)) {
        if (res.data.msg) {
          ngNotify.set(res.data.msg, type);
        }

        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }

        if (res.data.redirect_to_url) {
          $location.url(res.data.redirect_to_url);
        } else if (res.data.redirect_to) {
          $state.go(res.data.redirect_to, res.data.redirect_options || {});
        }

        if (res.data.reload) {
          window.location.reload();
        }
      }
    }
  }])

  angular.module('oxymoron', ['ngNotify', 'ngCookies', 'ui.router', 'ngResource', 'oxymoron.directives', 'oxymoron.services', 'oxymoron.config', 'oxymoron.notifier'])

}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"new_user_session":{"defaults":{},"path":"/auth/sign_in"},"user_session":{"defaults":{},"path":"/auth/sign_in"},"destroy_user_session":{"defaults":{},"path":"/auth/sign_out"},"user_password":{"defaults":{},"path":"/auth/password"},"new_user_password":{"defaults":{},"path":"/auth/password/new"},"edit_user_password":{"defaults":{},"path":"/auth/password/edit"},"cancel_user_registration":{"defaults":{},"path":"/auth/cancel"},"user_registration":{"defaults":{},"path":"/auth"},"new_user_registration":{"defaults":{},"path":"/auth/sign_up"},"edit_user_registration":{"defaults":{},"path":"/auth/edit"},"user_confirmation":{"defaults":{},"path":"/auth/confirmation"},"new_user_confirmation":{"defaults":{},"path":"/auth/confirmation/new"},"root":{"defaults":{},"path":"/"},"articles":{"defaults":{},"path":"/articles"},"new_article":{"defaults":{},"path":"/articles/new"},"edit_article":{"defaults":{},"path":"/articles/:id/edit"},"article":{"defaults":{},"path":"/articles/:id"},"comments":{"defaults":{},"path":"/comments"},"new_comment":{"defaults":{},"path":"/comments/new"},"edit_comment":{"defaults":{},"path":"/comments/:id/edit"},"comment":{"defaults":{},"path":"/comments/:id"},"admin_root":{"defaults":{},"path":"/admin"},"admin_users":{"defaults":{},"path":"/admin/users"},"new_admin_user":{"defaults":{},"path":"/admin/users/new"},"edit_admin_user":{"defaults":{},"path":"/admin/users/:id/edit"},"admin_user":{"defaults":{},"path":"/admin/users/:id"},"admin_articles":{"defaults":{},"path":"/admin/articles"},"new_admin_article":{"defaults":{},"path":"/admin/articles/new"},"edit_admin_article":{"defaults":{},"path":"/admin/articles/:id/edit"},"admin_article":{"defaults":{},"path":"/admin/articles/:id"},"admin_comments":{"defaults":{},"path":"/admin/comments"},"new_admin_comment":{"defaults":{},"path":"/admin/comments/new"},"edit_admin_comment":{"defaults":{},"path":"/admin/comments/:id/edit"},"admin_comment":{"defaults":{},"path":"/admin/comments/:id"},"admin_tags":{"defaults":{},"path":"/admin/tags"},"new_admin_tag":{"defaults":{},"path":"/admin/tags/new"},"edit_admin_tag":{"defaults":{},"path":"/admin/tags/:id/edit"},"admin_tag":{"defaults":{},"path":"/admin/tags/:id"},"admin_profile":{"defaults":{},"path":"/admin/profile"},"edit_admin_profile":{"defaults":{},"path":"/admin/profile/edit"},"rails_info_properties":{"defaults":{},"path":"/rails/info/properties"},"rails_info_routes":{"defaults":{},"path":"/rails/info/routes"},"rails_info":{"defaults":{},"path":"/rails/info"},"rails_mailers":{"defaults":{},"path":"/rails/mailers"}};

    self.defaultParams = {}

    var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    var omit = function (hash, key) {
      var hash = angular.copy(hash);
      delete hash[key]
      return hash
    }


    angular.forEach(routes, function (val, key) {
      var result = '';

      var gsub = function(params) {
        if (params.format) {
          result += '.' + params.format
        }

        var params = omit(params, 'format');
        angular.forEach(params, function (v, k) {
          var subst = ':' + k;
          if (result.search(subst) != -1) {
            result = result.replace(subst, v);
            params = omit(params, k);
          }
        })
        
        if (Object.keys(params).length)
          result += '?'+serialize(params)

        return result;
      }

      self[key+'_path'] = function (params) {
        var params = angular.extend(angular.copy(val.defaults), params || {});
        result = val.path;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }

      self[key+'_url'] = function (params) {
        return window.location.origin + self[key+'_path'](params)
      }
    })
  }

  window.Routes = new Routes();

}).call(this)
