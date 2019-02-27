// Initial array of Christmas items
var topics = ["Santa", "Christmas Presents", "Reindeer", "Christmas Cookies", "Elves", "Christmas Lights", "Snowman"];

// Calling the showButtons function to display the intial buttons
showButtons();

// Function displays the topics data
function showButtons() {

  // Delete the topics prior to adding new topics (to prevent repeat buttons)
  $("#buttons-appear-here").empty();

  // Loop through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Generate buttons for each topic in the array
    var a = $("<button>");

    // Add a class of "christmas-button" to each button
    a.addClass("christmas-button btn btn-lg btn-danger");

    // Add a data-attribute
    a.attr("data-name", topics[i]);

    // Provide the initial button text
    a.text(topics[i]);

    // Add the buttons to the HTML
    $("#buttons-appear-here").append(a);
  }
}

// This function handles events when the submit button is clicked
$("#add-christmas-button").on("click", function (event) {

  // Prevents the submit button's default behavior (submitting the form) when clicked 
  event.preventDefault();

  // Grab the input from the text field
  var christmasButton = $("#christmas-button-input").val().trim();

  // Add the topic from the text field into the array
  topics.push(christmasButton);

  // Call the renderButtons to process the topics array
  showButtons();

  // Clear out the input text
  document.getElementById("christmas-button-input").value = "";
  
});

// Function for displaying the christmas-gifs
// Add event listener to the document to work for dynamically generated elements
// $(".christmas-gif").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".christmas-button", function () {

  clear();

  // store text from the button that the user clicked, to be added to the query url
  var christmasItem = $(this).attr("data-name");

  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + christmasItem + "&api_key=pVBUBONK5rWAANGAtcu0lsUkwck5Wniv&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Console log to see what the response object looks like.
    console.log(response);

    // Make a variable named results and set it equal to response.data
    var results = response.data;

    // Create a for loop to cycle through the results.
    for (var i = 0; i < results.length; i++) {

      // Make a div with jQuery and store it in a variable. 
      // Add classses so the info in the div can be displayed.
      var topicDiv = $("<div>").addClass("card p-3");

      // Make a paragraph tag with jQuery and store it in a variable named p.
      // This will be what displays the gifs rating
      // Set the inner text of the paragraph to the rating of the image in results[i].
      var p = $("<p>").text("This gif is rated: " + results[i].rating);

      // Make an image tag with jQuery and store it in a variable named topicImage.
      // Add the classes of "card" and "christmas-gif" so it can be added to the div above.
      var topicImage = $("<img>").addClass("card christmas-gif");

      // Create the still / animate attributes that will be use to pause / activate the gifs
      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("data-state", "still");
      topicImage.attr("data-animate", ("src", results[i].images.fixed_height.url));
      
      // Append the variables to the topiclDiv variable.
      topicDiv.append(p)
      topicDiv.append(topicImage);

      // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
      $("#gifs-appear-here").prepend(topicDiv);
    }

    // Activating and pausing the gifs
    $(".christmas-gif").on("click", function () {

    var state = $(this).attr("data-state");

    // Set the image's data-state to animate
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    
    else {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    
    });

    // ============================================================

    // Adding a gif to "favorites"

    // This will be for moving a gif to a "favorites" section
    // var fav = $("<a href='#'>").text("Add to favorites");

    // .append(fav)

    // Add the card-link class to fav so it can be displayed.
    // $(fav).addClass("card-link");

    // $("#favs-appear-here").prepend(link);

    // ============================================================

  });

  // Function to empty out the gifs to make room for the new ones.
  function clear() {
    $("#gifs-appear-here").empty();
  }

});

