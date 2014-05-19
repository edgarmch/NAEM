angular.module('app').controller('NavBarLoginCtrl', function($scope, $http){
  $scope.signin = function(username, pasword) {
       $http.post('/login', {username:username, password:pasword}).then(function(response){
       if(response.data.success){
        console.log('logged in');
       }else{
        console.log('failed to log in');
       }
   })
  }
  })
 