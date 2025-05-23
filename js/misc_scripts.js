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
function show_height_hidden(div_id) {
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
function hide_height_hidden(div_id) {
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
function show_display_hidden(column_id) {
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
function hide_display_hidden(column_id) {
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

function set_row_height(selector, n_rows) {

    if (n_rows > 0) {
        $(selector + " tr").css("height",`${60/n_rows}vh`);
    }
    else {
        $(selector + " tr").css("height","initial");
    }
    
}

$(document).ready(
    function() {

        $(".popup_image").on(
            "click",
            function() {

                $("#h2_header_for_popup_image_modal").text(
                    $(this).attr(
                        "data-header"
                    )
                )

                $("#img_popup_image_for_modal").attr(
                    {
                        src: encodeURI(
                            $(this).attr(
                                "data-URL"
                            )
                        ),
                        style: "width:100%;"
                    }
                )
                
                $("#modal_popup_image").modal("show");
            }
        );
    }
);

$(document).ready(
    function() {

        $("#button_close_modal_popup_image").on(
            "click",
            function() {
                
                $("#modal_popup_image").modal("hide");
            }
        );
    }
);