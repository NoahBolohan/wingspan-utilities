

// Check if start game button should be enabled
function start_game_enabler() {

    var attributes_to_check = [
        "enable_start_game_round_1_end_goal",
		"enable_start_game_round_2_end_goal",
		"enable_start_game_round_3_end_goal",
		"enable_start_game_round_4_end_goal",
		"enable_start_game_difficulty",
		"enable_start_game_hoard_tokens",
		"enable_start_game_points_per_drawn_card",
		"enable_start_game_nectar",
    ]
    
    var enable_button_checker = 1;

    for (var i=0; i < attributes_to_check.length; i++) {
        enable_button_checker *= $("#automa_tracker_body").data(
            attributes_to_check[i]
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

                $("#automa_tracker_body").data(
                    "enable_start_game_difficulty",
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
                $("#automa_tracker_body").data(
                    "enable_start_game_nectar",
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
                $("#automa_tracker_body").data(
                    "enable_start_game_hoard_tokens",
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
                $("#automa_tracker_body").data(
                    "enable_start_game_points_per_drawn_card",
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

                    $("#automa_tracker_body").data(
                        "enable_start_game_hoard_tokens",
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

                    $("#automa_tracker_body").data(
                        "enable_start_game_hoard_tokens",
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

                    $("#automa_tracker_body").data(
                        "enable_start_game_hoard_tokens",
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

                    $("#automa_tracker_body").data(
                        "enable_start_game_hoard_tokens",
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
function update_round_end_goal_image(
    round_number,
    round_end_goal,
    round_end_goal_backside,
    round_end_goal_base_values
) {
    var old_round_end_goal = "";
    var old_round_end_goal_backside = "";

    if ($("#automa_tracker_body").data(`round_${round_number}_end_goal`)) {
        old_round_end_goal = $("#automa_tracker_body").data(`round_${round_number}_end_goal`);
    }

    if ($("#automa_tracker_body").data(`round_${round_number}_end_goal_backside`)) {
        old_round_end_goal_backside = $("#automa_tracker_body").data(`round_${round_number}_end_goal_backside`);
    }

    $("#automa_tracker_body").data(
        `round_${round_number}_end_goal`,
        round_end_goal
    );

    $("#automa_tracker_body").data(
        `round_${round_number}_end_goal_backside`,
        round_end_goal_backside
    );

    // Assign round end automa base values to the round end column
    $("#automa_tracker_body").data(
        `automa_round_${round_number}_base_value`,
        round_end_goal_base_values[round_number - 1]
    );

    // Store that round end goal is chosen
    $("#automa_tracker_body").data(
        `enable_start_game_round_${round_number}_end_goal`,
        1
    );

    // Assign the round end goal image to the button as well as the automa gameplay page
    var new_url = encodeURI("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/master/static/round_end_goals/" + round_end_goal + ".jpg");

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

    round_end_goal_button_abler(
        round_end_goal,
        round_end_goal_backside,
        old_round_end_goal,
        old_round_end_goal_backside
    );

    // Check whether to enable start game button
    start_game_enabler();
}

function round_end_goal_button_abler(
    round_end_goal,
    round_end_goal_backside,
    old_round_end_goal = "",
    old_round_end_goal_backside = ""
) {

    for (var round_number of [1,2,3,4]) {

        // Disable the round N end goal for all other rounds
        $(`#button_round_${round_number}_${round_end_goal}`).prop(
            "disabled",
            true
        );

        // Enable the round N end goal for all other rounds
        if (old_round_end_goal != "") {
            
            $(`#button_round_${round_number}_${old_round_end_goal}`).prop(
                "disabled",
                false
            );
        }

        // Disable the round N end goal backside for all other rounds
        $(
            `#button_round_${round_number}_${round_end_goal_backside}`
        ).prop(
            "disabled",
            true
        );

        // Enable the round N end goal backside for all other rounds
        if (old_round_end_goal_backside != "") {
            
            $(`#button_round_${round_number}_${old_round_end_goal_backside}`).prop(
                "disabled",
                false
            );
        }
    }
}

// Generate round end choice buttons for each appropriate round end goal
function generate_round_end_goal_button_for_round(
    round_number,
    round_end_goal,
    round_end_goal_backside,
    expansion
) {

    var new_url = encodeURI(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/master/static/round_end_goals/${round_end_goal}.jpg`);

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

            $.getJSON(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/round_end_scoring/${expansion}.json`, function(data) {

                update_round_end_goal_image(
                    round_number,
                    round_end_goal,
                    round_end_goal_backside,
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

// Generate round end goal choice buttons options
function generate_round_end_goal_buttons_for_expansions(expansions_to_include) {

    for (var round_number=1; round_number<=4; round_number++) {
        $(`#row_modal_round_${round_number}_end_buttons`).empty();
    }

    $.each(
        expansions_to_include,
        function(idx,expansion) {

            $.getJSON(`https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/round_end_goals/${expansion}.json`, function(data) {

                Object.keys(data).forEach(
                    function (key) {
                        for (var round_number=1; round_number<=4; round_number++) {
                            generate_round_end_goal_button_for_round(
                                round_number,
                                data[key]["side_1"],
                                data[key]["side_2"],
                                expansion
                            );

                            generate_round_end_goal_button_for_round(
                                round_number,
                                data[key]["side_2"],
                                data[key]["side_1"],
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