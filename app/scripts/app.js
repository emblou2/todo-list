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
        .state('active', {
            url: '/active',
            templateUrl: 'templates/active.html'
         })
        .state('expired', {
            url: '/expired',
            templateUrl: 'templates/expired.html'
         })
        
    });

app.controller("TodoCtrl", ["$scope", "$firebase", "$interval", function($scope, $firebase, $interval) { 
    console.log("I'm the controller!");
    var ref = new Firebase("https://popping-torch-9799.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    $scope.newTodo = '';

    $scope.todos = [
        {done: false, text: 'first', expired: false},
        {done: false, text: 'second', expired: true},
        {done: true, text: 'third', expired: false}
    ];

    $scope.completedTodos = [];
    function isCompleted() {
        for (i = 0; i< $scope.todos.length; i++){
            if($scope.todo[i].done){
                $scope.completedTodos.push($scope.todos[i]);
                todos.$save(todo);
            }
        }
    };

    $scope.expiredTodos = [];
    function isExpired() {
        var today = new Date()
        var now = today.getTime();
        var todo = todo.$getRecord(id);
        if (now - todo.created >= 10000) {
            expired = true;
        }
        for (i = 0; i< $scope.todos.length; i++){
            if($scope.todo[i].expired){
                $scope.expiredTodos.push(scope.todos[i]);
                todos.$save(todo);
            }
        }
    };

    $scope.addTodo = function(todo) {
        console.log("Todo is", todo);
        var totallyNewTodo = {
            done: false,
            text: todo,
            expired: false,
            created: Firebase.ServerValue.TIMESTAMP
        };
        $scope.todos.push(totallyNewTodo);
        todos$save(todo);
          //$scope.newTodo = '';
        console.log("Todos", $scope.todos);
    };



    $scope.callAtInterval = function() { 
        console.log("Interval works"); 
    };

    $interval( function (){ $scope.callAtInterval(); }, 300, [3]);
}]);

       