
 // initial API call
$(document).ready( function() {
  $(".search").click(function(){
    apiCall();
  })
})


// API call after scrolling to the bottom of page
$(window).scroll(function() {
  if($(window).scrollTop() == $(document).height() - $(window).height()) {
    // ajax call get data from server and append to the div
    apiCall();
  }
});

var apiCall = function() {
  var keyword = $("input[name='keyword']").val();
  var url = "http://api.giphy.com/v1/gifs/search?q="+keyword+"&api_key=dc6zaTOxFJmzC"
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json"
  }).done ( function(response){
    console.log(response.data[0].url);
    // call giphy function below to pull random gifs
    giphy(response);
  }).fail ( function (){
    console.log("Failure");
  }).always( function(){
    console.log("Something's happening");
  })
}


var giphy = function(response) {
  for (var i=0;i<10;i++) {
    // provides random number up to the length of the data array
    var rand = Math.round(Math.random() * (response.data.length - 1));
    // append image to body
    $('body').append("<img src = '"+response.data[rand].images.fixed_height.url+"'>")
  }
}
