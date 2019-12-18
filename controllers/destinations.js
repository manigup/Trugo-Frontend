"use strict";

app.controller("Destinations", function($scope, DataService) {
  $scope.OnInit = function() {
    DataService.getDestinations("A").then(
      function(response) {
        $scope.Destinations = response.data.results;
      },
      function(response) {
        alert(response.data.message);
      }
    );
  };
});
