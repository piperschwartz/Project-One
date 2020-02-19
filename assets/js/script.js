$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.parallax').parallax();
  $('#newSearch').hide();
});
function searchFood() {
  var search = $("#search").val().trim();
  var queryURL = "https://api.edamam.com/search?q=" + search + "&app_id=$c4810d21&app_key=$e19d9501e0d8f713b5e6f1eb31af4ee2";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.hits;
    for (var i = 0; i < results.length; i++) {

      //variables to append to the recipe card DIV
      var recipeImg = results[i].recipe.image;
      var recipeTitle = results[i].recipe.label;
      var healthInfo = results[i].recipe.healthLabels;
      var ingredList = results[i].recipe.ingredientLines;
      var recipeURL = results[i].recipe.url;
      //variables to append to the recipe card DIV


      //creates the sharable links for social media 
      var social = "https://www.shareaholic.com/api/share/?v=1&apitype=1&apikey=8943b7fd64cd8b1770ff5affa9a9437b&service=5&title=" + recipeTitle + "&link=" + recipeURL + "&shortener=google&source=Shareaholic&";
      var socialTwitter = "https://www.shareaholic.com/api/share/?v=1&apitype=1&apikey=8943b7fd64cd8b1770ff5affa9a9437b&service=7&title=" + recipeTitle + "&link=" + recipeURL + "&shortener=google&source=Shareaholic&template=Recipe: ${title} (${short_link})";
      //creates the sharable links for social media 



      //creates new div to add to HTML fot recipe cards
      $('#recipeCard').prepend('<div class="card"><div class="card-image"><img src="' + recipeImg + '"<br><div class="card-content"> <p class="info">' + recipeTitle + '</p><br><p class="info2">' + healthInfo + '<br><br>' + ingredList + '</p><a href="" class="halfway-fab btn-floating purple pulse"><i class="material-icons">favorite</i></a><br></div></div><div class="card-action"><a href="#"class="infoLink">More details</a><a href="' + social + '" class= "shareBtn"> Share on Facebook!</a><br><a href="' + socialTwitter + '" class= "shareBtn">Share on Twitter!</a></div></div>');
      //creates new div to add to HTML fot recipe cards

      $(".infoLink").attr("href", recipeURL)

      console.log(recipeTitle)
      console.log(results)
      console.log(socialTwitter)
      console.log(social)

    };//ends the ForLoops



    //adding social attr to html components
    $(".shareTo").attr("href", social)
    $(".shareToTwitter").attr("href", socialTwitter)
    //adding social attr to html components
    $(".halfway-fab btn-floating purple pulse").on('click', function () {
      window.open(results[i].recipe.url);
    });

    //click to open in new tab
    $(".infoLink").on('click', function () {
      window.open(results[i].recipe.url);
    });
    //click to open in new tab


  })//end function for response 



    ;
}//end function for searchFood


// the visibility function in our click button
(function ($) {
  $.fn.invisible = function () {
    return this.each(function () {
      $(this).css("visibility", "hidden");
    });
  };
  $.fn.visible = function () {
    return this.each(function () {
      $(this).css("visibility", "visible");
    });
  };


}(jQuery));
$(document).ready(function () {
  // sets recipe div to invisible till search is clicked
  $("#cardEl").invisible();
  $("#img").invisible();
});
// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  event.preventDefault();
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
$("#modal-submit").on('click', function (event) {
  event.preventDefault();
});


$("#searchBtn").on('click', function (event) {
  event.preventDefault();
  searchFood();
  $('.jumbotron').slideUp(1000);
  $('#newSearch').show();
  // visible recipe info after 'click'
  $("#cardEl").visible();
  $("#img").visible();
  // creates the 'more details' link for recipe info
});

$('#newSearch').click(function() {
  
  $('.jumbotron').slideDown(1000);
    $('#newSearch').hide();
  
});
