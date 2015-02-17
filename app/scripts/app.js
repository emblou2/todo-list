/*
1. Define Angular application (make sure link to Angular library is included)
2. Inject firebase (make sure link to Firebase library is included)
3. Create controller
4. Define routes (put above controller)
*/
var app = angular.module("todoApp", ["firebase"]);

app.controller("TodoCtrl", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://popping-torch-9799.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();
  }
]);

function TodoCtrl($scope) {
  $scope.todos =
  {done: false, text: 'first'},
  {done: false, text: 'second'}
  ];
}