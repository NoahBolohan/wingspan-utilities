// Open with debug options
$(document).ready(
    function() {
        // show_height_hidden("#row_debug_mode");
    }
)

// Debug mode checkbox
$(document).ready(
    function() {
        $("#col_debug_mode_checkbox").on(
            "change",
            function() {
                
                if (($("#col_debug_mode_checkbox").is(":checked"))) {

                    // Debug option: quick start (Starts unchecked)
                    show_height_hidden("#row_debug_mode_quick_start");
                    $("#col_debug_mode_quick_start_checkbox").prop(
                        "checked",
                        false
                    )

                    // Debug option: round length (Starts checked)
                    show_height_hidden("#row_debug_mode_round_length");
                    $("#col_debug_mode_round_length_checkbox").prop(
                        "checked",
                        true
                    )

                    // Debug option: play a bird (Starts checked)
                    show_height_hidden("#row_debug_mode_play_a_bird");
                    $("#col_debug_mode_play_a_bird_checkbox").prop(
                        "checked",
                        true
                    )

                    // Debug option: round end winner (Starts checked)
                    show_height_hidden("#row_debug_mode_round_end_winner");
                    $("#col_debug_mode_round_end_winner_checkbox").prop(
                        "checked",
                        true
                    )

                }
                else {

                    // Debug option: quick start
                    hide_height_hidden("#row_debug_mode_quick_start");
                    $("#col_debug_mode_quick_start_checkbox").prop(
                        "checked",
                        false
                    )

                    // Debug option: round length
                    hide_height_hidden("#row_debug_mode_round_length");
                    $("#col_debug_mode_round_length_checkbox").prop(
                        "checked",
                        false
                    )

                    // Debug option: play a bird
                    hide_height_hidden("#row_debug_mode_play_a_bird");
                    $("#col_debug_mode_play_a_bird_checkbox").prop(
                        "checked",
                        false
                    )

                    // Debug option: round end winner
                    hide_height_hidden("#row_debug_mode_round_end_winner");
                    $("#col_debug_mode_round_end_winner_checkbox").prop(
                        "checked",
                        false
                    )
                }
            }
        );
    }
)

// Debug mode: quick start functionality
$(document).ready(
    function() {
        $("#col_debug_mode_quick_start_checkbox").on(
            "change",
            function() {
                
                if (($("#col_debug_mode_quick_start_checkbox").is(":checked"))) {

                    $("input:radio[name=difficulty]").filter("[value=eagle]").prop("checked", true).trigger("change");

                    $("#col_difficulty_radio").data(
                        "enable_start_game",
                        1
                    );

                    $.getJSON(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/round_end_scoring/base.json`, function(data) {

                        update_round_end_goal_image(
                            1,
                            "birds_in_forest",
                            "eggs_in_forest",
                            data["birds_in_forest"]
                        );

                        $("#button_round_1_birds_in_forest").click();
    
                        update_round_end_goal_image(
                            2,
                            "birds_in_grassland",
                            "eggs_in_grassland",
                            data["birds_in_grassland"]
                        );
    
                        update_round_end_goal_image(
                            3,
                            "birds_in_wetland",
                            "eggs_in_wetland",
                            data["birds_in_wetland"]
                        );
    
                        update_round_end_goal_image(
                            4,
                            "total_birds",
                            "sets_of_eggs_in_forest_grassland_wetland",
                            data["total_birds"]
                        );
                    })

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
        );
    }
)