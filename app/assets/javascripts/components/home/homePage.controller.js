angular
  .module('allison')
  .controller('HomePageController', HomePageController);

HomePageController.$inject = [];

function HomePageController() {
  var vm = this;

  vm.message = 'Hello World From Allison!';

};
