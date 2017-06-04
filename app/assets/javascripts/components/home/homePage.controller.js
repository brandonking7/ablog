angular
  .module('allison')
  .controller('HomePageController', HomePageController);

HomePageController.$inject = ['$stateParams', 'postService', 'commentService'];

function HomePageController($stateParams, postService, commentService) {
  var vm = this;

  vm.posts = [];
  vm.comments = [];
  // vm.getPost = []
  // vm.post = $stateParams.post_id;

  activate();

  function activate() {
    postService.getPosts().then(function(response) {
      vm.posts = response.data;
      console.log(response)
    });
    commentService.getComments().then(function(response) {
      vm.comments = response.data;
      // console.log(response)
    });
  }

  // vm.message = 'Hello World From Allison!';

};
