angular
  .module('allison')
  .service('commentService', commentService)

  commentService.$inject = ['$http']

  function commentService($http) {
    var service = {}

    service.getComments = getComments;
    service.createComment = createComment;
    service.updateComment = updateComment;
    service.deleteComment = deleteComment;

    service.createReply = createReply;
    service.updateReply = updateReply;



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
    function updateComment(post_id, comment_id, comment) {
      console.log("its hitting comments")
      return $http.patch('/api/posts/' + post_id + '/comments/' + comment_id, comment)

    }
    function deleteComment(post_id, comment_id) {
      return $http.delete('/api/posts/' + post_id + '/comments/' + comment_id )
    }

    // Replies

    function createReply(comment_id, comment) {
      console.log(comment + comment_id);
      return $http.post('/api/comments/' + comment_id + '/comments', comment)
    }
    function updateReply(comment_id, comment_id, comment) {
      return $http.patch('/api/comments/' + comment_id + '/comments/' + comment_id)
    }


  }
