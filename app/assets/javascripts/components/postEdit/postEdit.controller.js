angular
  .module('allison')
  .controller('PostEditController', PostEditController)

PostEditController.$inject = ['$stateParams', '$state', 'postService'];

function PostEditController($stateParams, $state, postService) {
  var vm = this;

  vm.post = {};
  vm.savePost = savePost;

  postService.getPost($stateParams.id).then(function(response) {
    vm.post = response.data;
    console.log(response);
  });

  function savePost() {
    postService.updatePost(vm.post.id, vm.post).then((response) => {
      if(response.status == 200) {
        $state.go('postShow', { post_id: response.data.post_id })
      } else {
        alert('Update had a problem!')
      }
    });
  }
}
