// Shuffle array (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

// Custom show div
function custom_show(div_id) {
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
function custom_hide(div_id) {
    $(div_id).css(
        "visibility",
        "hidden"
    );
    $(div_id).css(
        "max-height",
        "0"
    );
}

// Appropriate changes for new round
function new_round(round_number) {

    $.getJSON('https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/config.json', function(data) { 

        // Setup round number and length, reset turn counter
        $("#row_round_info").data(
            "round",
            round_number
        );

        $("#row_round_info").data(
            "round_length",
            data["round_lengths"][round_number + ""]
        );

        $("#row_round_info").data(
            "turn",
            0
        );

        // Create automa deck for round
        create_automa_deck(
            $("#row_round_info").data(
                "round"
            )
        )

    })
}

// Create the automa deck for the round
function create_automa_deck(round_number) {

    $.getJSON('https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/automa_actions/base.json', function(data) {

        var automa_deck = {};

        Object.keys(data).forEach(
            function(key) {
                if (key == "automubon_society" & $("#col_automubon_society_checkbox").value == "yes") {
                    automa_deck["automubon_society"] = data[key]
                }
                else if (key == "round_1" & 1 >= round_number ) {
                    automa_deck["round_1"] = data[key]
                }
                else if (key == "round_2" & 2 >= round_number ) {
                    automa_deck["round_2"] = data[key]
                }
                else if (key == "round_3" & 3 >= round_number ) {
                    automa_deck["round_3"] = data[key]
                }
                else {
                    automa_deck[key] = data[key]
                }
            }
        )

        $("#table_automa_actions").data(
            "automa_deck",
            Object.values(automa_deck)
        )
    })
}

// Setup on startup
$(document).ready(
    new_round(1)
)

// Increment a round counter
function update_round_end_cube_counter(round_number,cube_increment) {
    
    $(`#col_round_${round_number}_end_cube_count`).data(
        "counter",
        Math.max(
            0,
            $(`#col_round_${round_number}_end_cube_count`).data(
                "counter"
            ) + cube_increment
        )
    );

    $(`#col_round_${round_number}_end_cube_count`).text(
        $(`#col_round_${round_number}_end_cube_count`).data("counter")
    )
}

function append_automa_action_row(automa_action) {

    var tr = `<tr>\
        <th scope='row'>${$('#table_automa_actions tr').length}</th>\
        <td>${automa_action['round_1']['primary_action']}</td>\
        <td>${automa_action['round_1']['secondary_action']}</td>\
    </tr>;`;

    $("#table_automa_actions tbody").append(tr);

    // Update end-of-round cubes if necessary
    if (automa_action["round_1"]["secondary_action"] == "place_end-of-round_cube") {

        update_round_end_cube_counter(
            $("#row_round_info").data("round"),
            1
        );
    }
    else if (automa_action["round_1"]["secondary_action"] == "remove_end-of-round_cube") {

        update_round_end_cube_counter(
            $("#row_round_info").data("round"),
            -1
        );
    }

    // Increment turn counter
    $("#row_round_info").data(
        "turn",
        $("#row_round_info").data(
            "turn"
        ) + 1
    )
}

// Set an event listener for performing a new automa action by clicking the automa action button
$(document).ready(
    function() {
        $("#button_automa_action").on(
            "click",
            function() {

                if ($("#row_round_info").data("turn") <= $("#row_round_info").data("round_length") - 2) {

                    // Append new automa action to table
                    append_automa_action_row(
                        $("#table_automa_actions").data(
                            "automa_deck"
                        )[$("#row_round_info").data("turn")]
                    );
                }
                else {
                    // Append new automa action to table
                    append_automa_action_row(
                        $("#table_automa_actions").data(
                            "automa_deck"
                        )[$("#row_round_info").data("turn")]
                    );

                    // Show and hide buttons
                    custom_hide(
                        "#row_automa_action_button"
                    );

                    if ($("#row_round_info").data("round") < 4) {

                        custom_show(
                            "#row_end_round_button"
                        );
                    }
                    else {

                        custom_show(
                            "#row_end_game_button"
                        );
                    }
                    
                }
                
            }
        )
    }
)

// Set an event listener for performing end round cleanup by clicking the end round button
$(document).ready(
    function() {
        $("#button_end_round").on(
            "click",
            function() {

                // Reset current round counter
                update_round_end_cube_counter(
                    $("#row_round_info").data("round"),
                    -99
                );

                // Empty automa actions tables
                $('#table_automa_actions tbody').empty();

                // Show and hide buttons
                custom_hide(
                    "#row_end_round_button"
                );
                custom_show(
                    "#row_automa_action_button"
                );

                // Setup for new round
                new_round($("#row_round_info").data("round") + 1);
            }
        )
    }
)

// Set an event listener for starting the game by clicking the start game button
$(document).ready(
    function() {
        $("#button_start_game").on(
            "click",
            function() {

                custom_hide(
                    "#container_game_setup"
                );
                custom_show(
                    "#container_automa_gameplay"
                );
            }
        )
    }
)