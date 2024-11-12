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

function update_round_end_goal_image(round_number,round_end_goal,round_end_goal_base_values) {

    // Assign round end goal to the round end image data
    $(`#img_round_${round_number}_end_goal`).data(
        "round_end_goal",
        round_end_goal
    );

    // Assign round end goal to the round end image data
    $(`#col_round_${round_number}_end_cube_count`).data(
        "base_values",
        round_end_goal_base_values
    );

    // Assign the round end goal image to the button as well as the automa gameplay page
    var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/" + round_end_goal + ".jpg");

    $(`#img_round_${round_number}_end_goal`).attr(
        "src",
        new_url
    );

    $(`#button_round_${round_number}_end_goal`).empty();

    $("<img>").attr(
        {
            "src" : new_url,
            "class" : "col-3 p-0",
            "style" : "width : 100%"
        }
    ).appendTo(
        `#button_round_${round_number}_end_goal`
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

        update_round_end_cube_counter(round_number,0)

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

    var n_cubes = $(`#col_round_${round_number}_end_cube_count`).data("counter");
    var base_value = $(`#col_round_${round_number}_end_cube_count`).data("base_values")[round_number - 1]

    $(`#col_round_${round_number}_end_cube_count`).text(
        `${n_cubes + base_value} (${base_value}+${n_cubes})`
    )
}

function generate_food_order_string(food_order) {

    var food_order_string = "";

    for (var i = 0; i < food_order.length; i++) {

        switch(food_order[i]) {
            case "invertebrate_or_seed":
                food_order_string += "Invertebrate or Seed";
                break;
            case "invertebrate":
                food_order_string += "Invertebrate";
                break;
            case "seed":
                food_order_string += "Seed";
                break;
            case "rodent":
                food_order_string += "Rodent";
                break;
            case "fish":
                food_order_string += "Fish";
                break;
            case "fruit":
                food_order_string += "Fruit";
                break;
        }

        if (i < food_order.length - 1) {
            food_order_string += " > ";
        }
    }

    return food_order_string;
}

// Append a new row to the automa table
function append_automa_action_row(automa_action) {

    // Increment turn counter
    $("#row_round_info").data(
        "turn",
        $("#row_round_info").data(
            "turn"
        ) + 1
    )

    // Initialize row
    var tr = $("<tr>");

    // Append turn number to row
    $("<th>").attr(
        {
            scope : "row",
            style : "width: 10%"
        }
    ).text(
        $("#row_round_info").data(
            "turn"
        )
    ).appendTo(
        tr
    );

    // Append primary automa action to row: options are play_a_bird, draw_cards, lay_eggs, gain_food
    var primary_action_text;
    var primary_action_class;

    switch(automa_action["round_1"]["primary_action"]) {

        case "play_a_bird":
            primary_action_text = "Play a card";
            primary_action_class = "table-light";
            break;

        case "draw_cards":
            primary_action_text = "Draw cards";
            primary_action_class = "table-info";
            break;

        case "lay_eggs":
            // primary_action_text = "<img style = 'width:33%' class='img-fluid' src='https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/misc_images/egg.jpg'/>";
            primary_action_text = `Lay ${automa_action["round_1"]["number_of_eggs"]} egg(s)`;
            primary_action_class = "table-warning";
            break;

        case "gain_food":
            primary_action_text = "Gain food: " + generate_food_order_string(automa_action["round_1"]["food_order"]);
            primary_action_class = "table-success";
            break;
    }

    $("<td>").attr(
        {
            class : primary_action_class,
            style : "width: 45%"
        }
    ).text(
        primary_action_text
    ).appendTo(
        tr
    );

    // Append secondary automa action to row: options are place_end-of-round_cube, remove_end-of-round_cube, activate_pink_powers, none
    var secondary_action_text;
    var secondary_action_class;

    switch(automa_action["round_1"]["secondary_action"]) {

        case "place_end-of-round_cube":
            secondary_action_text = "Place end-of-round cube";
            secondary_action_class = "table-primary";
            break;

        case "remove_end-of-round_cube":
            secondary_action_text = "Remove end-of-round cube";
            secondary_action_class = "table-primary";
            break;

        case "activate_pink_powers":
            secondary_action_text = `Activate pink powers`
            secondary_action_class = "table-danger";
            break;

        case "none":
            secondary_action_text = "";
            secondary_action_class = "table-dark";
            break;
    }

    $("<td>").attr(
        {
            class : secondary_action_class,
            style : "width: 45%"
        }
    ).text(
        secondary_action_text
    ).appendTo(
        tr
    );

    // Append row(s) to table
    $("#table_automa_actions tbody").append(tr);

    // if (automa_action["round_1"]["primary_action"] == "gain_food") {
    //     $("#table_automa_actions tbody").append(
    //         generate_food_row(
    //             automa_action["round_1"]["food_order"]
    //         )
    //     );
    // }

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
                $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).empty();

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

// Generate round end choice buttons for each appropriate round end goal
function generate_round_end_goal_buttons_for_round(round_number, round_end_goals) {

    $(document).ready(
        function() {
            $.each(
                round_end_goals,
                function(index, round_end_goal) {

                    var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/" + round_end_goal + ".jpg");

                    var button = $("<button>").attr(
                        {
                            class : "col-3 btn btn-xs round_end_button",
                            id : `button_round_${round_number}_${round_end_goal}`,
                            type : "button"
                        }
                    )

                    $("<img>").attr(
                        {
                            "src" : new_url,
                            "class" : "col-3 p-0",
                            "style" : "width : 100%"
                        }
                    ).appendTo(
                        button
                    );
                    
                    button.appendTo(
                        `#row_modal_round_${round_number}_end_buttons`
                    );

                    $(`#button_round_${round_number}_${round_end_goal}`).on(
                        "click",
                        function() {

                            $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_scoring/base.json", function(data) {

                                update_round_end_goal_image(
                                    round_number,
                                    round_end_goal,
                                    data[round_end_goal]
                                );
                            })

                            $(`#modal_round_${round_number}_end_goal_images`).modal("hide");
                        }
                    );
                }
            );
        }
    );
}

// Set an event listener for opening the round end modals by clicking the round end goal buttons
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