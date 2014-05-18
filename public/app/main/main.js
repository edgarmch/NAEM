angular.module('app').controller('mainCtrl', function($scope){
  $scope.courses = [
      {name:'SO para algunos', featured: true, published: new Date('1/1/2013')},
      {name:'SO para ', featured: true, published: new Date('1/2/2013')}
  ]
});