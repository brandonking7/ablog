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
    // vm.newComment = {message: ''};


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
      // vm.comments.push(vm.comment)
        commentService.createComment(vm.comment, $stateParams.id)
        .then((response) => {
          if(response.status === 201) {
             vm.post.comments.push(response.data);
            //  or
            //  vm.post.comments.push(vm.comment);
            // To just reload the page
            // window.location.pathname = '/posts/' + $stateParams.id
            vm.comment = {
              message: ''
            };
            console.log('Saved Comment')
          } else {
            alert('Server is down');
          }
        });
      }
  }
