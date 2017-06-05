angular
  .module('allison')
  .controller('PostShowController', PostShowController);

  PostShowController.$inject = ['$stateParams', 'postService'];

  function PostShowController($stateParams, postService) {

    var vm = this;

    vm.post = [];

    // vm.post = $stateParams.post_id;

    activate();

    function activate() {
      postService.getPost($stateParams.id).then(function(response) {
        vm.post = response.data;
        console.log(response);
      });
    }
  }
