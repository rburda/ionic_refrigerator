require('angular'); 
require('ionic');

// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
module.exports = angular.module('refrigerator', ['ionic'])

  .controller('RefrigeratorCtrl', function($scope, $ionicModal) {
    $scope.menuItems = [
      { title: 'In the Fridge' },
      { title: 'What\'s for Dinner' }
    ];

    $scope.refrigeratorItems = [
        { row: [{title:'apple', 'img': 'img/apple.png'}, {title: 'apple', img: 'img/apple.png' }, {title: 'apple', img: 'img/apple.png'}]},
        { row: [{title:'apple', 'img': 'img/apple.png'}, {title: 'apple', img: 'img/apple.png' }, {title: 'apple', img: 'img/apple.png'}]}
    ];

    // Create and load the Modal
    $ionicModal.fromTemplateUrl(
      'new-food.html', 
      function(modal) {
        $scope.foodModal = modal;
      }, 
      {scope: $scope, animation: 'slide-in-up'});

   // Called when the form is submitted
    $scope.createFood = function(food) {
      $scope.refrigeratorItems.push({row: [{title:food.title, 'img':'img/apple.png'}]});
      $scope.foodModal.hide();
      task.title = "";
    };

    // Open our new task modal
    $scope.newFood = function() {
      $scope.foodModal.show();
    };

    // Close the new task modal
    $scope.closeNewFood = function() {
      $scope.foodModal.hide();
    };
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
 });

