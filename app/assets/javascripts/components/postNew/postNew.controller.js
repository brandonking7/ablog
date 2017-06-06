angular
  .module('allison')
  .controller('PostNewController', PostNewController);

PostNewController.$inject = ['$state', 'postService'];

function PostNewController($state, postService) {
  var vm = this;

  vm.post = {
    title: '',
    content: ''
  };

  vm.savePost = savePost;

  function savePost() {
    postService.createPost(vm.post)
                .then((response) => {
                  if(response.status === 201) {
                    $state.go('home')
                  } else {
                    alert('Server is down');
                  }
                })

  }
}
