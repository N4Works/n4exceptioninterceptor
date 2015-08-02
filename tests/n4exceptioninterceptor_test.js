"use strict";

describe('n4ExceptionInterceptor', function() {
  var _rootScope, service;

  describe('provider', function() {
    var provider;

    beforeEach(module('n4ExceptionInterceptor', function(n4ExceptionInterceptorProvider) {
      provider = n4ExceptionInterceptorProvider;
    }));

    describe('provider', function() {
      it('should have error message as "Serviço indisponível, tente novamente." by default', inject(function() {
        expect(provider.errorMessage).toEqual('Serviço indisponível, tente novamente.');
      }));
    });
  });

  describe('responseError', function() {
    beforeEach(module('n4ExceptionInterceptor'));


    beforeEach(inject(function($rootScope, n4ExceptionInterceptor) {
      _rootScope = $rootScope;
      service = n4ExceptionInterceptor;
    }));

    it('Should return an exception rejection with the data property value', function() {
      service.responseError({
        status: 500,
        data: 'Exception message'
      }).catch(function(error) {
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toBe('Exception message');
        expect(error.status).toBe(500);
      });

      _rootScope.$digest();
    });

    it('Should return an exception rejection with default error message', function() {
      service.responseError({}).catch(function(error) {
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toBe('Serviço indisponível, tente novamente.');
        expect(error.status).toBe(400);
      });

      _rootScope.$digest();
    });
  });
});
