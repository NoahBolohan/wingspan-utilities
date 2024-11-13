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

// Check base-game checkbox on startup
$(document).ready(
    function() {

        $("#col_base_game_checkbox").prop(
            "checked",
            true
        );

        update_round_end_goals();
        generate_round_end_goal_buttons_for_expansions(
            $("#row_checkbox_expansions").data("expansions_to_include")
        );
    }
)

// Check if start game button should be enabled
function start_game_enabler() {
    var idx_to_check = [
        "#col_difficulty_radio",
        "#button_round_1_end_goal",
        "#button_round_2_end_goal",
        "#button_round_3_end_goal",
        "#button_round_4_end_goal"
    ]
    
    var enable_button_checker = 1;

    for (var i=0; i < idx_to_check.length; i++) {
        enable_button_checker *= $(idx_to_check[i]).data(
            "enable_start_game"
        );
    }

    if (enable_button_checker == 1) {
        $("#button_start_game").prop(
            "disabled",
            false
        );
    }
    else {
        $("#button_start_game").prop(
            "disabled",
            true
        );
    }
}

// Set difficulty
$(document).ready(
    function() {

        $("#col_difficulty_radio").on(
            "change",
            function() {

                $("#col_difficulty_radio").data(
                    "enable_start_game",
                    1
                );

                switch($("input[name='difficulty']:checked").val()) {

                    case "eaglet":
                        $("#col_difficulty_radio").data(
                            "points_per_drawn_card",
                            3
                        );
                        break;
                    case "eagle":
                        $("#col_difficulty_radio").data(
                            "points_per_drawn_card",
                            4
                        );
                        break;
                    case "eagle-eyed_eagle":
                        $("#col_difficulty_radio").data(
                            "points_per_drawn_card",
                            5
                        );
                        break;
                }

                start_game_enabler();
            }
        )
    }
)

// Update round end goal images
function update_round_end_goal_image(round_number,round_end_goal,round_end_goal_base_values) {

    // Assign round end goal to the round end image data
    $(`#img_round_${round_number}_end_goal`).data(
        "round_end_goal",
        round_end_goal
    );

    // Assign round end automa base values to the round end column
    $(`#col_round_${round_number}_end_cube_count`).data(
        "base_values",
        round_end_goal_base_values
    );

    // Store that round end goal is chosen
    $(`#button_round_${round_number}_end_goal`).data(
        "enable_start_game",
        1
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

    // Check whether to enable start game button
    start_game_enabler();
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

        custom_show(
            "#row_automa_action_button"
        );
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

// Update automa played birds counter
function update_automa_played_birds(bird_points) {

    if (bird_points >= 0) {
        $("#col_automa_played_birds").data(
            "counter",
            $("#col_automa_played_birds").data(
                "counter"
            ) + bird_points
        );
    
        $("#col_automa_played_birds").empty();
        $("#col_automa_played_birds").text(
            $("#col_automa_played_birds").data(
                "counter"
            )
        );
    }
    else {
        update_automa_drawn_cards();
    }

    update_automa_total_score();
    
}

// Reset automa played birds counter
function reset_automa_played_birds() {

    $("#col_automa_played_birds").data(
        "counter",
        0
    );

    $("#col_automa_played_birds").empty();
    $("#col_automa_played_birds").text(
        $("#col_automa_played_birds").data(
            "counter"
        )
    );
}

// Update automa drawn cards counter
function update_automa_drawn_cards() {

    $("#col_automa_drawn_birds_count").data(
        "counter",
        $("#col_automa_drawn_birds_count").data(
            "counter"
        ) + 1
    );

    $("#col_automa_drawn_birds_count").empty();
    $("#col_automa_drawn_birds_count").text(
        $("#col_automa_drawn_birds_count").data(
            "counter"
        )
    );

    update_automa_total_score();
}

// Reset automa drawn cards counter
function reset_automa_drawn_cards() {

    $("#col_automa_drawn_birds_count").data(
        "counter",
        0
    );

    $("#col_automa_drawn_birds_count").empty();
    $("#col_automa_drawn_birds_count").text(
        $("#col_automa_drawn_birds_count").data(
            "counter"
        )
    );
}

// Update automa laid eggs counter
function update_automa_laid_eggs(n_eggs) {

    $("#col_automa_eggs_count").data(
        "counter",
        $("#col_automa_eggs_count").data(
            "counter"
        ) + n_eggs
    );

    $("#col_automa_eggs_count").empty();
    $("#col_automa_eggs_count").text(
        $("#col_automa_eggs_count").data(
            "counter"
        )
    );

    update_automa_total_score();
}

// Reset automa laid eggs counter
function reset_automa_laid_eggs(n_eggs) {

    $("#col_automa_eggs_count").data(
        "counter",
        0
    );

    $("#col_automa_eggs_count").empty();
    $("#col_automa_eggs_count").text(
        $("#col_automa_eggs_count").data(
            "counter"
        )
    );
}

// Update automa total score counter
function update_automa_total_score() {

    $("#col_automa_total_score").data(
        "counter",
        $("#col_automa_played_birds").data(
            "counter"
        ) + $("#col_difficulty_radio").data(
            "points_per_drawn_card"
        ) * $("#col_automa_drawn_birds_count").data(
            "counter"
        ) + $("#col_automa_eggs_count").data(
            "counter"
        )
    );

    $("#col_automa_total_score").empty();
    $("#col_automa_total_score").text(
        $("#col_automa_total_score").data(
            "counter"
        )
    );
}

// Reset automa total score counter
function reset_automa_total_score() {

    $("#col_automa_total_score").data(
        "counter",
        0
    );

    $("#col_automa_total_score").empty();
    $("#col_automa_total_score").text(
        $("#col_automa_total_score").data(
            "counter"
        )
    );
}

// Drawn card button
$(document).ready(
    function() {
        $("#col_button_draw_card").on(
            "click",
            function() {
                update_automa_played_birds(-1);
                $(`#modal_play_a_card`).modal("hide");
            }
        )

        $.each(
            [...Array(10).keys()],
            function(key,value) {
                $(`#col_button_play_card_${value}_points`).on(
                    "click",
                    function() {
                        update_automa_played_birds(value);
                        $(`#modal_play_a_card`).modal("hide");
                    }
                )
            }
        )
    }
)

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
            $(`#modal_play_a_card`).modal("show");
            break;

        case "draw_cards":
            primary_action_text = "Draw cards";
            primary_action_class = "table-info";
            update_automa_drawn_cards();
            break;

        case "lay_eggs":
            // primary_action_text = "<img style = 'width:33%' class='img-fluid' src='https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/misc_images/egg.jpg'/>";
            primary_action_text = `Lay ${automa_action["round_1"]["number_of_eggs"]} egg(s)`;
            primary_action_class = "table-warning";
            update_automa_laid_eggs(automa_action["round_1"]["number_of_eggs"])
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

                $("#modal_end_of_round").modal("show");
            }
        )
    }
)

function end_round_cleanup(who_won) {
    // Reset current round counter
    $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).empty();

    if (who_won == "me") {
        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).text(
            "I won"
        )
    }
    else if (who_won == "automa") {
        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).text(
            "Automa won"
        )
    }
    else if (who_won == "we_tied") {
        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).text(
            "We tied"
        )
    }

    // Empty automa actions tables
    $("#table_automa_actions tbody").empty();

    // Show and hide buttons
    custom_hide(
        "#row_end_round_button"
    );

    // Setup for new round
    new_round($("#row_round_info").data("round") + 1);
}

// Set an event listener for performing I won action by clicking the I won button
$(document).ready(
    function() {
        $("#button_i_won").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("me"); 
            }
        )
    }
)

// Set an event listener for performing automa won action by clicking the automa won button
$(document).ready(
    function() {
        $("#button_automa_won").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("automa"); 
            }
        )
    }
)

// Set an event listener for performing we tied action by clicking the we tied button
$(document).ready(
    function() {
        $("#button_we_tied").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("we_tied"); 
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
function generate_round_end_goal_button_for_round(round_number, round_end_goal, expansion) {

    var new_url = encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/round_end_goals/${round_end_goal}.jpg`);

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

            $.getJSON(`https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_scoring/${expansion}.json`, function(data) {

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
function generate_round_end_goal_buttons_for_expansions(expansions_to_include) {

    for (var round_number=1; round_number<=4; round_number++) {
        $(`#row_modal_round_${round_number}_end_buttons`).empty();
    }

    $.each(
        expansions_to_include,
        function(idx,expansion) {
            $.getJSON(`https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_goals/${expansion}.json`, function(data) {

                Object.keys(data).forEach(
                    function (key) {
                        for (var round_number=1; round_number<=4; round_number++) {

                            generate_round_end_goal_button_for_round(
                                round_number,
                                data[key]["side_1"],
                                expansion
                            );

                            generate_round_end_goal_button_for_round(
                                round_number,
                                data[key]["side_2"],
                                expansion
                            );
                        }
                    }
                );
            })
        }
    )
}

// Update round-end goals from appropriate expansions
function update_round_end_goals() {
    var expansions_to_include = [];
    
    if ($("#col_base_game_checkbox").is(':checked')) {
        expansions_to_include.push("base");
    }

    if ($("#col_european_expansion_checkbox").is(':checked')) {
        expansions_to_include.push("european_expansion");
    }

    if ($("#col_oceania_expansion_checkbox").is(':checked')) {
        expansions_to_include.push("oceania_expansion");
    }

    if ($("#col_asia_checkbox").is(':checked')) {
        expansions_to_include.push("asia");
    }

    $("#row_checkbox_expansions").data(
        "expansions_to_include",
        expansions_to_include
    )
}

// Define expansion checkbox behaviour
$(document).ready(
    function() {

        $("#col_base_game_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#row_checkbox_expansions").data("expansions_to_include")
                );
            }
           
        );

        $("#col_european_expansion_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#row_checkbox_expansions").data("expansions_to_include")
                );
            }
        );

        $("#col_oceania_expansion_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#row_checkbox_expansions").data("expansions_to_include")
                );
            }
        );

        $("#col_asia_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#row_checkbox_expansions").data("expansions_to_include")
                );
            }
        );
        
    }
)

// Set an event listener for ending the game by clicking the end game button
$(document).ready(
    function() {
        $("#button_end_game").on(
            "click",
            function() {

                // Reset some data
                for (var round_number = 1; round_number <= 4; round_number++) {

                    $(`#button_round_${round_number}_end_goal`).data(
                        "enable_start_game",
                        0
                    )

                    $(`#button_round_${round_number}_end_goal`).empty();

                    $(`#button_round_${round_number}_end_goal`).text(
                        `Add round ${round_number} end goal`
                    )
                }

                reset_automa_played_birds();
                reset_automa_drawn_cards();
                reset_automa_laid_eggs();
                reset_automa_total_score();

                $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).empty();

                $("#table_automa_actions tbody").empty();
                
                $("#radio_difficulty_choice_eaglet").prop('checked', false);
                $("#radio_difficulty_choice_eagle").prop('checked', false);
                $("#radio_difficulty_choice_eagle-eyed_eagle").prop('checked', false);

                $("#col_difficulty_radio" ).data(
                    "enable_start_game",
                    0
                )

                start_game_enabler();

                // Show and hide buttons
                custom_show(
                    "#container_game_setup"
                );
                custom_hide(
                    "#container_automa_gameplay"
                );
                custom_hide(
                    "#button_end_game"
                );

                // Reset current round counter
                $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).empty();

                // Empty automa actions tables
                $("#table_automa_actions tbody").empty();

                // Show and hide buttons
                custom_hide(
                    "#row_end_round_button"
                );
            }
        )
    }
)