"use strict";

var app = angular.module("trugo", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/trugo/templates/home.html",
      controller: "Main"
    })
    .when("/tours", {
      templateUrl: "/trugo/templates/tours.html",
      controller: "Tours"
    })
    .when("/destination/:category", {
      templateUrl: "/trugo/templates/destination.html",
      controller: "Destination"
    })
    .when("/destinations", {
      templateUrl: "/trugo/templates/destinations.html",
      controller: "Destinations"
    })
    .when("/itinerary/:name", {
      templateUrl: "/trugo/templates/itinerary.html",
      controller: "Itinerary"
    })
    .when("/event/:name", {
      templateUrl: "/trugo/templates/event.html",
      controller: "Events"
    })
    .when("/checkout/:name", {
      templateUrl: "/trugo/templates/checkout.html",
      controller: "Checkout"
    })
    .when("/success", {
      templateUrl: "/trugo/templates/success.html"
    })
    .otherwise({
      templateUrl: "/trugo/templates/404.html",
      controller: "404"
    });
  $locationProvider.html5Mode(true);
});

app.run([
  "$rootScope",
  "$location",
  function($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function() {
      $rootScope.location = $location.path();
    });
  }
]);
