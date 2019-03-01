// Initial array of Christmas buttons
var topics = ["Santa", "Christmas Presents", "Reindeer", "Christmas Cookies", "Elves", "Christmas Lights", "Snowman"];

// Calling the showButtons function to display the intial buttons
showButtons();

// Function to display the "topics" data (Christmas Buttons)
function showButtons() {

  // Delete the topics prior to adding new topics (to prevent repeat buttons)
  $("#buttons-appear-here").empty();

  // Loop through the array of topics/christmas buttons
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

  // Clear out the text in the input box
  document.getElementById("christmas-button-input").value = "";
  
});

// Function for displaying the christmas-gifs

// Add event listener to the document to work for dynamically generated elements
// $(".christmas-gif").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".christmas-button", function () {

  clear();

  // Grab text from the button that the user clicked,and add that text to the query url
  var christmasItem = $(this).attr("data-name");

  // queryURL is the url we'll use to query the Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + christmasItem + "&api_key=pVBUBONK5rWAANGAtcu0lsUkwck5Wniv&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    // Console log to see what the response object looks like.
    console.log(response);

    // Make a variable named "results" and set it equal to response.data
    var results = response.data;

    // Create a for loop to cycle through the results.
    for (var i = 0; i < results.length; i++) {

      // Make a div with jQuery and store it in a variable. 
      // Add classses so the information in the div can be displayed.
      var topicDiv = $("<div>").addClass("card p-3");

      // Make a paragraph tag with jQuery and store it in a variable named p.
      // Set the text in the paragraph tag to be the rating of the image from results[i].
      var p = $("<p>").text("This gif is rated: " + results[i].rating);

      // Make an image tag with jQuery and store it in a variable named topicImage.
      // Add the classes of "card" and "christmas-gif" so it can be added to the div created above.
      var topicImage = $("<img>").addClass("card christmas-gif");

      // Create the "still" / "animate" attributes that will be use to pause / activate the GIFs
      topicImage.attr({
        "src": results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url,
        "data-state": "still"
      });
  
      // Append the p and topicImage variables to the topiclDiv variable.
      topicDiv.append(p);
      topicDiv.append(topicImage);
      
      // Prepend the topicDiv variable to the element with an id of "gifs-appear-here."
      $("#gifs-appear-here").prepend(topicDiv);
    };

    // Activating and pausing the gifs
    $(document).on("click", ".christmas-gif", function () {

      var state = $(this).attr("data-state");

      // If the image's data-state is still, change it to animate.
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      
      // If the image's data-state is animate, change it to still.
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    
    });

  });

  // Function to empty out the gifs to make room for the new ones.
  function clear() {
    $("#gifs-appear-here").empty();
  }

});

