angular
  .module('allison')
  .controller('PostShowController', PostShowController);

  PostShowController.$inject = ['$stateParams', '$state', 'postService'];

  function PostShowController($stateParams, $state, postService) {

    var vm = this;

    vm.post = [];
    vm.postDelete = postDelete;

    // vm.post = $stateParams.post_id;

    activate();

    function activate() {
      postService.getPost($stateParams.id).then(function(response) {
        vm.post = response.data;
        console.log(response);
      });
    }
    function postDelete(id) {
      console.log("PostShowController" + $stateParams.id);
      postService.deletePost($stateParams.id).then(function(response) {
        $state.go('home')
      });
    }
  }
