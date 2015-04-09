'use strict';

angular.module('<%= scriptAppName %>')
  .controller('MainCtrl', function ($scope, $http<% if(filters.socketio) { %>, socket<% } %>) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;<% if(filters.socketio) { %>
      socket.syncUpdates('thing', $scope.awesomeThings);<% } %>
    });
<% if(filters.mongoose || filters.socketio) { %>
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing.<% if (filters.mongoose) { %>_<% } %>id);
    };<% } %><% if(filters.socketio) { %>

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });<% } %>
  });
