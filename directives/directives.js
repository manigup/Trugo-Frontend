app.directive("slick", function() {
  return {
    restrict: "A",
    link: function(scope) {
      if (scope.$last) {
        $(".slick").slick({
          prevArrow: $(".owl-prev"),
          nextArrow: $(".owl-next"),
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    }
  };
});

app.directive("accordion", function() {
  return {
    restrict: "A",
    link: function() {
      $(".accordion-box").on('click', '.acc-btn', function () {
        var outerBox = $(this).parents('.accordion-box');
        var target = $(this).parents('.accordion');
        if ($(this).hasClass('active') !== true) {
            $(outerBox).find('.accordion .acc-btn').removeClass('active');
        }
        if ($(this).next('.acc-content').is(':visible')) {
            return false;
        } else {
            $(this).addClass('active');
            $(outerBox).children('.accordion').removeClass('active-block');
            $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
            target.addClass('active-block');
            $(this).next('.acc-content').slideDown(300);
        }
      });
    }
  };
});

app.directive("range", function() {
  return {
    restrict: "A",
    link: function(scope, element, attributes) {
      var slider = document.getElementById(attributes.id);
      var output = document.getElementById(attributes.range + "-value");
      output.innerHTML = attributes.range === "budget" ? "₹" + parseInt(slider.value).toLocaleString("en-IN") : slider.value + " " + "Days";
      slider.oninput = function() {
        output.innerHTML = attributes.range === "budget" ? "₹" + parseInt(this.value).toLocaleString("en-IN") : this.value + " " + "Days";
      };
    }
  };
});

app.directive("mainfilters", function() {
  return {
    restrict: "A",
    link: function(scope, element, attributes) {
      var data = JSON.parse(attributes.mainfilters);
      document.querySelector("#destination").value = data.map ? data.map : "";
      document.querySelector("#departure_date").value = data.date ? data.date : "";
    }
  };
});

app.directive("scroll", function() {
  return {
    restrict: "A",
    link: function() {
      $(".scroll-to-top").on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, 400);
      });
    }
  };
});

app.directive("subscribe", function(DataService) {
  return {
    restrict: 'E',
    link: function(scope) {
      scope.Subscribe = function() {
        DataService.Subscribe(scope.subscribe).then(
          function(success) {
            document.querySelector(".msg").innerHTML = success.data.message;
            document.querySelector(".msg").classList.remove("error_msg");
            document.querySelector(".msg").classList.add("success_msg");
            document.querySelector("#email").value = "";
          },
          function(error) {
            document.querySelector(".msg").innerHTML = error.data.message;
            document.querySelector(".msg").classList.remove("success_msg");
            document.querySelector(".msg").classList.add("error_msg");
          }
        );
      }
    }
  };
});

app.directive("highlights", function() {
  return {
    restrict: 'E',
    link: function() {
      $("#Highlights").on('shown.bs.modal', function() {
        $(this).find("iframe").attr("src", "https://www.youtube.com/embed/rstCWJX8h7A?autoplay=1"); 
     });
      $("#Highlights").on("hidden.bs.modal", function() {
        $(this).find("iframe").attr("src", "");               
     });
    }
  };
});

app.directive("enquiry", function(DataService) {
  return {
    restrict: 'E',
    link: function(scope,element) {
      scope.Enquiry = function() {
        element[0].nextElementSibling.setAttribute("disabled", "disabled");
        element[0].nextElementSibling.innerText = "Sending...";
        DataService.sendEnquiry(scope.Contact).then(
          function(response) {
            alert(response.data.message);
            scope.Contact = "";
            document.querySelector(".contact").style.display = "none";
            let date = new Date();
            date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
            document.cookie = "enquiry;" + "expires=" + date.toUTCString() + ";path=/";
          },
          function(response) {
            alert(response.data.message);
            element[0].nextElementSibling.removeAttribute("disabled");
            element[0].nextElementSibling.innerText = "Submit";
          }
        );
      }
    }
  };
});

app.directive("events", function(DataService) {
  return {
    restrict: "A",
    link: function(scope) {
      DataService.getEvents().then(
        function(response) {
          scope.EventsModel = response.data.results;
        },
        function(response) {
          alert(response.data.message);
        }
      );
    }
  };
});

app.directive("clicker", function($location) {
  return {
    restrict: 'E',
    link: function(scope, element, attributes) {
      scope.open = function() {
        $location.path("/" + attributes.location + "/" + attributes.data.split(" ").join("_"));
      }
    }
  };
});

app.directive("alldestinations", function(DataService) {
  return {
    restrict: 'E',
    link: function(scope) {
      DataService.getDestinations("A").then(
        function(response) {
          scope.DestinationModel = response.data.results;
        },
        function(response) {
          alert(response.data.message);
        }
      );
    }
  };
});