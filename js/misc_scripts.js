// Shuffle array (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffle(array) {
    var current_index = array.length;
  
    // While there remain elements to shuffle...
    while (current_index != 0) {
  
      // Pick a remaining element...
      let random_index = Math.floor(Math.random() * current_index);
      current_index--;
  
      // And swap it with the current element.
      [array[current_index], array[random_index]] = [
        array[random_index], array[current_index]];
    }

    return array;
}

// Custom show div
function custom_show_div(div_id) {
    $(div_id).css(
        "visibility",
        "visible"
    );
    $(div_id).css(
        "max-height",
        "100%"
    );
}

// Custom hide div
function custom_hide_div(div_id) {
    $(div_id).css(
        "visibility",
        "hidden"
    );
    $(div_id).css(
        "max-height",
        "0"
    );
}

// Custom show bootstrap column
function custom_show_column(column_id) {
    $(column_id).css(
        "visibility",
        "visible"
    );
    $(column_id).css(
        "display",
        "block"
    );
}

// Custom hide bootstrap column
function custom_hide_column(column_id) {
    $(column_id).css(
        "visibility",
        "hidden"
    );
    $(column_id).css(
        "display",
        "none"
    );
}

// Apply faded / grey colour to text
function enable_text(selector) {
    $(selector).removeClass("disabled-text");
    $(selector).addClass("enabled-text");
}

// Restore black text colour
function disable_text(selector) {
    $(selector).removeClass("enabled-text");
    $(selector).addClass("disabled-text");
}

// Assign a random background on load
$(document).ready(

    function () {

        $.getJSON(
            "https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/backgrounds/backgrounds.json",
            function(data) {

                $("body").css(
                    "background-image",
                    `url(https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/backgrounds/${
                        data["backgrounds"][Math.floor(Math.random() * data["backgrounds"].length)]
                    })`
                );
            }
        )
    }
)