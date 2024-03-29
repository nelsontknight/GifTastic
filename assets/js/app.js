var topics = ["The Simpsons", "Dexter's Laboratory", "Futurama", "Batman: The Animated Series", "Doug", "The Ren & Stimpy Show", "Beavis and Butt-Head", "Teenage Mutant Ninja Turtles Cartoon", "King of the Hill", "X-Men: The Animated Series"];

function displayCartoonGif() {
    var cartoon = $(this).attr("data-cartoon");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=0QQoyLgizJlPEqMrOEud4jT5wEzoiLKY&limit=10"

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i <= results.length; i++) {

            var gifDiv = $("<div>").attr("class", "gifDiv float-md-left");
            console.log("In Here");
            var gifImage = $("<img>");
            gifImage.attr("class", "img-fluid gif");
            
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");

            var ratingP = $("<p>").text(" rating: " + results[i].rating).attr("class", "rating");

            gifDiv.append(gifImage);
            gifDiv.append(ratingP);

            $(".gif-container").prepend(gifDiv);
        }
        
       
    });

}


$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

function renderButtons() {

    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var gifButton = $("<button>");
        gifButton.attr("type", "button").attr("class", "btn btn-dark cartoon").text(topics[i]).attr("data-cartoon", topics[i]).attr("id", "gif-button");
        $("#gif-buttons").append(gifButton);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var cartoon = $("#gif-input").val().trim();
    topics.push(cartoon);
    renderButtons();
});

$(document).on("click", ".cartoon", displayCartoonGif);

renderButtons();