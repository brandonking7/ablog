angular
  .module('allison')
  .controller('PostShowController', PostShowController);

  PostShowController.$inject = ['$stateParams', '$state', 'postService', 'commentService'];

  function PostShowController($stateParams, $state, postService, commentService) {

    var vm = this;

    vm.post = [];
    vm.comment = {
      message: ''
    };
    vm.postDelete = postDelete;
    vm.addComment = addComment;


    // vm.post_id = $stateParams.post_id;

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
      function addComment() {
        commentService.createComment(vm.comment, $stateParams.id)
        .then((response) => {
          if(response.status === 201) {
            console.log('Saved comment')
          } else {
            alert('Server is down');
          }

        })

      }

  }
