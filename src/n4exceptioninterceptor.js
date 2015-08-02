"use strict";

;
(function(ng) {
  ng
    .module('n4ExceptionInterceptor', [])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.unshift('n4ExceptionInterceptor');
    }])
    .provider('n4ExceptionInterceptor', [
      function() {
        var self = this;

        self.errorMessage = 'Serviço indisponível, tente novamente.';

        self.$get = ['$q', '$window', '$log', function($q, $window, $log) {
          return {
            responseError: function(rejection) {
              rejection.status = rejection.status || 400;

              if (!!rejection.data) {
                return $q.reject(angular.extend(new TypeError(rejection.data), {
                  status: rejection.status
                }));
              }

              $log.error(rejection);
              return $q.reject(angular.extend(new TypeError(self.errorMessage), {
                status: rejection.status
              }));
            }
          };
        }];
      }
    ]);
}(angular))
