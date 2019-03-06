var tvShows = ["Spongebob", "Dragonball Z", "Pokemon"];

function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9RiK7hcLpu9hEc2gAW5zGSOxfcx3DKDS&q=" + gif + "&limit=12&offset=0&rating=PG-13&lang=en";

    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response);
        $("#tvView").empty();
        for (var i = 0; i < response.data.length; i++) {
            var rating = response.data[i].rating;
            var imageURL = response.data[i].images.fixed_height.url;
            var stillURL = response.data[i].images.fixed_height_still.url;

            var image = $("<img id='imgif'>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            image.attr("src", stillURL);
            image.attr("alt", "gif");
            image.attr("data-state", "still");
            image.attr("data-still", stillURL);
            image.attr("data-animate", imageURL);

            $("#tvView").prepend(image, ratingText);
            checkState();
        }
    });
};

function renderButtons() {
    $("#button-area").empty();

    for (var i = 0; i < tvShows.length; i++) {
        var newButton = $("<button class='btn btn-success'>");
        newButton.addClass("show");
        newButton.attr("data-name", tvShows[i]);
        newButton.text(tvShows[i]);
        $("#button-area").append(newButton);
    }
};

$("#add-show").on("click", function () {
    var show = $("#tv-input").val().trim();

    if (show === "") {
        alert("Please enter a valid TV show.");
    }
    else {
        tvShows.push(show);
        renderButtons();
        return false;
    }
});

$(document).on("click", ".show", displayGif);

renderButtons();

function checkState() {
    $("#imgif").on("click", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
    });
};