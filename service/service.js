"use strict";

app.factory("DataService", function($http) {
  var factory = {
    date: "",
    map: "",
    tags: [
      { tag: "Adventure" },
      { tag: "Beach" },
      { tag: "Trekking" },
      { tag: "Cruise" },
      { tag: "Honeymoon" },
      { tag: "Family" }
    ]
  };
  factory.ShowOverlay = function() {
    document.querySelector(".overlay").classList.remove("notvisible");
    document.querySelector(".overlay").classList.add("visible");
  };
  factory.HideOverlay = function() {
    document.querySelector(".overlay").classList.remove("visible");
    document.querySelector(".overlay").classList.add("notvisible");
  };
  factory.getTours = function(type, tours) {
    let filter = type !== "" ? "?filters=" + type : "";
    let key = tours !== undefined ? "&key=" + tours : "";
    return $http.get("/api/tours" + filter + key);
  };
  factory.getDestinations = function(type) {
    let filter = type !== undefined ? "?filters=" + type : "";
    return $http.get("/api/destination" + filter);
  };
  factory.getReviews = function() {
    return $http.get("/api/reviews");
  };
  factory.Subscribe = function(payload) {
    return $http.post("/api/subscribe", payload);
  };
  factory.getFilters = function(url) {
    return $http.get("/api/filters" + url);
  };
  factory.getEvents = function() {
    return $http.get("/api/events");
  };
  factory.sendEnquiry = function(payload) {
    return $http.post("/api/enquiry", payload);
  };
  return factory;
});
