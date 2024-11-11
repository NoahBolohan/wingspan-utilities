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

function update_round_end_goal_image(round_number,round_end_goal) {

    // Assign round end goal to the round end image data
    $(`#img_round_${round_number}_end_goal`).data(
        "round_end_goal",
        round_end_goal
    );

    // Assign the round end goal image
    var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/" + round_end_goal + ".jpg");

    $(`#img_round_${round_number}_end_goal`).attr(
        "src",
        new_url
    );

    $(`#button_round_${round_number}_end_goal`).attr(
        "style",
        `background-image : url(${new_url});`
    );

}

// Appropriate changes for new round
function new_round(round_number) {

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/config.json", function(data) { 

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

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/automa_actions/base.json", function(data) {

        var automa_deck = [];

        Object.keys(data).forEach(
            function(key) {
                switch (key) {

                    case "automubon_society":
                        if ($("#col_automubon_society_checkbox").val() == "yes") {
                            automa_deck.push(data[key]);
                        }
                        break;

                    case "round_1":
                        if (1 >= round_number) {
                            automa_deck.push(data[key]);
                        }
                        break;

                    case "round_2":
                        if (2 >= round_number) {
                            automa_deck.push(data[key]);
                        }
                        break;

                    case "round_3":
                        if (3 >= round_number) {
                            automa_deck.push(data[key]);
                        }
                        break;
                    
                    default:
                        automa_deck.push(data[key]);
                }
            }
        )

        $("#table_automa_actions").data(
            "automa_deck",
            shuffle(automa_deck)
        )
    })
}

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
        <th scope="row">${$("#table_automa_actions tr").length}</th>\
        <td>${automa_action["round_1"]["primary_action"]}</td>\
        <td>${automa_action["round_1"]["secondary_action"]}</td>\
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
                $("#table_automa_actions tbody").empty();

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

                // Setup for first round
                new_round(1);

                // Show and hide buttons
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

function generate_round_end_goal_buttons_for_round(round_number, round_end_goals) {

    $(document).ready(
        function() {
            $.each(
                round_end_goals,
                function(index, round_end_goal) {

                    var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/" + round_end_goal + ".jpg");

                    $("<button>").attr(
                        {
                            class : "col-3 btn btn-xs round_end_button",
                            id : `button_round_${round_number}_${round_end_goal}`,
                            type : "button",
                            style : `background-image : url(${new_url})`
                        }
                    ).appendTo(
                        `#row_modal_round_${round_number}_end_buttons`
                    );

                    $(`#button_round_${round_number}_${round_end_goal}`).on(
                        "click",
                        function() {
            
                            update_round_end_goal_image(
                                round_number,
                                round_end_goal
                            );
            
                            $(`#modal_round_${round_number}_end_goal_images`).modal("hide");
                        }
                    );
                }
            );
        }
    );
}

$(document).ready(
    function() {
        $(`#button_round_1_end_goal`).on(
            "click",
            function() {
                $(`#modal_round_1_end_goal_images`).modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $(`#button_round_2_end_goal`).on(
            "click",
            function() {
                $(`#modal_round_2_end_goal_images`).modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $(`#button_round_3_end_goal`).on(
            "click",
            function() {
                $(`#modal_round_3_end_goal_images`).modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $(`#button_round_4_end_goal`).on(
            "click",
            function() {
                $(`#modal_round_4_end_goal_images`).modal("show");
            }
        )
    }
)

// Generate round end goal choice buttons options
$(document).ready(
    function() {

        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_goals/base.json", function(data) {

            var round_end_goals = [];
    
                Object.keys(data).forEach(
                    function (key) {
                        round_end_goals.push(data[key]["side_1"]);
                        round_end_goals.push(data[key]["side_2"]);
                    }
                );

            for (var round_number=1; round_number<=4; round_number++) {
                generate_round_end_goal_buttons_for_round(round_number, round_end_goals);
            }
        })
        
    }
)

// // Set an event listener for resetting the  element data counters when the reset button is pressed
// $(document).ready(
//     function() {
//         $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_goals/base.json", function(data) {

//             var round_end_goals = [];

//             Object.keys(data).forEach(
//                 function (key) {
//                     round_end_goals.push(data[key]["side_1"]);
//                     round_end_goals.push(data[key]["side_2"]);
//                 }
//             );

//             $.each(
//                 round_end_goals,
//                 function(index, round_end_goal) {

//                     var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/" + round_end_goal + ".jpg");

//                     $("<button>").attr(
//                         {
//                             class : "col-3 btn btn-xs round_end_button",
//                             id : `button_round_1_${round_end_goal}`,
//                             type : "button",
//                             style : `background-image : url(${new_url})`
//                         }
//                     ).appendTo(
//                         "#row_modal_round_1_end_buttons"
//                     );

//                     $(`#button_round_1_${round_end_goal}`).on(
//                         "click",
//                         function() {
            
//                             update_round_end_goal_image(
//                                 1,
//                                 round_end_goal
//                             );
            
//                             $("#model_round_end_goal_images").modal("hide");
//                         }
//                     );
//                 }
//             );
//         });
//     }
// );