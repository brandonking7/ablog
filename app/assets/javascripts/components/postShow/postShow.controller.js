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
    // vm.updatedComment = {};
    vm.addComment = addComment;
    vm.saveComment = saveComment;
    vm.commentDelete = commentDelete;
    vm.editComment = false;
    vm.setComment = setComment;
    vm.commentNumber = 0;
    vm.toggleDisplay = toggleDisplay;
    vm.commentReply = false;
    vm.replyToggle = replyToggle;
    vm.addReply = addReply;
    vm.reply = {}
    vm.saveReply = saveReply;
    vm.editReply = false;
    vm.updateToggle = updateToggle;
    vm.updateReply = {}
    vm.work = vm.comment;
    // vm.testWork = copy(work);
    vm.data = vm.comment
    vm.testData = angular.copy(vm.comment.message);
    // vm.$watch('show.name', showNameChanged);



    activate();

    //adds class to just a single comment
    function toggleDisplay(index) {
      vm.comment[index] = ! vm.comment[index];
      vm.editComment = true;
      // activate();
      // vm.comment = {
      //   message: ''
      // };

    }

    function replyToggle(index) {
      vm.reply[index] = !vm.reply[index];
      // vm.editComment = true;
      vm.commentReply = true;

    }

    function updateToggle(index) {
      // activate();
      vm.updateReply[index] = !vm.updateReply[index];
      vm.editReply = true;
      // vm.comment = {
      //   message: ''
      // };
    }

    function setComment() {
      // vm.comment = {
      //   message: ''
      // };
      // activate();
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
      //Update Comment
      vm.comment = {};
      // vm.updatedComment = vm.comment;
      function saveComment(comment_id) {
        console.log(vm.post.id, comment_id)
        console.log(vm.comment.message)
        vm.editComment = false;
        commentService.updateComment(vm.post.id, comment_id, vm.comment)
          .then((response) => {
            if(response.status == 200) {
              // vm.editComment = false;
              vm.comment = {
                message: ''
              };
              activate();
              //  vm.post.comments.push(response.data);
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

      function addReply(comment_id) {
        console.log(comment_id);
        commentService.createReply(comment_id, vm.comment)
          .then((response) => {
            if(response.status == 201) {
              vm.comment = {
                message: ''
              };
              activate();
              // vm.commentReply = false;
              console.log('Reply added & saved!')
            } else {
              alert('Reply failed for some reason!')
            }
          });
      }

      function saveReply(comment_id) {
        console.log($stateParams.id, comment_id)
        commentService.updateReply($stateParams.id, comment_id, vm.comment)
          .then((response) => {
            if(response.status == 200) {
              vm.comment = {
                message: ''
              };
              activate();
              console.log('Successfully updated a reply')
            } else {
              alert('Update failed, something went wrong')
            }
          });
      }


  }
