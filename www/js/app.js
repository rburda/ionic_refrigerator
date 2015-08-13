//require('angular'); 
//require('ionic');
//require('./filters')

// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//module.exports = angular.module('refrigerator', ['ionic', 'restaurantFilters'])
angular.module('refrigerator', ['ionic'])

  .controller('RefrigeratorCtrl', function($scope, $ionicModal) {
    $scope.menuItems = [
      { title: 'In the Fridge' },
      { title: 'What\'s for Dinner' }
    ];

    $scope.updateItemModel = function() {
      $scope.refrigeratorItems = [];
      var sizeOfChunk = 3;
      for (var i=0; i <= $scope.inputArray.length-1; i+=sizeOfChunk) {
        var row = $scope.inputArray.slice(i, Math.min(i+sizeOfChunk, $scope.inputArray.length));
        $scope.refrigeratorItems.push({"rowId": i, "elements":row});
      }       
    };

   // Called when the form is submitted
    $scope.createFood = function(food) {
      $scope.inputArray.push({"id":$scope.inputArray.length, "title":food.title, 'img':'img/apple.png'});
      $scope.updateItemModel();
      $scope.foodModal.hide();
      food.title="";
    };

    // Open our new task modal
    $scope.newFood = function() {
      $scope.foodModal.show();
    };

    // Close the new task modal
    $scope.closeNewFood = function() {
      $scope.foodModal.hide();
    };    

    $scope.inputArray = [];
    for (var i=0; i < 3; i++) {
      $scope.inputArray.push({"id":i, "title":'apple', "img":'img/apple.png'});
    }
    $scope.updateItemModel();   

    // Create and load the Modal
    $ionicModal.fromTemplateUrl(
      'new-food.html', 
      function(modal) { $scope.foodModal = modal; }, 
      {scope: $scope, animation: 'slide-in-up'}
    );
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

