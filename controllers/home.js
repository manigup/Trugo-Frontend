"use strict";

app.controller("Main", function($scope, $location, DataService) {
  $scope.OnInit = function() {
    $scope.enquiry = document.cookie.indexOf("enquiry");
    DataService.getDestinations().then(
      function(response) {
        $scope.Destinations = response.data.results;
        DataService.getReviews().then(
          function(response) {
            for (let index = 0; index < response.data.results.length; index++) {
              response.data.results[index].stars = [];
              for (let i = 0; i < 5; i++) {
                if (i < response.data.results[index].customer_rating) {
                  response.data.results[index].stars.push({
                    status: true
                  });
                } else {
                  response.data.results[index].stars.push({
                    status: false
                  });
                }
              }
            }
            $scope.Reviews = response.data.results;
            DataService.getTours("T").then(
              function(response) {
                $scope.Trending = response.data.results;
                DataService.getTours("W").then(
                  function(response) {
                    $scope.Weekend = response.data.results;
                    DataService.getTours("H").then(
                      function(response) {
                        $scope.Honeymoon = response.data.results;
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
      },
      function(response) {
        alert(response.data.message);
      }
    );

    $scope.closeContact = function() {
      document.querySelector(".contact").style.display = "none";
    };

    $scope.Filters = function() {
      DataService.date = document.querySelector("#departure_date").value;
      DataService.map = document.querySelector("#destination").value;
      if (DataService.map !== "" || DataService.date !== "") {
        $location.path("/tours");
      }
    };
  };
});
