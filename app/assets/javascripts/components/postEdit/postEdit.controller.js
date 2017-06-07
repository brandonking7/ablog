angular
  .module('allison')
  .controller('PostEditController', PostEditController)

PostEditController.$inject = ['$stateParams', '$state', 'postService'];

function PostEditController($stateParams, $state, postService) {
  var vm = this;

  vm.post = {};
  vm.updatePost = updatePost;

  postService.getPost($stateParams.id).then(function(response) {
    vm.post = response.data;
    console.log(response);
  });

  function updatePost() {
    postService.updatePost(vm.post.id, vm.post).then((response) => {
      console.log('PostEditController' + ' ' + response.data.id)
      if(response.status == 200) {
        $state.go('postShow', { id: response.data.id })
      } else {
        alert('Update had a problem!')
      }
    });
  }
}
