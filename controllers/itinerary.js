"use strict";

app.controller("Itinerary", function(
  $scope,
  $http,
  $routeParams,
  $location,
  DataService
) {
  $scope.OnInit = function() {
    DataService.ShowOverlay();
    $http.get("/api/itinerary?key=" + $routeParams.name.split("_").join(" ")).then(
      function(response) {
        if (response.data !== "") {
          response.data.facilities = JSON.parse(response.data.facilities);
          response.data.tourist_attractions = JSON.parse(
            response.data.tourist_attractions
          );
          response.data.itinerary = JSON.parse(response.data.itinerary);
          response.data.carousel = JSON.parse(response.data.carousel);
          response.data.carousel.push({
            image_name: response.data.package_image_name
          });
          $scope.Model = response.data;
          document.querySelector(".content").classList.remove("content");
          DataService.HideOverlay();
        } else {
          $location.path("/");
        }
      },
      function() {
        $location.path("/");
      }
    );
  };

  $scope.Zoom = function() {
    $scope.index = this.data.id - 1;
  };
});
