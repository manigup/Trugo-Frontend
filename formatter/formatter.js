app.filter("budget", function() {
  return function(data) {
    return parseInt(data).toLocaleString("en-IN");
  };
});

app.filter("trusted", function($sce) {
  return function(stringToParse) {
    if (stringToParse !== undefined) {
      var div = document.createElement("div");
      stringToParse = stringToParse.replace(/&gt;nt+/g, "&gt;");
      stringToParse = stringToParse.replace(/&gt;n+/g, "&gt;");
      div.innerHTML = stringToParse;
      return $sce.trustAsHtml(div.textContent);
    }
  };
});
