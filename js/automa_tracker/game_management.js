// Assign config parameter on ready
$(document).ready(

    // Read config
    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/config.json", function(data) {

        $("#automa_tracker_body").data(
            "round_lengths",
            data["round_lengths"]
        );
    })
)

// Check base-game checkbox on startup
$(document).ready(
    function() {

        update_round_end_goals();
        generate_round_end_goal_buttons_for_expansions(
            $("#automa_tracker_body").data("expansions_to_include")
        );
    }
)

// Appropriate changes for new round
function new_round(round_number) {

    if (round_number <= 4) {
        
        // Setup round number and length, reset turn counter
        $("#automa_tracker_body").data(
            "current_round",
            round_number
        );

        //Debug option
        if ($("#col_debug_mode_round_length_checkbox").is(":checked")) {
            $("#automa_tracker_body").data(
                `round_${round_number}_length`,
                1
            );

        } else {
            $("#automa_tracker_body").data(
                `round_${round_number}_length`,
                $("#automa_tracker_body").data(
                    "round_lengths",
                )[round_number + ""]
            );
        }
        
        $("#automa_tracker_body").data(
            "current_turn",
            0
        );

        // Create automa deck for round
        create_automa_deck(
            $("#automa_tracker_body").data("current_round")
        )

        update_round_end_cube_counter(round_number,0)

        $("#button_automa_action").empty();

        $("#button_automa_action").text(
            `Automa action - ${
                $("#automa_tracker_body").data(
                    `round_${$("#automa_tracker_body").data("current_round")}_length`
                )
            } turns left`
        )

        show_height_hidden(
            "#row_automa_action_button"
        );
    }
    else {

        hide_height_hidden(
            "#row_automa_actions"
        );

        hide_height_hidden(
            "#row_automa_action_button"
        );

        if ($("#col_oceania_expansion_checkbox").is(":checked")) {

            show_height_hidden(
                "#row_proceed_to_game_end_nectar_button"
            );
        }
        else {
            show_height_hidden(
                "#row_proceed_to_game_end_button"
            );
        }

        
    }
}

// Create the automa deck for the round
function create_automa_deck(round_number) {

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/automa_actions/automa_actions.json", function(data) {

        var automa_deck = [];

        Object.keys(data).forEach(
            function(key) {
                switch (key) {

                    case "automubon_society":
                        if ($("#col_automubon_society_checkbox").val() == "yes") {
                            automa_deck.push(data[key]);
                        }
                        break;

                    case "RAOUtoma":
                        if ($("#col_RAOUtoma_checkbox").val() == "yes") {
                            automa_deck.push(data[key]);
                        }
                        break;

                    case "automasian_alliance":
                        if ($("#col_automasian_alliance_checkbox").val() == "yes") {
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

        $("#automa_tracker_body").data(
            "automa_deck",
            shuffle(automa_deck)
        )
    })
}

// Increment a round counter
function update_round_end_cube_counter(round_number,cube_increment) {
    
    $("#automa_tracker_body").data(
        `round_${round_number}_cube_counter`,
        Math.max(
            0,
            $("#automa_tracker_body").data(
                `round_${round_number}_cube_counter`
            ) + cube_increment
        )
    );

    var n_cubes = $("#automa_tracker_body").data(`round_${round_number}_cube_counter`);
    var base_value = $("#automa_tracker_body").data(`automa_round_${round_number}_base_value`);

    $("#automa_tracker_body").data(
        `round_${round_number}_goal_score`,
        n_cubes + base_value
    )
    
    $(`#col_round_${round_number}_end_cube_count`).text(
        `${n_cubes + base_value}\n(${base_value}+\u25A8\u00D7 ${n_cubes})`
    )
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

// Set an event listener for performing a new automa action by clicking the automa action button
$(document).ready(
    function() {
        $("#button_automa_action").on(
            "click",
            function() {

                if (
                    $("#automa_tracker_body").data("current_turn") <= $("#automa_tracker_body").data(
                        `round_${$("#automa_tracker_body").data("current_round")}_length`
                    ) - 2
                ) {

                    // Append new automa action to table
                    append_automa_action_row(
                        $("#automa_tracker_body").data(
                            "automa_deck"
                        )[$("#automa_tracker_body").data("current_turn")]
                    );
                }
                else {
                    // Append new automa action to table
                    append_automa_action_row(
                        $("#automa_tracker_body").data(
                            "automa_deck"
                        )[$("#automa_tracker_body").data("current_turn")]
                    );

                    // Show and hide buttons
                    hide_height_hidden(
                        "#row_automa_action_button"
                    );

                    show_height_hidden(
                        "#row_end_round_button"
                    );
                }
                
            }
        )
    }
)

$(document).ready(
    function() {
        $("#button_automa_score_breakdown").on(
            "click",
            function() {

                $("#modal_automa_score_breakdown").modal("show")
            }
        )
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_automa_score_breakdown").on(
            "click",
            function() {
                $("#modal_automa_score_breakdown").modal("hide");
            }
        );
    }
)

// Set an event listener for adding hoard tokens by clicking the add hoard tokens button
$(document).ready(
    function() {
        $("#button_automa_add_hoard_tokens").on(
            "click",
            function() {

                $("#modal_add_hoard_tokens").modal("show")
            }
        )
    }
)

// Add hoard tokens buttons
$(document).ready(
    function() {

        $.each(
            ["food", "nectar", "bird_card", "egg", "bonus_card"],
            function(idx,hoard_token_type) {
        
                $(`#col_button_add_${hoard_token_type}_hoard_tokens`).on(
                    "click",
                    function() {
        
                        $("#automa_tracker_body").data(
                            "automa_hoard_token_counter",
                            $("#automa_tracker_body").data(
                                "automa_hoard_token_counter"
                            ) + $(`#col_button_add_${hoard_token_type}_hoard_tokens`).data("n_tokens")
                        );
        
                        $("#col_automa_hoard_tokens_count").text(
                            $("#automa_tracker_body").data(
                                "automa_hoard_token_counter"
                            )
                        );

                        update_automa_hoard_tokens(
                            $(`#col_button_add_${hoard_token_type}_hoard_tokens`).data("n_tokens")
                        );
                        update_automa_total_score();
        
                        $("#modal_add_hoard_tokens").modal("hide")
                    }
                )
            }
        )
    }
)

// Set an event listener for removing hoard tokens by clicking the remove hoard tokens button
$(document).ready(
    function() {
        $("#button_automa_remove_hoard_tokens").on(
            "click",
            function() {

                $("#modal_remove_hoard_tokens").modal("show")
            }
        )
    }
)

// remove hoard tokens buttons
$(document).ready(
    function() {

        $.each(
            ["food", "nectar", "bird_card", "egg"],
            function(idx,hoard_token_type) {
        
                $(`#col_button_remove_${hoard_token_type}_hoard_tokens`).on(
                    "click",
                    function() {
        
                        $("#automa_tracker_body").data(
                            "automa_hoard_token_counter",
                            Math.max(
                                $("#automa_tracker_body").data(
                                    "automa_hoard_token_counter"
                                ) - $(`#col_button_remove_${hoard_token_type}_hoard_tokens`).data("n_tokens"),
                                0
                            )
                        );
        
                        $("#col_automa_hoard_tokens_count").text(
                            $("#automa_tracker_body").data(
                                "automa_hoard_token_counter"
                            )
                        );

                        update_automa_hoard_tokens();
                        update_automa_total_score();
        
                        $("#modal_remove_hoard_tokens").modal("hide")
                    }
                )
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
                if ($("#col_debug_mode_round_end_winner_checkbox").is(":checked")) {

                    end_round_cleanup("automa_player_scored");
                }
                else {

                    $("#automa_score_for_round_end_modal").text(
                        "Automa's score: " + $("#automa_tracker_body").data(
                            `round_${$("#automa_tracker_body").data("current_round")}_goal_score`
                        )
                    )

                    if ($("#col_oceania_expansion_checkbox").is(":checked")) {

                        $.each(
                            ["forest", "grassland", "wetland"],
                            function(idx,board_zone) {
                                $(`#col_automa_nectar_${board_zone}_count_end_of_round`).text(
                                    $("#automa_tracker_body").data(`automa_nectar_${board_zone}_counter`)
                                )
                            }
                        )

                        check_automa_end_of_round_nectar(1);
                        check_automa_end_of_round_nectar(2);

                        $("#modal_automa_end_of_round_nectar").modal("show");
                    }
                    else {
                        $("#modal_end_of_round").modal("show");
                    }
                    
                }
            }
        )
    }
)

// Set an event listener for opening the end-of-round modal from the end-of-round nectar modal
$(document).ready(
    function() {
        $("#button_automa_end_of_round_nectar_continue").on(
            "click",
            function() {

                $("#modal_automa_end_of_round_nectar").modal("hide");
                $("#modal_end_of_round").modal("show");
            }
        )
    }
)

function nectar_scoring_button_enable(nectar_scoring_button_id) {

    if ($(nectar_scoring_button_id).hasClass("nectar-scoring-button-disabled")) {
        $(nectar_scoring_button_id).removeClass("nectar-scoring-button-disabled");
    }
    $(nectar_scoring_button_id).addClass("nectar-scoring-button-enabled");
}

function nectar_scoring_button_disable(nectar_scoring_button_id) {

    if ($(nectar_scoring_button_id).hasClass("nectar-scoring-button-enabled")) {
        $(nectar_scoring_button_id).removeClass("nectar-scoring-button-enabled");
    }
    $(nectar_scoring_button_id).addClass("nectar-scoring-button-disabled");
}

// Set an event listener for performing nectar scoring I won action by clicking the nectar scoring I won button
$(document).ready(

    function () {

        $.each(
            ["forest","grassland","wetland"],
            function(habitat_key, habitat) {
    
                $.each(
                    ["i_won", "we_tied", "automa_won_player_scored", "automa_won_player_did_not_score"],
                    function (outcome_key, outcome) {
    
                        $(`#button_${habitat}_nectar_scoring_${outcome}`).on(
                            "click",
                            function() {

                                for (var other_outcome of ["i_won", "we_tied", "automa_won_player_scored", "automa_won_player_did_not_score"]) {
            
                                    if (other_outcome == outcome) {

                                        nectar_scoring_button_enable(`#button_${habitat}_nectar_scoring_${other_outcome}`);
                                    }
                                    else {

                                        nectar_scoring_button_disable(`#button_${habitat}_nectar_scoring_${other_outcome}`);
                                    }
                                }

                                switch (outcome) {

                                    case "i_won":

                                        $("#automa_tracker_body").data(
                                            `player_${habitat}_nectar_score`,
                                            5
                                        );
                                        if ($(`#col_automa_nectar_${habitat}_count`).data("counter") > 0) {

                                            $("#automa_tracker_body").data(
                                                `automa_${habitat}_nectar_score`,
                                                2
                                            );
                                        }
                                       else {

                                            $("#automa_tracker_body").data(
                                                `automa_${habitat}_nectar_score`,
                                                0
                                            );
                                        }
                                        
                                        
                                        break;

                                    case "we_tied":

                                        $("#automa_tracker_body").data(
                                            `player_${habitat}_nectar_score`,
                                            3
                                        );
                                        $("#automa_tracker_body").data(
                                            `automa_${habitat}_nectar_score`,
                                            3
                                        );
                                        break;

                                    case "automa_won_player_scored":

                                        $("#automa_tracker_body").data(
                                            `player_${habitat}_nectar_score`,
                                            2
                                        );
                                        $("#automa_tracker_body").data(
                                            `automa_${habitat}_nectar_score`,
                                            5
                                        );
                                        break;

                                    case "automa_won_player_did_not_score":

                                        $("#automa_tracker_body").data(
                                            `player_${habitat}_nectar_score`,
                                            0
                                        );
                                        $("#automa_tracker_body").data(
                                            `automa_${habitat}_nectar_score`,
                                            5
                                        );
                                        break;
                                }
                            }
                        )
                    }
                )
            }
        )
    }
)

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

// Set an event listener for performing automa won action by clicking the automa won button (user scored)
$(document).ready(
    function() {
        $("#button_automa_won_player_scored").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("automa_player_scored"); 
            }
        )
    }
)

// Set an event listener for performing automa won action by clicking the automa won button (user did not score)
$(document).ready(
    function() {
        $("#button_automa_won_player_did_not_score").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("automa_player_did_not_score"); 
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

                $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/round_end_scoring/round_end_points.json", function(data) {

                    $("#automa_tracker_body").data(
                        "round_end_points",
                        data
                    )
                })

                // Setup for first round
                reset_automa_drawn_cards();
                reset_automa_played_birds();
                reset_automa_laid_eggs();
                reset_automa_round_end_points()
                reset_automa_nectar_tokens()
                reset_automa_hoard_tokens()
                reset_automa_total_score();
                new_round(1);

                // Show and hide stuff
                if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

                    show_display_hidden("#col_automa_hoard_tokens_text_div");
                    show_display_hidden("#col_hoard_token_buttons");
                    $("#table_row_current_automa_hoard_tokens").css(
                        "visibility",
                        "visible"
                    );
                    $("#col_automa_score").removeClass(
                        "col-10"
                    );
                    $("#col_automa_score").addClass(
                        "col-6"
                    );
                }
                else {

                    hide_display_hidden("#col_automa_hoard_tokens_text_div");
                    hide_display_hidden("#col_hoard_token_buttons");
                    $("#table_row_current_automa_hoard_tokens").css(
                        "visibility",
                        "collapse"
                    );
                    $("#col_automa_score").removeClass(
                        "col-6"
                    );
                    $("#col_automa_score").addClass(
                        "col-10"
                    );
                }

                if ($("#col_oceania_expansion_checkbox").is(":checked")) {

                    update_automa_nectar_counts(
                        {
                            "forest" : $("#automa_tracker_body").data("automa_starting_nectar"),
                            "grassland" : $("#automa_tracker_body").data("automa_starting_nectar"),
                            "wetland" : $("#automa_tracker_body").data("automa_starting_nectar"),
                        },
                        "reset"
                    );

                    show_display_hidden("#col_automa_nectar_text_div");
                    $("#table_row_current_automa_nectar").css(
                        "visibility",
                        "visible"
                    );
                }
                else {
                    
                    hide_display_hidden("#col_automa_nectar_text_div");
                    $("#table_row_current_automa_nectar").css(
                        "visibility",
                        "collapse"
                    );
                }

                hide_display_hidden("#div_dropdown_expansions_menu");
                hide_display_hidden("#div_dropdown_extra_cards_menu");

                show_display_hidden("#col_automa_score")
                
                hide_height_hidden(
                    "#container_game_setup"
                );
                show_height_hidden(
                    "#container_automa_gameplay"
                );

                hide_height_hidden("#row_debug_mode");

                // Debug option
                if ($("#col_debug_mode_quick_start_checkbox").is(":checked")) {
                    $("#col_debug_mode_quick_start_checkbox").prop(
                        "checked",
                        false
                    )
                }
            }
        )
    }
)

// Set an event listener for opening the round end modals by clicking the round end goal buttons
$(document).ready(
    function() {
        $("#button_round_1_end_goal").on(
            "click",
            function() {
                $("#modal_round_1_end_goal_images").modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $("#button_round_2_end_goal").on(
            "click",
            function() {
                $("#modal_round_2_end_goal_images").modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $("#button_round_3_end_goal").on(
            "click",
            function() {
                $("#modal_round_3_end_goal_images").modal("show");
            }
        )
    }
)

$(document).ready(
    function() {
        $("#button_round_4_end_goal").on(
            "click",
            function() {
                $("#modal_round_4_end_goal_images").modal("show");
            }
        )
    }
)

// Define expansion checkbox behaviour
$(document).ready(
    function() {

        $("#col_base_game_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#automa_tracker_body").data("expansions_to_include")
                );
            }
           
        );

        $("#col_european_expansion_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#automa_tracker_body").data("expansions_to_include")
                );
            }
        );

        $("#col_oceania_expansion_checkbox").on(
            "change",
            function() {
                update_round_end_goals();
                generate_round_end_goal_buttons_for_expansions(
                    $("#automa_tracker_body").data("expansions_to_include")
                );
            }
        );
    }
)

function populate_game_end_modal() {

    $("#table_cell_played_birds_points").text(
        $("#automa_tracker_body").data(
            "automa_played_birds_counter"
        )
    )

    $("#table_cell_drawn_cards_points").text(
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
    )

    $("#table_cell_round_end_goals_points").text(
        $("#automa_tracker_body").data(
            "automa_end_of_round_1_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_2_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_3_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_4_points"
        )
    )

    if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

        $("#table_cell_laid_eggs_points").text(
            $("#automa_tracker_body").data(
                "automa_eggs_counter"
            ) + Math.floor(
                $("#automa_tracker_body").data(
                    "automa_hoard_token_counter"
                ) / parseInt(
                    $("input[name='automa_hoard_tokens_per_egg']:checked").val()
                )
            )
        )
    }
    else {

        $("#table_cell_laid_eggs_points").text(
            $("#automa_tracker_body").data(
                "automa_eggs_counter"
            )
        )
    }

    if ($("#col_oceania_expansion_checkbox").is(":checked")) {

        $("#table_cell_final_nectar").text(
            $("#automa_tracker_body").data("automa_forest_nectar_score") + $("#automa_tracker_body").data("automa_grassland_nectar_score") + $("#automa_tracker_body").data("automa_wetland_nectar_score")
        )
    }

    $("#table_cell_total_points").text(
        $("#automa_tracker_body").data(
            "automa_total_score_counter"
        )
    )
}

function reset_automa_score_breakdown_table() {
    $("#table_cell_played_birds_points").empty();

    $("#table_cell_drawn_cards_points").empty();

    $("#table_cell_round_end_goals_points").empty();

    $("#table_cell_laid_eggs_points").empty();

    if ($("#col_oceania_expansion_checkbox").is(":checked")) {

        $("#table_cell_final_nectar").empty();
    }

    $("#table_cell_total_points").empty();
}

// Set an event listener for proceeding to end of game nectar scoring by clicking the proceed to nectar scoring button
$(document).ready(

    function() {

        $("#button_proceed_to_game_end_nectar_scoring").on(
            "click",
            function() {

                $("#game_end_automa_nectar_row").css(
                    "visibility",
                    "visible"
                );

                $("#nectar_scoring_forest_count").text(
                    "Forest: " + $("#automa_tracker_body").data("automa_nectar_forest_counter")
                );

                $("#nectar_scoring_grassland_count").text(
                    "Grassland: " + $("#automa_tracker_body").data("automa_nectar_grassland_counter")
                );

                $("#nectar_scoring_wetland_count").text(
                    "Wetland: " + $("#automa_tracker_body").data("automa_nectar_wetland_counter")
                );

                $("#modal_nectar_scoring").modal("show");
            }
        )
    }
)

// Set an event listener for proceeding to end of game by clicking the proceed to end of game button from the nectar screen
$(document).ready(

    function() {

        $("#button_proceed_to_game_end_from_nectar_scoring").on(
            "click",
            function() {

                populate_game_end_modal();
                assign_submit_href();

                $("#game_end_automa_nectar_row").css(
                    "visibility",
                    "visible"
                );

                $("#modal_nectar_scoring").modal("hide");
                $("#modal_end_of_game").modal("show");
            }
        )
    }
)

// Set an event listener for proceeding to end of game by clicking the proceed to end of game button
$(document).ready(

    function() {

        $("#button_proceed_to_game_end").on(
            "click",
            function() {

                populate_game_end_modal();
                assign_submit_href();

                $("#game_end_automa_nectar_row").css(
                    "visibility",
                    "collapse"
                );

                $("#modal_end_of_game").modal("show");
            }
        )
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

                    $("#automa_tracker_body").data(
                        `enable_start_game_round_${round_number}_end_goal`,
                        0
                    )

                    $(`#button_round_${round_number}_end_goal`).empty();

                    $(`#button_round_${round_number}_end_goal`).text(
                        `Add round ${round_number} end goal`
                    )

                    $(`#col_round_${round_number}_end_cube_count`).empty();

                    $("#automa_tracker_body").data(
                        `round_${round_number}_cube_counter`,
                        0
                    )
                }

                reset_automa_played_birds();
                reset_automa_drawn_cards();
                reset_automa_laid_eggs();
                reset_automa_total_score();

                $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).empty();

                $("#table_automa_actions tbody").empty();
                
                // Reset difficulty radios
                $("#radio_difficulty_choice_eaglet").prop('checked', false);
                $("#radio_difficulty_choice_eagle").prop('checked', false);
                $("#radio_difficulty_choice_eagle-eyed_eagle").prop('checked', false);

                $("#automa_tracker_body" ).data(
                    "enable_start_game_difficulty",
                    0
                )

                $("input:radio[name=automa_starting_nectar]").prop("checked", false);
                $("#automa_tracker_body" ).data(
                    "enable_start_game_nectar",
                    0
                )

                $("input:radio[name=automa_hoard_tokens_per_egg]").prop("checked", false);
                $("#automa_tracker_body" ).data(
                    "enable_start_game_hoard_tokens",
                    0
                )

                $("input:radio[name=automa_points_per_face_down_bird_card]").prop("checked", false);
                $("#automa_tracker_body" ).data(
                    "enable_start_game_points_per_drawn_card",
                    0
                )

                start_game_enabler();

                // Show and hide buttons
                show_height_hidden(
                    "#container_game_setup"
                );
                hide_height_hidden(
                    "#container_automa_gameplay"
                );

                // Empty automa actions tables
                $("#table_automa_actions tbody").empty();

                // Show and hide buttons / modals
                hide_height_hidden(
                    "#row_end_round_button"
                );

                hide_height_hidden(
                    "#row_proceed_to_game_end_nectar_button"
                );

                hide_height_hidden(
                    "#row_proceed_to_game_end_button"
                );

                $(`#modal_end_of_game`).modal("hide");

                reset_automa_score_breakdown_table();
            }
        )
    }
)