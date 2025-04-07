function assign_submit_href() {

    var data_dict = {
        "col_base_game_checkbox" : $("#col_base_game_checkbox").is(":checked"),
        "col_european_expansion_checkbox" : $("#col_european_expansion_checkbox").is(":checked"),
        "col_oceania_expansion_checkbox" : $("#col_oceania_expansion_checkbox").is(":checked"),
        "col_asia_checkbox" : $("#col_asia_checkbox").is(":checked"),
        "col_automubon_society_checkbox" : $("#col_automubon_society_checkbox").is(":checked"),
        "col_RAOUtoma_checkbox" : $("#col_RAOUtoma_checkbox").is(":checked"),
        "col_automa_points_per_face_down_bird_card_radio" : $("input[name='automa_points_per_face_down_bird_card']:checked").val(),
        "cell_automa_n_drawn_cards" : $("#automa_tracker_body").data("automa_drawn_cards_counter"),
        "cell_automa_played_birds" : $("#automa_tracker_body").data("automa_played_birds_counter"),
        "cell_player_end-of-round_goals" : $("#automa_tracker_body").data(
            "player_end_of_round_1_points"
        ) + $("#automa_tracker_body").data(
            "player_end_of_round_2_points"
        ) + $("#automa_tracker_body").data(
            "player_end_of_round_3_points"
        ) + $("#automa_tracker_body").data(
            "player_end_of_round_4_points"
        ),
        "cell_automa_end-of-round_goals" : $("#automa_tracker_body").data(
            "automa_end_of_round_1_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_2_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_3_points"
        ) + $("#automa_tracker_body").data(
            "automa_end_of_round_4_points"
        ),
        "cell_automa_laid_eggs" : $("#automa_tracker_body").data("automa_eggs_counter"),
        "cell_automa_nectar" : $("#automa_tracker_body").data("automa_forest_nectar_score") + $("#automa_tracker_body").data("automa_grassland_nectar_score") + $("#automa_tracker_body").data("automa_wetland_nectar_score"),
        "cell_automa_total_score" : $("#automa_tracker_body").data("automa_total_score_counter")
    }

    var href_array = [];
    $.each(
        data_dict,
        function(k, v) {                    
            var str = k + "=";
            if (isNaN(v)) {
                str+="-1";
            }
            else {
                str+=v;
            }
            href_array.push(str);
        }
    
    );

    var href = href_array.join("&");

    $("#href_submit_to_score_sheet").attr(
        "href",
        "score_sheet_automa.html?" + href
    );
}