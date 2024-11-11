// Choose random entry from dictionary
function random_entry_from_dict(object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};

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

        $("#row_round_info").data(
            "round",
            round_number
        );
    
        $("#row_round_info").data(
            "round_length",
            data["round_lengths"][round_number + ""]
        );
    })
}

function create_automa_deck(include_automubon_society) {
    
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
}

// Set an event listener for performing a new automa action by clicking the automa action button
$(document).ready(
    function() {
        $("#button_automa_action").on(
            "click",
            function() {

                $.getJSON('https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/automa_actions/base.json', function(data) {

                    if ($("#table_automa_actions tr").length <= $("#row_round_info").data("round_length") - 1) {

                        // Get new row to append to table
                        var automa_action = random_entry_from_dict(data);

                        append_automa_action_row(automa_action);
                    }
                    else {
                        // Get new row to append to table
                        var automa_action = random_entry_from_dict(data);

                        append_automa_action_row(automa_action);

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
                })
                
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