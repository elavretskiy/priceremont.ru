(function(){angular.module("oxymoron.config.http",[]).config(["$httpProvider","$locationProvider","$stateProvider",function(e){e.defaults.headers.common["X-Requested-With"]="AngularXMLHttpRequest",e.defaults.paramSerializer="$httpParamSerializerJQLike"}]),angular.module("oxymoron.config.states",[]).config(["$locationProvider","$stateProvider","$urlRouterProvider","$urlMatcherFactoryProvider",function(e,t,r){e.html5Mode(!0).hashPrefix("!"),r.rule(function(e,r){var o=r.path(),n="/"===o[o.length-1];if(t.oxymoron_location=r,n){var a=o.substr(0,o.length-1);return a}});var o=function(e,t){return function(r,o){try{var r=angular.isArray(r)?r:[r];r.indexOf(e)!=-1&&o(t)}catch(e){console.error(e)}}};t.rails=function(){return t.state("new_user_session_path",{url:"/auth/sign_in",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_user_session_path(e)},reloadOnSearch:!0,controller:"DeviseSessionsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("new_user_password_path",{url:"/auth/password/new",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_user_password_path(e)},reloadOnSearch:!0,controller:"DevisePasswordsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_user_password_path",{url:"/auth/password/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_user_password_path(e)},reloadOnSearch:!0,controller:"DevisePasswordsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("cancel_user_registration_path",{url:"/auth/cancel",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.cancel_user_registration_path(e)},reloadOnSearch:!0,controller:"RegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("cancel",e)}]}}).state("new_user_registration_path",{url:"/auth/sign_up",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_user_registration_path(e)},reloadOnSearch:!0,controller:"RegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_user_registration_path",{url:"/auth/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_user_registration_path(e)},reloadOnSearch:!0,controller:"RegistrationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("new_user_confirmation_path",{url:"/auth/confirmation/new",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_user_confirmation_path(e)},reloadOnSearch:!0,controller:"DeviseConfirmationsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("root_path",{url:"/",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.root_path(e)},reloadOnSearch:!0,controller:"MainArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("comment_path",{url:"/comments/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.comment_path(e)},reloadOnSearch:!0,controller:"MainCommentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("articles_path",{url:"/articles",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.articles_path(e)},reloadOnSearch:!0,controller:"MainArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("article_path",{url:"/articles/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.article_path(e)},reloadOnSearch:!0,controller:"MainArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("admin_root_path",{url:"/admin",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_root_path(e)},reloadOnSearch:!0,controller:"AdminMainCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("admin_users_path",{url:"/admin/users",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_users_path(e)},reloadOnSearch:!0,controller:"AdminUsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_admin_user_path",{url:"/admin/users/new",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_admin_user_path(e)},reloadOnSearch:!0,controller:"AdminUsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_admin_user_path",{url:"/admin/users/:id/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_admin_user_path(e)},reloadOnSearch:!0,controller:"AdminUsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("admin_user_path",{url:"/admin/users/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_user_path(e)},reloadOnSearch:!0,controller:"AdminUsersCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("admin_articles_path",{url:"/admin/articles",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_articles_path(e)},reloadOnSearch:!0,controller:"AdminArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("new_admin_article_path",{url:"/admin/articles/new",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.new_admin_article_path(e)},reloadOnSearch:!0,controller:"AdminArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("new",e)}]}}).state("edit_admin_article_path",{url:"/admin/articles/:id/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_admin_article_path(e)},reloadOnSearch:!0,controller:"AdminArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("admin_article_path",{url:"/admin/articles/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_article_path(e)},reloadOnSearch:!0,controller:"AdminArticlesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("admin_comments_path",{url:"/admin/comments",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_comments_path(e)},reloadOnSearch:!0,controller:"AdminCommentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("edit_admin_comment_path",{url:"/admin/comments/:id/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_admin_comment_path(e)},reloadOnSearch:!0,controller:"AdminCommentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("admin_comment_path",{url:"/admin/comments/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_comment_path(e)},reloadOnSearch:!0,controller:"AdminCommentsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("admin_tags_path",{url:"/admin/tags",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_tags_path(e)},reloadOnSearch:!0,controller:"AdminTagsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("index",e)}]}}).state("edit_admin_tag_path",{url:"/admin/tags/:id/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_admin_tag_path(e)},reloadOnSearch:!0,controller:"AdminTagsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}).state("admin_tag_path",{url:"/admin/tags/:id",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_tag_path(e)},reloadOnSearch:!0,controller:"AdminTagsCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("admin_profile_path",{url:"/admin/profile",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.admin_profile_path(e)},reloadOnSearch:!0,controller:"AdminProfilesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("show",e)}]}}).state("edit_admin_profile_path",{url:"/admin/profile/edit",templateUrl:function(e){if(e["ng-view"]="",t.oxymoron_location){var r=_.omit(t.oxymoron_location.search(),_.keys(e));e=angular.extend(r,e)}return Routes.edit_admin_profile_path(e)},reloadOnSearch:!0,controller:"AdminProfilesCtrl as ctrl",resolve:{action:["$stateParams",function(e){return o("edit",e)}]}}),t}}]).config(["$provide",function(e){e.decorator("$state",["$delegate",function(e){var t=e;t.baseGo=t.go;var r=function(e,r,o){if(t.defaultParams){var n=angular.copy(t.defaultParams);r=angular.extend(n,r)}t.baseGo(e,r,o)};return t.go=r,e}])}]),angular.module("oxymoron.config.debug",[]).config(["$compileProvider",function(e){e.debugInfoEnabled(!1)}]),angular.module("oxymoron.config",["oxymoron.config.http","oxymoron.config.states","oxymoron.config.debug"]),angular.module("oxymoron.services.interceptor",[]).factory("httpInterceptor",["$q","$rootScope","$log",function(e,t){return{request:function(r){return t.$broadcast("loading:progress"),r||e.when(r)},response:function(r){return t.$broadcast("loading:finish",r),r||e.when(r)},responseError:function(r){return t.$broadcast("loading:error",r),e.reject(r)}}}]).config(["$httpProvider",function(e){e.interceptors.push("httpInterceptor")}]),angular.module("oxymoron.services.resources",[]).factory("resourceDecorator",[function(){return function(e){return e}}]).factory("Comment",["$resource","resourceDecorator",function(e,t){return t(e("/comments/:id.json",{id:"@id"},{"new":{method:"GET",url:"/comments/:id/new.json"},edit:{method:"GET",url:"/comments/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("Article",["$resource","resourceDecorator",function(e,t){return t(e("/articles/:id.json",{id:"@id"},{"new":{method:"GET",url:"/articles/:id/new.json"},edit:{method:"GET",url:"/articles/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("AdminUser",["$resource","resourceDecorator",function(e,t){return t(e("/admin/users/:id.json",{id:"@id"},{"new":{method:"GET",url:"/admin/users/:id/new.json"},edit:{method:"GET",url:"/admin/users/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("AdminArticle",["$resource","resourceDecorator",function(e,t){return t(e("/admin/articles/:id.json",{id:"@id"},{"new":{method:"GET",url:"/admin/articles/:id/new.json"},edit:{method:"GET",url:"/admin/articles/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("AdminComment",["$resource","resourceDecorator",function(e,t){return t(e("/admin/comments/:id.json",{id:"@id"},{"new":{method:"GET",url:"/admin/comments/:id/new.json"},edit:{method:"GET",url:"/admin/comments/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("AdminTag",["$resource","resourceDecorator",function(e,t){return t(e("/admin/tags/:id.json",{id:"@id"},{"new":{method:"GET",url:"/admin/tags/:id/new.json"},edit:{method:"GET",url:"/admin/tags/:id/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]).factory("AdminProfile",["$resource","resourceDecorator",function(e,t){return t(e("/admin/profile.json",{},{"new":{method:"GET",url:"/admin/profile/new.json"},edit:{method:"GET",url:"/admin/profile/edit.json"},update:{method:"PUT"},create:{method:"POST"},destroy:{method:"DELETE"}}))}]),angular.module("oxymoron.services.sign",[]).service("Sign",["$http",function(e){var t=this;t.out=function(){e["delete"](Routes.destroy_user_session_path()).success(function(){window.location="/"})},t["in"]=function(t){e.post(Routes.user_session_path(),{user:t}).success(function(){window.location.reload()})},t.up=function(t){e.post(Routes.user_registration_path(),{user:t}).success(function(){window.location.reload()})}}]),angular.module("oxymoron.services.validate",[]).factory("Validate",[function(){return function(e,t){try{var r=angular.element(document.querySelector('[name="'+e+'"]')).scope()[e]}catch(e){var r={}}angular.element(document.querySelectorAll(".rails-errors")).remove(),angular.forEach(r,function(e,t){0!=t.indexOf("$")&&angular.forEach(e.$error,function(t,r){e.$setValidity(r,null)})}),angular.forEach(t,function(t,o){var n=e+"["+o+"]";try{r[n]&&(r[n].$setTouched(),r[n].$setDirty(),r[n].$setValidity("server",!1)),angular.element(document.querySelector('[name="'+n+'"]')).parent().append('<div class="rails-errors" ng-messages="'+n+'.$error"><div ng-message="server">'+t[0]+"</div></div>")}catch(e){console.log(e),console.warn("Element with name "+n+" not found for validation.")}})}}]),angular.module("oxymoron.services",["oxymoron.services.interceptor","oxymoron.services.resources","oxymoron.services.sign","oxymoron.services.validate"]),angular.module("oxymoron.directives.contentFor",[]).directive("contentFor",["$compile",function(e){return{compile:function(t){var r=t.html();return{pre:function(o,n,a){var i=angular.element(document.querySelectorAll('[ng-yield="'+a.contentFor+'"]'));return"true"==i.attr("only-text")&&(r=t.text().replace(/(?:\r\n|\r|\n)/g," ")),i.html((i.attr("prefix")||"")+r+(i.attr("postfix")||"")),e(i)(o),n.remove()}}}}}]),angular.module("oxymoron.directives.fileupload",[]).directive("fileupload",["$http","$timeout","$cookies",function(e,t,r){return{scope:{fileupload:"=",ngModel:"=",hash:"=",percentCompleted:"="},restrict:"A",link:function(e,t,o){e.percentCompleted=void 0,t.bind("change",function(){var n=new FormData;angular.forEach(t[0].files,function(e){n.append("attachments[]",e)});var a=new XMLHttpRequest;a.upload.onprogress=function(t){e.$apply(function(){t.lengthComputable&&(e.percentCompleted=Math.round(t.loaded/t.total*100))})},a.onload=function(){var t=JSON.parse(this.responseText);e.$apply(function(){e.hash?(e.ngModel=e.ngModel||{},angular.forEach(t,function(t,r){e.ngModel[r]=e.ngModel[r]||[],angular.forEach(t,function(t){e.ngModel[r].push(t)})})):o.multiple?(e.ngModel=e.ngModel||[],angular.forEach(t,function(t){e.ngModel.push(t)})):e.ngModel=t[0],e.percentCompleted=void 0})},a.open("POST",e.fileupload),a.setRequestHeader("X-XSRF-Token",r.get("XSRF-TOKEN")),a.send(n),t[0].value=""})}}}]),angular.module("oxymoron.directives.checklistModel",[]).directive("checklistModel",["$parse","$compile",function(e,t){function r(e,t,r){if(angular.isArray(e))for(var o=e.length;o--;)if(r(e[o],t))return!0;return!1}function o(e,t,o){return e=angular.isArray(e)?e:[],r(e,t,o)||e.push(t),e}function n(e,t,r){if(angular.isArray(e))for(var o=e.length;o--;)if(r(e[o],t)){e.splice(o,1);break}return e}function a(a,i,s){function l(e,t){var r=d(a.$parent);angular.isFunction(m)&&(t===!0?m(a.$parent,o(r,e,p)):m(a.$parent,n(r,e,p)))}function c(e){return h&&h(a)===!1?void l(f,a[s.ngModel]):void(a[s.ngModel]=r(e,f,p))}var u=s.checklistModel;s.$set("checklistModel",null),t(i)(a),s.$set("checklistModel",u);var d=e(u),m=d.assign,_=e(s.checklistChange),h=e(s.checklistBeforeChange),f=s.checklistValue?e(s.checklistValue)(a.$parent):s.value,p=angular.equals;if(s.hasOwnProperty("checklistComparator"))if("."==s.checklistComparator[0]){var g=s.checklistComparator.substring(1);p=function(e,t){return e[g]===t[g]}}else p=e(s.checklistComparator)(a.$parent);a.$watch(s.ngModel,function(e,t){if(e!==t){if(h&&h(a)===!1)return void(a[s.ngModel]=r(d(a.$parent),f,p));l(f,e),_&&_(a)}}),angular.isFunction(a.$parent.$watchCollection)?a.$parent.$watchCollection(u,c):a.$parent.$watch(u,c,!0)}return{restrict:"A",priority:1e3,terminal:!0,scope:!0,compile:function(e,t){if(("INPUT"!==e[0].tagName||"checkbox"!==t.type)&&"MD-CHECKBOX"!==e[0].tagName&&!t.btnCheckbox)throw'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';if(!t.checklistValue&&!t.value)throw"You should provide `value` or `checklist-value`.";return t.ngModel||t.$set("ngModel","checked"),a}}}]),angular.module("oxymoron.directives.clickOutside",[]).directive("clickOutside",["$document",function(e){return{restrict:"A",scope:{clickOutside:"&",clickOutsideIf:"="},link:function(t,r){var o=function(e){t.clickOutsideIf&&r!==e.target&&!r[0].contains(e.target)&&document.body.contains(e.target)&&t.$apply(function(){t.$eval(t.clickOutside)})};e.bind("click",o),t.$on("$destroy",function(){e.unbind("click",o)})}}}]),angular.module("oxymoron.directives",["oxymoron.directives.fileupload","oxymoron.directives.contentFor","oxymoron.directives.checklistModel","oxymoron.directives.clickOutside"]),angular.module("oxymoron.notifier",[]).run(["$rootScope","ngNotify","Validate","$state","$http","$location",function(e,t,r,o,n,a){function i(e,n){n.data&&angular.isObject(n.data)&&(n.data.msg&&t.set(n.data.msg,e),n.data.errors&&r(n.data.form_name||n.config.data.form_name,n.data.errors),n.data.redirect_to_url?a.url(n.data.redirect_to_url):n.data.redirect_to&&o.go(n.data.redirect_to,n.data.redirect_options||{}),n.data.reload&&window.location.reload())}t.config({theme:"pure",position:"top",duration:2e3,type:"info"}),e.$on("loading:finish",function(e,t){i("success",t)}),e.$on("loading:error",function(e,t){i("error",t)})}]),angular.module("oxymoron",["ngNotify","ngCookies","ui.router","ngResource","oxymoron.directives","oxymoron.services","oxymoron.config","oxymoron.notifier"])}).call(this),function(){var e=function(){var e=this,t={new_user_session:{defaults:{},path:"/auth/sign_in"},user_session:{defaults:{},path:"/auth/sign_in"},destroy_user_session:{defaults:{},path:"/auth/sign_out"},user_password:{defaults:{},path:"/auth/password"},new_user_password:{defaults:{},path:"/auth/password/new"},edit_user_password:{defaults:{},path:"/auth/password/edit"},cancel_user_registration:{defaults:{},path:"/auth/cancel"},user_registration:{defaults:{},path:"/auth"},new_user_registration:{defaults:{},path:"/auth/sign_up"},edit_user_registration:{defaults:{},path:"/auth/edit"},user_confirmation:{defaults:{},path:"/auth/confirmation"},new_user_confirmation:{defaults:{},path:"/auth/confirmation/new"},root:{defaults:{},path:"/"},comments:{defaults:{},path:"/comments"},comment:{defaults:{},path:"/comments/:id"},articles:{defaults:{},path:"/articles"},article:{defaults:{},path:"/articles/:id"},admin_root:{defaults:{},path:"/admin"},admin_users:{defaults:{},path:"/admin/users"},new_admin_user:{defaults:{},path:"/admin/users/new"},edit_admin_user:{defaults:{},path:"/admin/users/:id/edit"},admin_user:{defaults:{},path:"/admin/users/:id"},admin_articles:{defaults:{},path:"/admin/articles"},new_admin_article:{defaults:{},path:"/admin/articles/new"},edit_admin_article:{defaults:{},path:"/admin/articles/:id/edit"},admin_article:{defaults:{},path:"/admin/articles/:id"},admin_comments:{defaults:{},path:"/admin/comments"},edit_admin_comment:{defaults:{},path:"/admin/comments/:id/edit"},admin_comment:{defaults:{},path:"/admin/comments/:id"},admin_tags:{defaults:{},path:"/admin/tags"},edit_admin_tag:{defaults:{},path:"/admin/tags/:id/edit"},admin_tag:{defaults:{},path:"/admin/tags/:id"},admin_profile:{defaults:{},path:"/admin/profile"},edit_admin_profile:{defaults:{},path:"/admin/profile/edit"}};e.defaultParams={};var r=function(e,t){var o=[];for(var n in e)if(e.hasOwnProperty(n)){var a=t?t+"["+n+"]":n,i=e[n];o.push("object"==typeof i?r(i,a):encodeURIComponent(a)+"="+encodeURIComponent(i))}return o.join("&")},o=function(e,t){var e=angular.copy(e);return delete e[t],e};angular.forEach(t,function(t,n){var a="",i=function(e){e.format&&(a+="."+e.format);var e=o(e,"format");return angular.forEach(e,function(t,r){var n=":"+r;a.search(n)!=-1&&(a=a.replace(n,t),e=o(e,r))}),Object.keys(e).length&&(a+="?"+r(e)),a};e[n+"_path"]=function(r){var r=angular.extend(angular.copy(t.defaults),r||{});a=t.path;var o=angular.copy(e.defaultParams);return i(angular.extend(o,r))},e[n+"_url"]=function(t){return window.location.origin+e[n+"_path"](t)}})};window.Routes=new e}.call(this);