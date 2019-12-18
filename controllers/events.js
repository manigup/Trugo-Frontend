"use strict";

app.controller("Events", function($scope, $routeParams, DataService) {
  $scope.OnInit = function() {
    DataService.getEvents().then(
      function(response) {
        let data = response.data.results.filter(
          event => event.event_name === $routeParams.name.split("_").join(" ")
        );
        data[0].attractions = JSON.parse(data[0].attractions);
        $scope.EventModel = data[0];
        DataService.getTours("E", $scope.EventModel.tours).then(
          function(response) {
            $scope.RelatedTours = response.data.results;
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
