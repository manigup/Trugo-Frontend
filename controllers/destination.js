"use strict";

app.controller("Destination", function($scope, $routeParams, DataService) {
  $scope.OnInit = function() {
    $scope.category = $routeParams.category;
    DataService.getFilters(
      "?tag=&duration=&budget=&starting_city=&ending_city=&destination=" +
        $scope.category +
        "&departure_date="
    ).then(
      function(response) {
        $scope.RelatedTours = response.data.results;
        DataService.getDestinations($scope.category).then(
          function(response) {
            $scope.DestinationContent = response.data.results[0].detail;
          },
          function(response) {
            alert(response.data.message);
          }
        );
      },
      function(response) {
        alert(response.data.message);
      }
    );
  };
});
