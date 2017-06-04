angular
  .module('allison')
  .service('commentService', commentService)

  commentService.$inject = ['$http']

  function commentService($http) {
    var service = {}

    service.getComments = getComments;


    return service;

    function getComments() {
      console.log()
      return $http.get('/api/comments/')
      // console.log(post_id)
      // return $http.get('/api/posts/' + post_id + '/comments')
    }
  }
