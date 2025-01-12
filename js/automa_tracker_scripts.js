function assign_submit_href() {

    var data_dict = {
        "col_base_game_checkbox" : $("#col_base_game_checkbox").is(":checked"),
        "col_european_expansion_checkbox" : $("#col_european_expansion_checkbox").is(":checked"),
        "col_oceania_expansion_checkbox" : $("#col_oceania_expansion_checkbox").is(":checked"),
        "col_asia_checkbox" : $("#col_asia_checkbox").is(":checked"),
        "col_automubon_society_checkbox" : $("#col_automubon_society_checkbox").is(":checked"),
        "col_RAOUtoma_checkbox" : $("#col_RAOUtoma_checkbox").is(":checked"),
        "col_difficulty_radio" : $("input[name='difficulty']:checked").val(),
        "cell_automa_n_drawn_cards" : $("#automa_tracker_body").data("automa_drawn_cards_counter"),
        "cell_automa_played_birds" : $("#automa_tracker_body").data("automa_played_birds_counter"),
        "cell_automa_end-of-round_goals" : $("#automa_tracker_body").data(
            "automa_end_of_round_1_points"
        ) + $("#cautoma_tracker_body").data(
            "automa_end_of_round_2_points"
        ) + $("#automa_tracker_body").data(
            "automa_rend_of_round_3_points"
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
            var str = k + "=" + v;
            href_array.push(str);
        }
    
    );

    var href = href_array.join("&");

    $("#href_submit_to_score_sheet").attr(
        "href",
        "https://noahbolohan.github.io/wingspan-tracker/score_sheet_automa.html?" + href
    );
}

// Populate certain divs before submitting form
function populate_form_data() {

    // Automa: drawn cards
    $("#automa_drawn_cards_for_post").val(
        $("#automa_tracker_body").data(
            "automa_points_per_face_down_bird_card"
        ) * $("#automa_tracker_body").data(
            "automa_drawn_cards_counter"
        )
    )

    // Automa: played birds
    $("#automa_played_birds_for_post").val(
        $("#table_cell_played_birds_points").text()
    )

    // Automa: end-of-round goals
    $("#automa_end-of-round_goals_for_post").val(
        $("#table_cell_round_end_goals_points").text()
    )

    // Automa: laid eggs
    $("#automa_laid_eggs_for_post").val(
        $("#table_cell_laid_eggs_points").text()
    )

    // Automa: total score
    $("#automa_total_score_for_post").val(
        $("#table_cell_total_points").text()
    )
}

// Assign a random background on load
$(document).ready(

    function () {

        $.getJSON(
            "https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/backgrounds/backgrounds.json",
            function(data) {

                $("body").css(
                    "background-image",
                    `url(https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/backgrounds/${
                        data["backgrounds"][Math.floor(Math.random() * data["backgrounds"].length)]
                    })`
                );
            }
        )
    }
)

// Assign config parameter on ready
$(document).ready(

    // Read config
    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/config.json", function(data) {

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

// Check if start game button should be enabled
function start_game_enabler() {

    var idx_to_check = [
        "#col_difficulty_radio",
        "#row_automa_starting_nectar_radio",
        "#row_automa_points_per_face_down_bird_card_radio",
        "#row_automa_hoard_tokens_per_egg_radio",
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
                        $("input:radio[name=automa_starting_nectar]").filter("[value=3]").prop("checked", true).trigger("change");
                        $("input:radio[name=automa_points_per_face_down_bird_card]").filter("[value=3]").prop("checked", true).trigger("change");

                        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=5]").prop("checked", true).trigger("change");
                        }
                        break;
                    case "eagle":
                        $("input:radio[name=automa_starting_nectar]").filter("[value=4]").prop("checked", true).trigger("change");
                        $("input:radio[name=automa_points_per_face_down_bird_card]").filter("[value=4]").prop("checked", true).trigger("change");

                        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=4]").prop("checked", true).trigger("change");
                        }
                        break;
                    case "eagle-eyed_eagle":
                        $("input:radio[name=automa_starting_nectar]").filter("[value=5]").prop("checked", true).trigger("change");
                        $("input:radio[name=automa_points_per_face_down_bird_card]").filter("[value=5]").prop("checked", true).trigger("change");

                        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=3]").prop("checked", true).trigger("change");
                        }
                        break;

                    
                }

                start_game_enabler();
            }
        )
    }
)

function read_difficulty_from_radio_selection() {

    if (
        (
            $("input[name='automa_starting_nectar']:checked").val() == "3"
        ) && (
            $("input[name='automa_points_per_face_down_bird_card']:checked").val() == "3"
        )
    ) {

        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
            if ($("input[name='automa_hoard_tokens_per_egg']:checked").val() == "5") {
                $("input:radio[name=difficulty]").filter("[value=eaglet]").prop("checked", true);
            }
            else {
                $("input:radio[name=difficulty]").filter("[value=custom]").prop("checked", true);
            }
        }
        else {
            $("input:radio[name=difficulty]").filter("[value=eaglet]").prop("checked", true);
        }
        
    }
    else if (
        (
            $("input[name='automa_starting_nectar']:checked").val() == "4"
        ) && (
            $("input[name='automa_points_per_face_down_bird_card']:checked").val() == "4"
        )
    ) {

        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
            if ($("input[name='automa_hoard_tokens_per_egg']:checked").val() == "4") {
                $("input:radio[name=difficulty]").filter("[value=eagle]").prop("checked", true);
            }
            else {
                $("input:radio[name=difficulty]").filter("[value=custom]").prop("checked", true);
            }
        }
        else {
            $("input:radio[name=difficulty]").filter("[value=eagle]").prop("checked", true);
        }
    }
    else if (
        (
            $("input[name='automa_starting_nectar']:checked").val() == "5"
        ) && (
            $("input[name='automa_points_per_face_down_bird_card']:checked").val() == "5"
        )
    ) {

        if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {
            if ($("input[name='automa_hoard_tokens_per_egg']:checked").val() == "3") {
                $("input:radio[name=difficulty]").filter("[value=eagle-eyed_eagle]").prop("checked", true);
            }
            else {
                $("input:radio[name=difficulty]").filter("[value=custom]").prop("checked", true);
            }
        }
        else {
            $("input:radio[name=difficulty]").filter("[value=eagle-eyed_eagle]").prop("checked", true);
        }
    }
    else {
        $("input:radio[name=difficulty]").filter("[value=custom]").prop("checked", true);
    }
}

// Assign automa starting nectar data
$(document).ready(

    function () {

        $("#row_automa_starting_nectar_radio").on(
            "change",
            function() {
                $("#row_automa_starting_nectar_radio").data(
                    "enable_start_game",
                    1
                );

                switch($("input[name='automa_starting_nectar']:checked").val()) {

                    case "3":
                        $("#automa_tracker_body").data(
                            "automa_starting_nectar",
                            3
                        );
                        break;
                    case "4":
                        $("#automa_tracker_body").data(
                            "automa_starting_nectar",
                            4
                        );
                        break;
                    case "5":
                        $("#automa_tracker_body").data(
                            "automa_starting_nectar",
                            5
                        );
                        break;
                }

                read_difficulty_from_radio_selection();

                start_game_enabler();
            }
        )
    }
)

// Assign automa hoard tokens per egg data
$(document).ready(

    function () {

        $("#row_automa_hoard_tokens_per_egg_radio").on(
            "change",
            function() {
                $("#row_automa_hoard_tokens_per_egg_radio").data(
                    "enable_start_game",
                    1
                );

                switch($("input[name='automa_hoard_tokens_per_egg']:checked").val()) {

                    case "3":
                        $("#automa_tracker_body").data(
                            "automa_hoard_tokens_per_egg",
                            3
                        );
                        break;
                    case "4":
                        $("#automa_tracker_body").data(
                            "automa_hoard_tokens_per_egg",
                            4
                        );
                        break;
                    case "5":
                        $("#automa_tracker_body").data(
                            "automa_hoard_tokens_per_egg",
                            5
                        );
                        break;
                }

                read_difficulty_from_radio_selection();

                start_game_enabler();
            }
        )
    }
)

// Assign automa points per face-down bird data
$(document).ready(

    function () {

        $("#row_automa_points_per_face_down_bird_card_radio").on(
            "change",
            function() {
                $("#row_automa_points_per_face_down_bird_card_radio").data(
                    "enable_start_game",
                    1
                );

                switch($("input[name='automa_points_per_face_down_bird_card']:checked").val()) {

                    case "3":
                        $("#automa_tracker_body").data(
                            "automa_points_per_face_down_bird_card",
                            3
                        );
                        break;
                    case "4":
                        $("#automa_tracker_body").data(
                            "automa_points_per_face_down_bird_card",
                            4
                        );
                        break;
                    case "5":
                        $("#automa_tracker_body").data(
                            "automa_points_per_face_down_bird_card",
                            5
                        );
                        break;
                }

                read_difficulty_from_radio_selection();

                start_game_enabler();
            }
        )
    }
)

// Toggle Automa's cache/hoard row
$(document).ready(

    function () {

        $("#col_automas_cache_checkbox").on(
            "change",
            function () {

                if ($("#col_automas_cache_checkbox").is(":checked")) {

                    // Uncheck Automa's hoard box
                    $("#col_automas_hoard_checkbox").prop(
                        "checked",
                        false
                    )
                }

                // Toggle Automa's cache/hoard row
                if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

                    enable_text("#div_automa_cache_hoard_text");
                    enable_text("#label_automa_hoard_tokens_5");
                    enable_text("#label_automa_hoard_tokens_4");
                    enable_text("#label_automa_hoard_tokens_3");

                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("disabled", false);

                    $("#row_automa_hoard_tokens_per_egg_radio").data(
                        "enable_start_game",
                        0
                    );

                    switch($("input[name='difficulty']:checked").val()) {

                        case "eaglet":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=5]").prop("checked", true).trigger("change");
                            break;
                        case "eagle":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=4]").prop("checked", true).trigger("change");
                            break;
                        case "eagle-eyed_eagle":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=3]").prop("checked", true).trigger("change");
                            break;
                    }

                    start_game_enabler();
                }
                else {
                    disable_text("#div_automa_cache_hoard_text");
                    disable_text("#label_automa_hoard_tokens_5");
                    disable_text("#label_automa_hoard_tokens_4");
                    disable_text("#label_automa_hoard_tokens_3");

                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("disabled", true);
                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("checked", false);

                    $("#row_automa_hoard_tokens_per_egg_radio").data(
                        "enable_start_game",
                        1
                    );

                    read_difficulty_from_radio_selection();
                    start_game_enabler();

                    $("input:radio[name=automa_hoard_tokens_per_egg]").checkboxradio("refresh");
                }
            }
        )

        $("#col_automas_hoard_checkbox").on(
            "change",
            function () {

                if ($("#col_automas_hoard_checkbox").is(":checked")) {

                    // Uncheck Automa's hoard box
                    $("#col_automas_cache_checkbox").prop(
                        "checked",
                        false
                    )
                }

                // Toggle Automa's cache/hoard row
                if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

                    enable_text("#div_automa_cache_hoard_text");
                    enable_text("#label_automa_hoard_tokens_5");
                    enable_text("#label_automa_hoard_tokens_4");
                    enable_text("#label_automa_hoard_tokens_3");

                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("disabled", false);

                    $("#row_automa_hoard_tokens_per_egg_radio").data(
                        "enable_start_game",
                        0
                    );

                    switch($("input[name='difficulty']:checked").val()) {

                        case "eaglet":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=5]").prop("checked", true).trigger("change");
                            break;
                        case "eagle":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=4]").prop("checked", true).trigger("change");
                            break;
                        case "eagle-eyed_eagle":
                            $("input:radio[name=automa_hoard_tokens_per_egg]").filter("[value=3]").prop("checked", true).trigger("change");
                            break;
                    }

                    start_game_enabler();
                }
                else {
                    disable_text("#div_automa_cache_hoard_text");
                    disable_text("#label_automa_hoard_tokens_5");
                    disable_text("#label_automa_hoard_tokens_4");
                    disable_text("#label_automa_hoard_tokens_3");

                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("disabled", true);
                    $("input:radio[name=automa_hoard_tokens_per_egg]").prop("checked", false);

                    $("#row_automa_hoard_tokens_per_egg_radio").data(
                        "enable_start_game",
                        1
                    );

                    read_difficulty_from_radio_selection();
                    start_game_enabler();

                    $("input:radio[name=automa_hoard_tokens_per_egg]").checkboxradio("refresh");
                }
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
    $("#automa_tracker_body").data(
        `automa_round_${round_number}_base_value`,
        round_end_goal_base_values[round_number - 1]
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

        custom_show_div(
            "#row_automa_action_button"
        );
    }
    else {

        custom_hide_div(
            "#row_automa_actions"
        );

        if ($("#col_oceania_expansion_checkbox").is(":checked")) {

            custom_show_div(
                "#row_proceed_to_game_end_nectar_button"
            );
        }
        else {
            custom_show_div(
                "#row_proceed_to_game_end_button"
            );
        }

        
    }
}

// Create the automa deck for the round
function create_automa_deck(round_number) {

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/automa_actions/automa_actions.json", function(data) {

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
    var base_value = $("#automa_tracker_body").data(`automa_round_${round_number}_base_value`);

    $("#automa_tracker_body").data(
        `round_${round_number}_goal_score`,
        n_cubes + base_value
    )
    
    $(`#col_round_${round_number}_end_cube_count`).text(
        `${n_cubes + base_value}\n(${base_value}+\u25A8\u00D7 ${n_cubes})`
    )
}

function generate_egg_td(
    n_eggs,
    primary_action_class
) {

    var egg_cell = $("<td>").attr(
        {
            class : primary_action_class,
            style : "text-align: center;"
        }
    )

    for (var i = 0; i < n_eggs; i++) {

        $("<img>").attr(
            {
                "src" : encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/misc_images/egg.png`),
                "style" : "width : 10%;"
            }
        ).appendTo(
            egg_cell
        );
    }

    return egg_cell;
}

function generate_food_order_td(
    food_order,
    primary_action_class
) {

    var food_order_cell = $("<td>").attr(
        {
            class : primary_action_class,
            style : "text-align: center; white-space : nowrap;"
        }
    )

    for (var i = 0; i < food_order.length; i++) {

        $("<img>").attr(
            {
                "src" : encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/master/static/food_icons/${food_order[i]}.svg`),
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
            class : "bg-info"
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
            primary_action_class = "table-light";

            // Debug option
            if ($("#col_debug_mode_play_a_bird_checkbox").is(":checked")) {
                update_automa_played_birds(-1);
            }
            else {
                $(`#modal_play_a_card`).modal("show");
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
            break;

        case "draw_cards":
            primary_action_text = "Draw cards";
            primary_action_class = "table-info";
            update_automa_drawn_cards();

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
            break;

        case "lay_eggs":
            // // primary_action_text = "<img style = 'width:33%' class='img-fluid' src='https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/misc_images/egg.jpg'/>";
            // primary_action_text = `Lay ${automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"]} egg(s)`;
            // primary_action_class = "table-warning";
            // update_automa_laid_eggs(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"])

            // $("<td>").attr(
            //     {
            //         class : primary_action_class,
            //         style : "width: 45%"
            //     }
            // ).text(
            //     primary_action_text
            // ).appendTo(
            //     tr
            // );
            generate_egg_td(
                automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"],
                primary_action_class = "table-success"
            ).appendTo(
                tr
            );
            update_automa_laid_eggs(automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["number_of_eggs"])
            break;

        case "gain_food":

            generate_food_order_td(
                automa_action[`round_${$("#automa_tracker_body").data("current_round")}`]["food_order"],
                primary_action_class = "table-success"
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
            secondary_action_class = "table-primary";
            break;

        case "remove_end-of-round_cube":
            secondary_action_text = "\u00D7";
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
                    custom_hide_div(
                        "#row_automa_action_button"
                    );

                    custom_show_div(
                        "#row_end_round_button"
                    );
                }
                
            }
        )
    }
)

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

                    end_round_cleanup("automa_user_scored");
                }
                else {

                    $("#automa_score_for_round_end_modal").text(
                        $("#automa_tracker_body").data(
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

function end_round_cleanup(who_won) {
    
    // Reset current round counter
    $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).empty();

    if (who_won == "me") {

        // Update users round end points
        $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data(
            "me_round_end_points",
            $("#automa_tracker_body").data(
                "round_end_points"
            )[`round_${$("#automa_tracker_body").data("current_round")}`][0]
        )

        var n_cubes = $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data("counter");
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
        $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data(
            "me_round_end_points",
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
        $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data(
            "me_round_end_points",
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

        $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data(
            "me_round_end_points",
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
            $(`#col_round_${$("#automa_tracker_body").data("current_round")}_end_cube_count`).data(
                "me_round_end_points"
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
    custom_hide_div(
        "#row_end_round_button"
    );

    // Setup for new round
    new_round($("#automa_tracker_body").data("current_round") + 1);
}

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
                    ["i_won", "we_tied", "automa_won_user_scored", "automa_won_user_did_not_score"],
                    function (outcome_key, outcome) {
    
                        $(`#button_${habitat}_nectar_scoring_${outcome}`).on(
                            "click",
                            function() {

                                for (var other_outcome of ["i_won", "we_tied", "automa_won_user_scored", "automa_won_user_did_not_score"]) {
            
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
                                            `user_${habitat}_nectar_score`,
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
                                            `user_${habitat}_nectar_score`,
                                            3
                                        );
                                        $("#automa_tracker_body").data(
                                            `automa_${habitat}_nectar_score`,
                                            3
                                        );
                                        break;

                                    case "automa_won_user_scored":

                                        $("#automa_tracker_body").data(
                                            `user_${habitat}_nectar_score`,
                                            2
                                        );
                                        $("#automa_tracker_body").data(
                                            `automa_${habitat}_nectar_score`,
                                            5
                                        );
                                        break;

                                    case "automa_won_user_did_not_score":

                                        $("#automa_tracker_body").data(
                                            `user_${habitat}_nectar_score`,
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

// Set an event listener for performing automa won action by clicking the automa won button (user scored)
$(document).ready(
    function() {
        $("#button_automa_won_user_scored").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("automa_user_scored"); 
            }
        )
    }
)

// Set an event listener for performing automa won action by clicking the automa won button (user did not score)
$(document).ready(
    function() {
        $("#button_automa_won_user_did_not_score").on(
            "click",
            function() {

                $("#modal_end_of_round").modal("hide");
                end_round_cleanup("automa_user_did_not_score"); 
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

                $.getJSON("https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/data/round_end_scoring/round_end_points.json", function(data) {

                    $("#automa_tracker_body").data(
                        "round_end_points",
                        data
                    )
                })

                // Setup for first round
                new_round(1);
                $("#automa_tracker_body").data(
                    "automa_drawn_cards_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_eggs_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_hoard_token_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_forest_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_forest_end_of_round_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_forest_score",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_grassland_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_grassland_end_of_round_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_grassland_score",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_wetland_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_wetland_end_of_round_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_nectar_wetland_score",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_played_birds_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_total_score_counter",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_end_of_round_1_points",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_end_of_round_2_points",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_end_of_round_3_points",
                    0
                );
                $("#automa_tracker_body").data(
                    "automa_end_of_round_4_points",
                    0
                );

                // Show and hide stuff
                if (($("#col_automas_cache_checkbox").is(":checked"))||($("#col_automas_hoard_checkbox").is(":checked"))) {

                    custom_show_column("#col_automa_hoard_tokens_text_div");
                    custom_show_div("#row_hoard_token_buttons");
                }
                else {

                    custom_hide_column("#col_automa_hoard_tokens_text_div");
                    custom_hide_div("#row_hoard_token_buttons");
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

                    custom_show_column("#col_automa_nectar_text_div");
                }
                else {
                    
                    custom_hide_column("#col_automa_nectar_text_div");
                }
                
                custom_hide_div(
                    "#container_game_setup"
                );
                custom_show_div(
                    "#container_automa_gameplay"
                );

                custom_hide_div("#row_debug_mode");

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

                $(`#button_round_${round_number}_end_goal`).css(
                    {
                        "background-color": "transparent",
                        // "outline" : "none",
                        "border" : "none"
                    }
                );
            })

            $(`#modal_round_${round_number}_end_goal_images`).modal("hide");
        }
    );
}

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

    $("#automa_tracker_body").data(
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
                    $("#automa_tracker_body").data("automa_nectar_forest_counter")
                );

                $("#nectar_scoring_grassland_count").text(
                    $("#automa_tracker_body").data("automa_nectar_grassland_end_of_round_counter")
                );

                $("#nectar_scoring_wetland_count").text(
                    $("#automa_tracker_body").data("automa_nectar_wetland_end_of_round_counter")
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

                    $(`#button_round_${round_number}_end_goal`).data(
                        "enable_start_game",
                        0
                    )

                    $(`#button_round_${round_number}_end_goal`).empty();

                    $(`#button_round_${round_number}_end_goal`).text(
                        `Add round ${round_number} end goal`
                    )

                    $(`#col_round_${round_number}_end_cube_count`).empty();

                    $(`#col_round_${round_number}_end_cube_count`).data(
                        "counter",
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

                $("#col_difficulty_radio" ).data(
                    "enable_start_game",
                    0
                )

                $("input:radio[name=automa_starting_nectar]").prop("checked", false);
                $("#row_automa_starting_nectar_radio" ).data(
                    "enable_start_game",
                    0
                )

                $("input:radio[name=automa_hoard_tokens_per_egg]").prop("checked", false);
                $("#row_automa_hoard_tokens_per_egg_radio" ).data(
                    "enable_start_game",
                    0
                )

                $("input:radio[name=automa_points_per_face_down_bird_card]").prop("checked", false);
                $("#row_automa_points_per_face_down_bird_card_radio" ).data(
                    "enable_start_game",
                    0
                )

                start_game_enabler();

                // Show and hide buttons
                custom_show_div(
                    "#container_game_setup"
                );
                custom_hide_div(
                    "#container_automa_gameplay"
                );

                // Empty automa actions tables
                $("#table_automa_actions tbody").empty();

                // Show and hide buttons / modals
                custom_hide_div(
                    "#row_end_round_button"
                );

                custom_hide_div(
                    "#row_proceed_to_game_end_nectar_button"
                );

                custom_hide_div(
                    "#row_proceed_to_game_end_button"
                );

                $(`#modal_end_of_game`).modal("hide");

                reset_automa_score_breakdown_table();
            }
        )
    }
)

// Set an event listener for checking expansion checkboxes on submit
$(document).ready(
    function() {
        $("#google_form").on(
            "submit",
            function() {
                if(document.getElementById("col_base_game_checkbox").checked) {
                    document.getElementById("col_base_game_checkbox_hidden").disabled = true;
                }

                if(document.getElementById("col_european_expansion_checkbox").checked) {
                    document.getElementById("col_european_expansion_checkbox_hidden").disabled = true;
                }

                if(document.getElementById("col_oceania_expansion_checkbox").checked) {
                    document.getElementById("col_oceania_expansion_checkbox_hidden").disabled = true;
                }

                if(document.getElementById("col_asia_checkbox").checked) {
                    document.getElementById("col_asia_checkbox_hidden").disabled = true;
                }
            }
        )
    }
)