function generate_egg_td(
    n_eggs
) {

    var egg_cell = $("<td>").attr(
        {
            class : "cell-automa-action",
            style : "text-align: center;"
        }
    )

    for (var i = 0; i < n_eggs; i++) {

        $("<img>").attr(
            {
                "src" : encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/egg.png`),
                "style" : "width : 10%;"
            }
        ).appendTo(
            egg_cell
        );
    }

    return egg_cell;
}

function generate_food_order_td(
    food_order
) {

    var food_order_cell = $("<td>").attr(
        {
            class : "cell-automa-action",
            style : "text-align: center; white-space : nowrap;"
        }
    )

    for (var i = 0; i < food_order.length; i++) {

        $("<img>").attr(
            {
                "src" : encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/master/static/food_icons/${food_order[i]}.svg`),
                "style" : "width : 16.67%; border : 1px solid #000000;"
            }
        ).appendTo(
            food_order_cell
        );
    }

    return food_order_cell;
}

// Update automa played birds counter
function update_automa_played_birds(bird_points) {

    if (bird_points >= 0) {
        $("#automa_tracker_body").data(
            "automa_played_birds_counter",
            $("#automa_tracker_body").data(
                "automa_played_birds_counter"
            ) + bird_points
        );
    
        $("#col_automa_played_birds").empty();
        $("#col_automa_played_birds").text(
            $("#automa_tracker_body").data(
                "automa_played_birds_counter"
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

    $("#automa_tracker_body").data(
        "automa_played_birds_counter",
        0
    );

    $("#col_automa_played_birds").empty();
    $("#col_automa_played_birds").text(
        $("#automa_tracker_body").data(
            "automa_played_birds_counter"
        )
    );
}

// Update automa drawn cards counter
function update_automa_drawn_cards() {

    $("#automa_tracker_body").data(
        "automa_drawn_cards_counter",
        $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        ) + 1
    );

    $("#col_automa_drawn_cards_count").empty();
    $("#col_automa_drawn_cards_count").text(
        $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        )
    );

    update_automa_total_score();
}

// Reset automa drawn cards counter
function reset_automa_drawn_cards() {

    $("#automa_tracker_body").data(
        "automa_drawn_cards_counter",
        0
    );

    $("#col_automa_drawn_cards_count").empty();
    $("#col_automa_drawn_cards_count").text(
        $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        )
    );
}

// Update automa laid eggs counter
function update_automa_laid_eggs(n_eggs) {

    $("#automa_tracker_body").data(
        "automa_eggs_counter",
        $("#automa_tracker_body").data(
            "automa_eggs_counter"
        ) + n_eggs
    );

    $("#col_automa_eggs_count").empty();
    $("#col_automa_eggs_count").text(
        $("#automa_tracker_body").data(
            "automa_eggs_counter"
        )
    );

    update_automa_total_score();
}

// Reset automa laid eggs counter
function reset_automa_laid_eggs(n_eggs) {

    $("#automa_tracker_body").data(
        "automa_eggs_counter",
        0
    );

    $("#col_automa_eggs_count").empty();
    $("#col_automa_eggs_count").text(
        $("#automa_tracker_body").data(
            "automa_eggs_counter"
        )
    );
}

// Update automa total score counter
function update_automa_total_score() {

    $("#automa_tracker_body").data(
        "automa_total_score_counter",
        $("#automa_tracker_body").data(
            "automa_played_birds_counter"
        ) + $("#automa_tracker_body").data(
            "automa_points_per_face_down_bird_card"
        ) * $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        ) + $("#automa_tracker_body").data(
            "automa_eggs_counter"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_1_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_2_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_3_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_4_points"
        )
    );

    if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

        $("#automa_tracker_body").data(
            "automa_total_score_counter",
            $("#automa_tracker_body").data(
                "automa_total_score_counter"
            ) + Math.floor(
                $("#automa_tracker_body").data(
                    "automa_hoard_token_counter"
                ) / parseInt(
                    $("input[name='automa_hoard_tokens_per_egg']:checked").val()
                )
            )
        )
    }

    $("#button_automa_score_breakdown").empty();

    $("#button_automa_score_breakdown").text(
        `Automa score: ${
            $("#automa_tracker_body").data(
                "automa_total_score_counter"
            )
        }`
    );

    $("#col_automa_total_score").empty();

    $("#col_automa_total_score").text(
        $("#automa_tracker_body").data(
            "automa_total_score_counter"
        )
    );
}

// Reset automa total score counter
function reset_automa_total_score() {

    $("#automa_tracker_body").data(
        "automa_total_score_counter",
        0
    );

    $("#col_automa_total_score").empty();
    $("#col_automa_total_score").text(
        $("#automa_tracker_body").data(
            "automa_total_score_counter"
        )
    );
}

// Append a new row to the automa table
function append_automa_action_row(automa_action) {

    // Increment turn counter
    $("#automa_tracker_body").data(
        "current_turn",
        $("#automa_tracker_body").data(
            "current_turn"
        ) + 1
    )

    // Initialize row
    var tr = $("<tr>");

    // Append turn number to row
    $("<th>").attr(
        {
            scope : "row",
            style : "width: 10%",
            class : "cell-info"
        }
    ).text(
        $("#automa_tracker_body").data(
            "current_turn"
        )
    ).appendTo(
        tr
    );

    // Append primary automa action to row: options are play_a_bird, draw_cards, lay_eggs, gain_food
    var primary_action_text;
    var primary_action_class;

    switch(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["primary_action"]) {

        case "play_a_bird":
            primary_action_text = "Play a card";

            // Debug option
            if ($("#col_debug_mode_play_a_bird_checkbox").is(":checked")) {
                update_automa_played_birds(-1);
            }
            else {
                $(`#modal_play_a_card`).modal("show");
            }

            $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "width: 45%"
                }
            ).text(
                primary_action_text
            ).appendTo(
                tr
            );
            break;

        case "draw_cards":
            primary_action_text = "Draw cards";
            update_automa_drawn_cards();

            $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "width: 45%"
                }
            ).text(
                primary_action_text
            ).appendTo(
                tr
            );
            break;

        case "lay_eggs":
            generate_egg_td(
                automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"]
            ).appendTo(
                tr
            );
            update_automa_laid_eggs(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"])
            break;

        case "gain_food":

            generate_food_order_td(
                automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["food_order"]
            ).appendTo(
                tr
            );
            break;
    }

    // Append secondary automa action to row: options are place_end-of-round_cube, remove_end-of-round_cube, activate_pink_powers, none
    var secondary_action_text;
    var secondary_action_class;

    switch(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["secondary_action"]) {

        case "place_end-of-round_cube":
            secondary_action_text = "\u25A8";
            break;

        case "remove_end-of-round_cube":
            secondary_action_text = "\u00D7";
            break;

        case "activate_pink_powers":
            secondary_action_text = `Activate pink powers`
            break;

        case "none":
            secondary_action_text = "";
            break;
    }

    $("<td>").attr(
        {
            class : "cell-automa-action",
            style : "width: 45%; text-align: center"
        }
    ).text(
        secondary_action_text
    ).appendTo(
        tr
    );

    // Append row(s) to table
    $("#table_automa_actions tbody").append(tr);

    // Update end-of-round cubes if necessary
    if (automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["secondary_action"] == "place_end-of-round_cube") {

        update_round_end_cube_counter(
            $("#automa_tracker_body").data("current_round"),
            1
        );
    }
    else if (automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["secondary_action"] == "remove_end-of-round_cube") {

        update_round_end_cube_counter(
            $("#automa_tracker_body").data("current_round"),
            -1
        );
    }
}

// Automa end of round nectar checks
function check_automa_end_of_round_nectar(n_check) {

    var increment_card = $("#automa_tracker_body").data(
        "automa_deck"
    )[
        $("#automa_tracker_body").data(
            `round_${$("#automa_tracker_body").data("current_round")}_length`
        ) + n_check
    ];

    var incrementer = {
        "1" : 0,
        "2" : 0,
        "3" : 0
    }

    $.each(

        ["1","2","3"],
        function (idx, nectar_spot) {

            if (`round_${nectar_spot}` in increment_card) {
                if (increment_card[`round_${nectar_spot}`]["secondary_action"] == "place_end-of-round_cube") {

                    $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`).text("+1");
                    incrementer[nectar_spot] += 1;
                }
                else if (increment_card[`round_${nectar_spot}`]["secondary_action"] == "remove_end-of-round_cube") {
    
                    $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`).text("-1");
                    incrementer[nectar_spot] -= 1;
                } else {
    
                    $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`).text("0");
                }
            }
            else {
                $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`).text("0");
            }
        }
    )

    update_automa_nectar_counts(
        {
            "forest" : incrementer["1"],
            "grassland" : incrementer["2"],
            "wetland" : incrementer["3"]
        },
        "increment"
    )

    $.each(
        ["forest", "grassland", "wetland"],
        function(idx,board_zone) {
            $(`#col_automa_nectar_${board_zone}_count_end_of_round_new`).text(
                $("#automa_tracker_body").data(`automa_nectar_${board_zone}_counter`)
            )
        }
    )

    
}

// Update automa nectar counts
function update_automa_nectar_counts(
    nectar_count_dict,
    update_type
) {
    $.each(
        ["forest", "grassland", "wetland"],
        function(idx,board_zone) {
            if (update_type == "reset") {

                $("#automa_tracker_body").data(
                    `automa_nectar_${board_zone}_counter`,
                    nectar_count_dict[board_zone]
                )

                $("#automa_tracker_data").data(
                    `automa_nectar_${board_zone}_end_of_round_counter`,
                    nectar_count_dict[board_zone]
                )
            }
            else if (update_type == "increment") {
        
                $("#automa_tracker_body").data(
                    `automa_nectar_${board_zone}_counter`,
                    Math.max(
                        $("#automa_tracker_body").data(`automa_nectar_${board_zone}_counter`) + nectar_count_dict[board_zone],
                        0
                    )
                )

                $("#automa_tracker_data").data(
                    `automa_nectar_${board_zone}_end_of_round_counter`,
                    Math.max(
                        $("#automa_tracker_data").data(`automa_nectar_${board_zone}_end_of_round_counter`) + nectar_count_dict[board_zone],
                        0
                    )
                )
            }
        
            $(`#col_automa_nectar_${board_zone}_count`).text(
                $("#automa_tracker_body").data(`automa_nectar_${board_zone}_counter`)
            )
        }
    )
}

function end_round_cleanup(who_won) {
    
    // Reset current round counter
    $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).empty();

    if (who_won == "me") {

        // Update users round end points
        $("#automa_tracker_body").data(
            `user_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            $("#automa_tracker_body").data(
                "round_end_points"
            )[`round_${$("#automa_tracker_body").data("current_round")}`][0]
        )

        var n_cubes = $("#automa_tracker_body").data(
            `round_${$("#automa_tracker_body").data("current_round")}_cube_counter`
        );
        var base_value = $("#automa_tracker_body").data(`automa_round_${$("#automa_tracker_body").data("current_round")}_base_value`)

        // Update automa's round end points (0 if automa didn't score)
        if (n_cubes + base_value > 0) {
            $("#automa_tracker_body").data(
                `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
                $("#automa_tracker_body").data(
                    "round_end_points"
                )[`round_${$("#automa_tracker_body").data("current_round")}`][1]
            )
        }
        else {
            $("#automa_tracker_body").data(
                `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
                0
            )
        }
    }
    else if (who_won == "automa_user_scored") {

        // Update user's round end points
        $("#automa_tracker_body").data(
            `user_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            $("#automa_tracker_body").data(
                "round_end_points"
            )[`round_${$("#automa_tracker_body").data("current_round")}`][1]
        )

        // Update automa's round end points
        $("#automa_tracker_body").data(
            `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            $("#automa_tracker_body").data(
                "round_end_points"
            )[`round_${$("#automa_tracker_body").data("current_round")}`][0]
        )
    }

    else if (who_won == "automa_user_did_not_score") {

        // Update user's round end points
        $("#automa_tracker_body").data(
            `user_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            0
        )

        // Update automa's round end points
        $("#automa_tracker_body").data(
            `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            $("#automa_tracker_body").data(
                "round_end_points"
            )[`round_${$("#automa_tracker_body").data("current_round")}`][0]
        )
    }
    else if (who_won == "we_tied") {

        // Update both's round end points (0 if neither automa nor user scored)
        if (
            $("#automa_tracker_body").data(
                `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
            ) > 0
        ) {
            var points = Math.floor(
                ($("#automa_tracker_body").data(
                    "round_end_points"
                )[`round_${$("#automa_tracker_body").data("current_round")}`][0] + $("#automa_tracker_body").data(
                    "round_end_points"
                )[`round_${$("#automa_tracker_body").data("current_round")}`][1])/2
            )
        }
        else {
            var points = 0;
        }

        $("#automa_tracker_body").data(
            `user_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            points
        )

        $("#automa_tracker_body").data(
            `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
            points
        )
    }

    // Update round-end text with result
    $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).text(
        `Me: ${
            $("#automa_tracker_body").data(
                `user_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
            )
        }, Automa: ${
            $("#automa_tracker_body").data(
                `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
            )
        }`
    )

    update_automa_total_score();
    
    // Empty automa actions table and round end cube count text in modal
    $("#table_automa_actions tbody").empty();

    $("#automa_score_for_round_end_modal").empty();

    // Show and hide buttons
    hide_height_hidden(
        "#row_end_round_button"
    );

    // Setup for new round
    new_round($("#automa_tracker_body").data("current_round") + 1);
}