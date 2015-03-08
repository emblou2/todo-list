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
    $scope.todo = { text: "", priority: "normal" };
    $scope.priorities = [{type:'normal'}, {type:'medium'}, {type:'high'}];
    $scope.todos = [
        {done: false, text: 'first', expired: false, priority: 'high', created: new Date()},
        {done: false, text: 'second', expired: true, priority: 'medium', created: new Date()},
        {done: true, text: 'third', expired: false, priority: 'low', created: new Date()}
    ];

    $scope.isExpired = function() {
        var today = new Date()
        var now = today.getTime();
        // var todo = todo.$getRecord(id);
        // if more than 5 seconds old, expire it

        $scope.todos.forEach(function(todo){
            var createdDate = todo.created,
                createdTime = createdDate.getTime();
            console.log(now - createdTime);

            // if todo was created more than five seconds ago.. ( we can change this time later )
            if ((now - createdTime) >= 5000){
                todo.expired = true;
            }
        });
    };

    $scope.addTodo = function() {
        $scope.totallyNewTodo = {
            done: false,
            text: $scope.todo.text,
            expired: false,
            created: new Date(),
            // created: Firebase.ServerValue.TIMESTAMP,
            priority: $scope.todo.priority
        
        };
        $scope.todos.push($scope.totallyNewTodo);
        // todos$save(todo);
        $scope.todo.text = "";
        $scope.todo.priority = 'normal';

    };


    $scope.callAtInterval = function() { 
        console.log("Interval works"); 
    };

    $interval( function (){ $scope.isExpired(); }, 10000, [5]);
}]);

       