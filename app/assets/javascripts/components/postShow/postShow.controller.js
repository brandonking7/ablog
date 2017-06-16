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
    vm.updatedComment = {};
    vm.addComment = addComment;
    vm.saveComment = saveComment;
    vm.commentDelete = commentDelete;
    vm.editComment = false;
    vm.setComment = setComment;
    vm.commentNumber = 0;
    vm.toggleDisplay = toggleDisplay;
    vm.commentReply = false;
    vm.replyToggle = replyToggle;


    activate();

    //adds class to just a single comment
    function toggleDisplay(index) {
      vm.comment[index] = ! vm.comment[index];
      vm.editComment = true;
    }

    function replyToggle(index) {
      vm.commentReply = true;

    }
    function setComment(index) {
      vm.commentNumber = index;
      vm.editComment = true;
    }

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
      vm.comment = {};
      function saveComment(comment_id) {
        console.log(comment_id)
        console.log(vm.comment.message)
        vm.editComment = true;
        commentService.updateComment(vm.post.id, comment_id, vm.comment)
          .then((response) => {
            if(response.status == 200) {
              vm.editComment = false;
              vm.comment = {
                message: ''
              };
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
