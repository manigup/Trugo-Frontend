"use strict";

app.controller("Checkout", function(
  $http,
  $scope,
  $routeParams,
  DataService,
  $location
) {
  $scope.OnInit = function() {
    $http
      .get("/api/itinerary?key=" + $routeParams.name.split("_").join(" "))
      .then(
        function(response) {
          if (response.data !== "") {
            $scope.Model = response.data;
          } else {
            $location.path("/");
          }
        },
        function() {
          $location.path("/");
        }
      );
  };

  var stripe = Stripe("pk_test_e21ahbFMtRFzRjG2cuUdlth900z3OpQz16");
  var elements = stripe.elements();
  var card = elements.create("card");
  card.mount("#card-element");
  card.addEventListener("change", function(event) {
    var displayError = document.getElementById("card-errors");
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = "";
    }
  });

  $scope.checkout = function() {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
        DataService.HideOverlay();
      } else {
        DataService.ShowOverlay();
        let payload = { ...$scope.Model, ...$scope.Checkout };
        payload.token = result.token.id;
        $http.post("/api/checkout", payload).then(
          function(response) {
            DataService.HideOverlay();
            if(response.data.message === "succeeded"){
              $location.path("/success");
            }
          },
          function(response) {
            alert(response.data.message);
            DataService.HideOverlay();
          }
        );
      }
    });
  };

  $scope.calcBudget = function(members) {
    let budget =
      $scope.Model.discount_budget !== "0"
        ? $scope.Model.discount_budget
        : $scope.Model.actual_budget;
    document.getElementById("pay").innerHTML =
      "Pay " + (parseInt(members) * budget).toLocaleString("en-IN");
  };
});
