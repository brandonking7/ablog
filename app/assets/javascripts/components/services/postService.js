angular
  .module('allison')
  .service('postService', postService)

  postService.$inject = ['$http']

  function postService($http) {

    var service = {}

    service.getPosts = getPosts;
    service.getPost = getPost;
    service.createPost = createPost;
    service.updatePost = updatePost;
    service.deletePost = deletePost;

    return service;

    function getPosts() {
      console.log('Hey from Posts!');
      return $http.get('/api/posts');
    }
    function getPost(id) {
      console.log('Individual Post!');
      return $http.get('/api/posts/' + id);
    }
    function createPost(post) {
      console.log(post);
      return $http.post('/api/posts/', post);
    }
    function updatePost(post_id, post) {
      return $http.patch('/api/posts/' + post_id, post);
    }
    function deletePost(id) {
      return $http.delete('/api/posts/' + id);
    }
  }
