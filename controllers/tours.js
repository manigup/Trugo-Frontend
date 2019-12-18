"use strict";

app.controller("Tours", function($scope, DataService) {
  $scope.factory = DataService;
  $scope.tags = angular.copy(DataService.tags);
  let duration = "";
  let budget = "";
  let destination = "";
  let starting_city = "";
  let ending_city = "";
  let departure_date = "";
  let url = "";
  let tags = [];
  $scope.msg = "";

  $scope.OnInit = function() {
    DataService.ShowOverlay();
    $scope.media = window.matchMedia("(max-width: 1000px)").matches;
    document.querySelector(".tour-content").classList.remove("tour-content");
    destination = DataService.map ? DataService.map : "";
    departure_date = DataService.date ? DataService.date : "";
    if (destination !== "" || departure_date !== "") {
      ApplyFilters();
    } else {
      getPopularTours();
    }
  };

  function Url() {
    url = "?tag=";
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        if (i > 0) {
          url += ",";
        }
        url += tags[i];
      }
    } else {
      url += "";
    }
    url += "&duration=" + duration;
    url += "&budget=" + budget;
    url += "&starting_city=" + starting_city;
    url += "&ending_city=" + ending_city;
    url += "&destination=" + destination;
    url += "&departure_date=" + departure_date;
    return url;
  }

  $scope.Filters = function() {
    destination = document.querySelector("#destination").value;
    starting_city = document.querySelector("#starting_city").value;
    ending_city = document.querySelector("#ending_city").value;
    departure_date = document.querySelector("#departure_date").value;
    budget = document.querySelector("#budget-range").value;
    duration = document.querySelector("#duration-range").value;
    $scope.closeFilters();
    ApplyFilters();
  };

  $scope.TagsChange = function(name, isChecked) {
    if (isChecked) {
      tags.push(name);
    } else tags.splice(tags.indexOf(name), 1);
    ApplyFilters();
  };

  function ApplyFilters() {
    if (
      tags.length !== 0 ||
      duration !== "" ||
      budget !== "" ||
      destination !== "" ||
      starting_city !== "" ||
      ending_city !== "" ||
      departure_date !== ""
    ) {
      DataService.ShowOverlay();
      DataService.getFilters(Url()).then(
        function(response) {
          $scope.msg = response.data[0];
          $scope.ReadModel = response.data.results;
          DataService.map = "";
          DataService.date = "";
          DataService.HideOverlay();
        },
        function(response) {
          DataService.HideOverlay();
          alert(response.data.message);
        }
      );
    } else {
      DataService.ShowOverlay();
      getPopularTours();
    }
  }

  function getPopularTours() {
    DataService.getTours("P").then(
      function(response) {
        $scope.msg = "";
        $scope.ReadModel = response.data.results;
        DataService.HideOverlay();
      },
      function(response) {
        DataService.HideOverlay();
        alert(response.data.message);
      }
    );
  }

  $scope.ClearFilters = function() {
    DataService.ShowOverlay();
    document.querySelector("#budget-range").value = 0;
    document.getElementById("budget-value").innerHTML = "₹0";
    document.querySelector("#duration-range").value = 0;
    document.getElementById("duration-value").innerHTML = "0 Days";
    document.querySelector("#destination").value = "";
    document.querySelector("#starting_city").value = "";
    document.querySelector("#ending_city").value = "";
    document.querySelector("#departure_date").value = "";
    $scope.tags = DataService.tags;
    tags = [];
    duration = "";
    budget = "";
    destination = "";
    starting_city = "";
    ending_city = "";
    departure_date = "";
    getPopularTours();
  };

  $scope.OpenFilters = function() {
    document.getElementById("sideFilters").style.display = "block";
  };

  $scope.closeFilters = function() {
    document.getElementById("sideFilters").style.display = "none";
  };
});
