/*
1. Define Angular application (make sure link to Angular library is included)
2. Inject firebase (make sure link to Firebase library is included)
3. Create controller
4. Define routes (put above controller)
5. Use angular's $interval
*/
var app = angular.module("todoApp", ['firebase', 'ui.router'])

.config(function ($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('history', {
            url: '/history',
            templateUrl: 'templates/history.html'   
        })
        .state('active'), {
            url: '/active',
            templateUrl: 'templates/active.html'
        }
        .state('/expired'), {
            url: '/expired',
            templateUrl: 'templates/expired.html'
        }
        
})

app.controller("TodoCtrl", ["$scope", "$firebase", "$interval", function($scope, $firebase, $interval) { 
    console.log("I'm the controller!");
    var ref = new Firebase("https://popping-torch-9799.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    $scope.textTest = "Hello!";
     //var textTest = "Hello!"

    $scope.todos = [
        {done: false, text: 'first', archived: true},
        {done: false, text: 'second', archived: false}
    ];

    $scope.addTodo = function() {
        var newTodo = {
            done: false,
            text: $scope.todoText
        };
        $scope.todos.push(newTodo);
        $scope.todoText = '';
    };

    $scope.callAtInterval = function() { 
        console.log("Interval works"); 
    };

    $interval( function (){ $scope.callAtInterval(); }, 300, [3]);
}]);

    

        




 
