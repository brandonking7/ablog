angular
  .module('allison')
  .service('commentService', commentService)

  commentService.$inject = ['$http']

  function commentService($http) {
    var service = {}

    service.getComments = getComments;
    service.createComment = createComment;


    return service;

    function getComments() {
      console.log('Suppose to be comments')
      return $http.get('/api/comments/')
      // console.log(post_id)
      // return $http.get('/api/posts/' + post_id + '/comments')
    }
    function createComment(comment, post_id) {
      console.log(comment + post_id);
      return $http.post('/api/posts/' + post_id + '/comments/', comment)

    }
  }
