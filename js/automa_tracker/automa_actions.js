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
                "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/egg.webp"),
                "style" : "height : 4vh;"
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
                "style" : "width : 16.67%; border : 1px solid rgba(var(--font-color-buttons));"
            }
        ).appendTo(
            food_order_cell
        );
    }

    return food_order_cell;
}

// Update automa drawn cards counter
function update_automa_drawn_cards() {

    $("#automa_tracker_body").data(
        "automa_drawn_cards_counter",
        $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        ) + 1
    );

    $("#table_cell_current_drawn_cards_points").empty();
    $("#table_cell_current_drawn_cards_points").text(
        `${
            $("#automa_tracker_body").data(
                "automa_points_per_face_down_bird_card"
            ) * $("#automa_tracker_body").data(
                "automa_drawn_cards_counter"
            )
        } (${
            $("#automa_tracker_body").data(
                "automa_points_per_face_down_bird_card"
            )
        } \u00D7 ${
            $("#automa_tracker_body").data(
                "automa_drawn_cards_counter"
            )
        })`
    );

    update_automa_total_score();
}

// Reset automa drawn cards counter
function reset_automa_drawn_cards() {

    $("#automa_tracker_body").data(
        "automa_drawn_cards_counter",
        0
    );

    $("#table_cell_current_drawn_cards_points").empty();
    $("#table_cell_current_drawn_cards_points").text(
        $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        )
    );
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
    
        $("#table_cell_current_played_birds_points").empty();
        $("#table_cell_current_played_birds_points").text(
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

    $("#table_cell_current_played_birds_points").empty();
    $("#table_cell_current_played_birds_points").text(
        $("#automa_tracker_body").data(
            "automa_played_birds_counter"
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

    $("#table_cell_current_laid_eggs_points").empty();
    $("#table_cell_current_laid_eggs_points").text(
        $("#automa_tracker_body").data(
            "automa_eggs_counter"
        )
    );

    update_automa_total_score();
}

// Reset automa laid eggs counter
function reset_automa_laid_eggs() {

    $("#automa_tracker_body").data(
        "automa_eggs_counter",
        0
    );

    $("#table_cell_current_laid_eggs_points").empty();
    $("#table_cell_current_laid_eggs_points").text(
        $("#automa_tracker_body").data(
            "automa_eggs_counter"
        )
    );
}

// Update automa round end points counter
function update_automa_round_end_points(round_end_points) {

    $("#automa_tracker_body").data(
        "automa_round_end_points_counter",
        $("#automa_tracker_body").data(
            "automa_round_end_points_counter"
        ) + round_end_points
    );

    $("#table_cell_current_round_end_goals_points").empty();
    $("#table_cell_current_round_end_goals_points").text(
        $("#automa_tracker_body").data(
            "automa_round_end_points_counter"
        )
    );

    update_automa_total_score();
}

// Reset automa round end points counter
function reset_automa_round_end_points() {

    $("#automa_tracker_body").data(
        "automa_round_end_points_counter",
        0
    );

    $("#table_cell_current_round_end_goals_points").empty();
    $("#table_cell_current_round_end_goals_points").text(
        $("#automa_tracker_body").data(
            "automa_round_end_points_counter"
        )
    );
}

// Update automa hoard tokens counter
function update_automa_hoard_tokens() {

    var plural_eggs = '';
    var n_eggs = Math.floor(
        $("#automa_tracker_body").data(
            "automa_hoard_token_counter"
        ) / parseInt(
            $("input[name='automa_hoard_tokens_per_egg']:checked").val()
        )
    );

    if (n_eggs != 1) {
        plural_eggs = 's';
    }


    $("#table_cell_current_hoard_tokens").empty();
    $("#table_cell_current_hoard_tokens").text(
        $("#automa_tracker_body").data(
            "automa_hoard_token_counter"
        ) + ` (${
            Math.floor(
                $("#automa_tracker_body").data(
                    "automa_hoard_token_counter"
                ) / parseInt(
                    $("input[name='automa_hoard_tokens_per_egg']:checked").val()
                )
            )
        } egg${plural_eggs})`
    );

    update_automa_total_score();
}

// Reset automa hoard tokens counter
function reset_automa_hoard_tokens() {

    $("#automa_tracker_body").data(
        "automa_hoard_token_counter",
        0
    );

    $("#table_cell_current_hoard_tokens").empty();
    $("#table_cell_current_hoard_tokens").text(
        $("#automa_tracker_body").data(
            "automa_hoard_token_counter"
        ) + ` (0 eggs)`
    );
}

// Reset automa hoard tokens counter
function reset_automa_nectar_tokens() {

    $("#table_cell_current_hoard_tokens").empty();
    $("#table_cell_current_hoard_tokens").text(
        0/0/0
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

    $("#table_cell_current_total_points").empty();

    $("#table_cell_current_total_points").text(
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

    $("#table_automa_actions").css(
        "height",
        `${
            5 + $("#automa_tracker_body").data(
                "current_turn"
            ) * 6
        }vh`
    );

    // Initialize row
    var tr = $("<tr>").css(
        "height",
        "6vh"
    );

    // Append turn number to row
    $("<th>").attr(
        {
            scope : "row",
            style : "width: 10%;",
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

    switch(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["primary_action"]) {

        case "play_a_bird":

            // Debug option
            if ($("#col_debug_mode_play_a_bird_checkbox").is(":checked")) {
                update_automa_played_birds(-1);
            }
            else {
                $(`#modal_play_a_card`).modal("show");
            }

            var played_bird_cell = $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "text-align: center;"
                }
            )
        
            $("<img>").attr(
                {
                    "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/bird.webp"),
                    "style" : "height : 4vh;"
                }
            ).appendTo(
                played_bird_cell
            );

            played_bird_cell.appendTo(
                tr
            );
            break;

        case "draw_cards":
            update_automa_drawn_cards();

            var drawn_card_cell = $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "text-align: center;"
                }
            )
        
            $("<img>").attr(
                {
                    "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/bird_card_back.png"),
                    "style" : "height : 4vh;"
                }
            ).appendTo(
                drawn_card_cell
            );

            drawn_card_cell.appendTo(
                tr
            );
            break;

        case "lay_eggs":
            generate_egg_td(
                automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"]
            ).appendTo(
                tr
            );
            update_automa_laid_eggs(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"]);
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
    switch(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["secondary_action"]) {

        case "place_end-of-round_cube":

            var place_cube_cell = $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "text-align: center;"
                }
            )
        
            $("<img>").attr(
                {
                    "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/cube.webp"),
                    "style" : "height : 4vh;"
                }
            ).appendTo(
                place_cube_cell
            );

            place_cube_cell.appendTo(
                tr
            );
            break;

        case "remove_end-of-round_cube":

            var remove_cube_cell = $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "text-align: center;"
                }
            )

            var remove_cube_div = $("<div>").attr(
                {
                    class: "centered-text",
                    id: "remove_cube_cell_div"
                }
            ).appendTo(
                remove_cube_cell
            );

            $("<img>").attr(
                {
                    "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/cube.webp"),
                    "style" : "height : 4vh;"
                }
            ).appendTo(
                remove_cube_div
            );

            $("<div>").attr(
                {
                    "class" : "text-overlay",
                    "style" : "font-size:8vh;color:red;"
                }
            ).html(
                "&#xd7;"
            ).appendTo(
                remove_cube_div
            );

            remove_cube_cell.appendTo(
                tr
            );
            break;

        case "activate_pink_powers":

            var pink_powers_cell = $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "text-align: center;"
                }
            )
        
            $("<img>").attr(
                {
                    "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/pink_powers.webp"),
                    "style" : "height : 4vh;"
                }
            ).appendTo(
                pink_powers_cell
            );

            pink_powers_cell.appendTo(
                tr
            );
            break;

        case "none":

            $("<td>").attr(
                {
                    class : "cell-automa-action",
                    style : "width: 45%; text-align: center"
                }
            ).text(
                "hi"
            ).appendTo(
                tr
            );
            break;
    }

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

    $("#button_automa_action").empty();

    var turns_left = $("#automa_tracker_body").data(
        `round_${$("#automa_tracker_body").data("current_round")}_length`
    ) - $("#automa_tracker_body").data(
        "current_turn"
    );

    if (turns_left == 1) {
        $("#button_automa_action").text(
            `Automa action - ${turns_left} turn left`
        );
    }
    else {
        $("#button_automa_action").text(
            `Automa action - ${turns_left} turns left`
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

            $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`).empty();

            if (`round_${nectar_spot}` in increment_card) {
                if (increment_card[`round_${nectar_spot}`]["secondary_action"] == "place_end-of-round_cube") {

                    $("<img>").attr(
                        {
                            "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/cube.webp"),
                            "style" : "height:5vh;"
                        }
                    ).appendTo(
                        $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`)
                    );

                    incrementer[nectar_spot] += 1;
                }
                else if (increment_card[`round_${nectar_spot}`]["secondary_action"] == "remove_end-of-round_cube") {
    
                    $("<img>").attr(
                        {
                            "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/misc_images/cube.webp"),
                            "style" : "height:5vh;"
                        }
                    ).appendTo(
                        $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`)
                    );

                    $("<div>").attr(
                        {
                            "class" : "text-overlay",
                            "style" : "font-size:10vh;color:red;"
                        }
                    ).html(
                        "&#xd7;"
                    ).appendTo(
                        $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`)
                    );

                    incrementer[nectar_spot] -= 1;

                } else {

                    $("<img>").attr(
                        {
                            "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/food_icons/no-food.webp"),
                            "style" : "height:5vh;"
                        }
                    ).appendTo(
                        $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`)
                    )
                }
            }
            else {
                $("<img>").attr(
                    {
                        "src" : encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/food_icons/no-food.webp"),
                        "style" : "height:5vh;"
                    }
                ).appendTo(
                    $(`#col_automa_nectar_${nectar_spot}_count_end_of_round_increment_${n_check}`)
                )
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
        }
    )

    $("table_cell_current_nectar").text(
        `${
            $("#automa_tracker_body").data("automa_nectar_forest_counter")
        }/${
            $("#automa_tracker_body").data("automa_nectar_grassland_counter")
        }/${
            $("#automa_tracker_body").data("automa_nectar_wetland_counter")
        }`
    )
}

function end_round_cleanup(who_won) {
    
    // Reset current round counter
    $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).empty();

    if (who_won == "me") {

        // Update users round end points
        $("#automa_tracker_body").data(
            `player_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
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
    else if (who_won == "automa_player_scored") {

        // Update user's round end points
        $("#automa_tracker_body").data(
            `player_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
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

    else if (who_won == "automa_player_did_not_score") {

        // Update user's round end points
        $("#automa_tracker_body").data(
            `player_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
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
            `player_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`,
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
                `player_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
            )
        }, Automa: ${
            $("#automa_tracker_body").data(
                `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
            )
        }`
    )
    update_automa_round_end_points(
        $("#automa_tracker_body").data(
            `automa_end_of_round_${$("#automa_tracker_body").data("current_round")}_points`
        )
    );
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