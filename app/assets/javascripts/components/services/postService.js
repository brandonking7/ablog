angular
  .module('allison')
  .service('postService', postService)

  postService.$inject = ['$http']

  function postService($http) {

    var service = {}
    service.getPosts = getPosts;

    return service;

    function getPosts() {
      console.log('Hey from Posts!');
      return $http.get('/api/posts');
    }
  }
