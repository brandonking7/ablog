angular
  .module('allison')
  .controller('PostShowController', PostShowController);

  PostShowController.$inject = ['$stateParams', '$state', 'postService', 'commentService'];

  function PostShowController($stateParams, $state, postService, commentService) {

    var vm = this;

    vm.post = [];
    vm.postDelete = postDelete;
    vm.comment = {
      message: ''
    };
    vm.addComment = addComment;
    vm.updateComment = updateComment;
    vm.commentDelete = commentDelete;

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
            //  vm.post.comments.push(response.data);
            activate();
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
      function updateComment() {
        vm.comment = {}
        commentService.updateComment(vm.post.id, vm.comment.id, vm.comment)
          .then((response) => {
            if(response.status == 200) {
              activate();
              console.log('Update Successful!')
            } else {
              alert('Update failed, something went wrong')
            }
          });

      }

      function commentDelete(post_id, comment_id) {
        commentService.deleteComment(post_id, comment_id)
          .then((response) => {
            console.log('Deleted a comment');
            activate();
          });

      }


  }
