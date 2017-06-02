angular
  .module('allison')
  .controller('HomePageController', HomePageController);

HomePageController.$inject = ['postService'];

function HomePageController(postService) {
  var vm = this;

  vm.getPosts = [];

  activate();

  function activate() {
    postService.getPosts().then(function(response) {
      vm.posts = response.data;
      console.log(response)
    });
  }

  // vm.message = 'Hello World From Allison!';

};
