function parseNaNOrInt(val) {

    var parsed_int = parseInt(val);

    if (isNaN(parsed_int)) {
      return 0;
    }
    return parsed_int;
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

// Show nectar row
$(document).ready(

    function () {

        $("#col_oceania_expansion_checkbox").change(
            function () {
                if ($("#col_oceania_expansion_checkbox").is(":checked")) {

                    $("#row_nectar").css(
                        "visibility",
                        "visible"
                    );

                    $(`#input_player_nectar`).prop(
                        "required",
                        true
                    );

                    $(`#input_automa_nectar`).prop(
                        "required",
                        true
                    );
                } 
                else {

                    $("#row_nectar").css(
                        "visibility",
                        "collapse"
                    );

                    $(`#input_player_nectar`).prop(
                        "required",
                        false
                    );

                    $(`#input_automa_nectar`).prop(
                        "required",
                        false
                    );

                    $("#cell_player_nectar").val("");
                    $("#cell_automa_nectar").val("");

                    recompute_player_total_score();
                    recompute_automa_total_score();
                }
            }
        )
    }
)

// Show duet token row
$(document).ready(

    function () {

        $("#col_automasian_alliance_checkbox").change(
            function () {
                if ($("#col_automasian_alliance_checkbox").is(":checked")) {

                    $("#row_duet_tokens").css(
                        "visibility",
                        "visible"
                    );

                    $(`#input_player_duet_tokens`).prop(
                        "required",
                        true
                    );

                    $(`#input_automa_duet_tokens`).prop(
                        "required",
                        true
                    );
                } 
                else {

                    $("#row_duet_tokens").css(
                        "visibility",
                        "collapse"
                    );

                    $(`#input_player_duet_tokens`).prop(
                        "required",
                        false
                    );

                    $(`#input_automa_duet_tokens`).prop(
                        "required",
                        false
                    );

                    $("#cell_player_duet_tokens").val("");
                    $("#cell_automa_duet_tokens").val("");
                    
                    recompute_player_total_score();
                    recompute_automa_total_score();
                }
            }
        )
    }
)

// Recompute player total score
function recompute_player_total_score() {

    $("#cell_player_total_score").text(

        parseNaNOrInt(
            $("#cell_player_birds").val()
        ) + parseNaNOrInt(
            $("#cell_player_bonus_cards").val()
        ) + parseNaNOrInt(
            $("#cell_player_end-of-round_goals").val()
        )+ parseNaNOrInt(
            $("#cell_player_eggs").val()
        ) + parseNaNOrInt(
            $("#cell_player_food_on_cards").val()
        ) + parseNaNOrInt(
            $("#cell_player_tucked_cards").val()
        ) + parseNaNOrInt(
            $("#cell_player_nectar").val()
        ) + parseNaNOrInt(
            $("#cell_player_duet_tokens").val()
        )
   )
}

function prepopulate_data()
    {
        var data_dict = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            data_dict[hash[0]] = hash[1];
        }

        var checkboxes = [
            "col_base_game_checkbox",
            "col_european_expansion_checkbox",
            "col_oceania_expansion_checkbox",
            "col_asia_checkbox",
            "col_automubon_society_checkbox",
            "col_RAOUtoma_checkbox",
            "col_automasian_alliance_checkbox"
        ]

        var radios = [
            "col_difficulty_radio"
        ]

        var inputs = [
            "cell_automa_n_drawn_cards",
            "cell_automa_played_birds",
            "cell_automa_end-of-round_goals",
            "cell_automa_laid_eggs",
            "cell_automa_total_score"
        ]

        $.each(
            checkboxes,
            function(idx, v) {               
                $(`#${v}`).prop(
                    "checked",
                    data_dict[v] == "true"
                )
            }
        );

        $.each(
            radios,
            function(idx, v) {                    
                $(`input:radio[value=${data_dict[v]}]`).prop("checked", true);
            }
        );

        $.each(
            inputs,
            function(idx, v) {
                $(`#${v}`).val(
                    data_dict[v]
                )
            }
        );
    }

$(document).ready(
    function () {
        if(window.location.href.includes("html?")) {
            prepopulate_data();
            recompute_automa_total_score();
        }
    }
)

// Update player total score on player_birds change
$(document).ready(
    function() {

        $("#cell_player_birds").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on bonus_cards change
$(document).ready(
    function() {

        $("#cell_player_bonus_cards").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on end-of-round_goals change
$(document).ready(
    function() {

        $("#cell_player_end-of-round_goals").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on eggs change
$(document).ready(
    function() {

        $("#cell_player_eggs").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on food_on_cards change
$(document).ready(
    function() {

        $("#cell_player_food_on_cards").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on tucked_cards change
$(document).ready(
    function() {

        $("#cell_player_tucked_cards").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on nectar change
$(document).ready(
    function() {

        $("#cell_player_nectar").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Update player total score on duet_tokens change
$(document).ready(
    function() {

        $("#cell_player_duet_tokens").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Recompute automa total score
function recompute_automa_total_score() {

    var face_down_card_multiplier = 0;

    switch($("input[name='difficulty']:checked").val()) {

        case "eaglet":
            face_down_card_multiplier = 3;
            break;
        case "eagle":
            face_down_card_multiplier = 4;
            break;
        case "eagle-eyed_eagle":
            face_down_card_multiplier = 5;
            break;
    };

    $("#cell_automa_drawn_cards").text(
        face_down_card_multiplier * parseNaNOrInt(
            $("#cell_automa_n_drawn_cards").val()
        )
   );

    $("#cell_automa_total_score").text(

        face_down_card_multiplier * parseNaNOrInt(
            $("#cell_automa_n_drawn_cards").val()
        ) + parseNaNOrInt(
            $("#cell_automa_played_birds").val()
        ) + parseNaNOrInt(
            $("#cell_automa_end-of-round_goals").val()
        )+ parseNaNOrInt(
            $("#cell_automa_laid_eggs").val()
        ) + parseNaNOrInt(
            $("#cell_automa_tucked_cards").val()
        ) + parseNaNOrInt(
            $("#cell_automa_nectar").val()
        ) + parseNaNOrInt(
            $("#cell_automa_duet_tokens").val()
        )
   );
}

// Update automa total score on automa difficulty changes
$(document).ready(
    function() {

        $("#radio_difficulty_choice_eaglet").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

$(document).ready(
    function() {

        $("#radio_difficulty_choice_eagle").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

$(document).ready(
    function() {

        $("#radio_difficulty_choice_eagle-eyed_eagle").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on automa_n_drawn_cards change
$(document).ready(
    function() {

        $("#cell_automa_n_drawn_cards").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on automa_birds change
$(document).ready(
    function() {

        $("#cell_automa_played_birds").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on end-of-round_goals change
$(document).ready(
    function() {

        $("#cell_automa_end-of-round_goals").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on eggs change
$(document).ready(
    function() {

        $("#cell_automa_laid_eggs").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on tucked_cards change
$(document).ready(
    function() {

        $("#cell_automa_tucked_cards").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on nectar change
$(document).ready(
    function() {

        $("#cell_automa_nectar").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Update automa total score on tucked_cards change
$(document).ready(
    function() {

        $("#cell_automa_duet_tokens").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Populate certain divs before submitting form
function populate_form_data() {

    // Automa: drawn cards
    $("#input_automa_drawn_cards").val(
        $("#cell_automa_drawn_cards").text()
    )

    // Player: nectar
    if ($(`#cell_player_nectar`).val() == "") {
        $(`#cell_player_nectar`).val(0);
    }

    // Player: duet tokens
    if ($(`#cell_player_duet_tokens`).val() == "") {
        $(`#cell_player_duet_tokens`).val(0);
    }

    // Player: total score
    $("#input_player_total_score").val(
        $("#cell_player_total_score").text()
    )

    // Automa: nectar
    if ($(`#cell_automa_nectar`).val() == "") {
        $(`#cell_automa_nectar`).val(0);
    }

    // Automa: duet tokens
    if ($(`#cell_automa_duet_tokens`).val() == "") {
        $(`#cell_automa_duet_tokens`).val(0);
    }

    // Automa: total score
    $("#input_automa_total_score").val(
        $("#cell_automa_total_score").text()
    )

    // Expansion checkboxes
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

    // Extra card checkboxes
    if(document.getElementById("col_automubon_society_checkbox").checked) {
        document.getElementById("col_automubon_society_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_RAOUtoma_checkbox").checked) {
        document.getElementById("col_RAOUtoma_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_automasian_alliance_checkbox").checked) {
        document.getElementById("col_automasian_alliance_checkbox_hidden").disabled = true;
    }
}

$(document).ready(

    function() {
        $("#button_reset_sheet").on(
            "click",
            function () {
                
                // Checkboxes
                $("#col_base_game_checkbox").prop("checked",false);
                $("#col_european_expansion_checkbox").prop("checked",false);
                $("#col_oceania_expansion_checkbox").prop("checked",false).trigger("change");
                $("#col_asia_checkbox").prop("checked",false);
                $("#col_automubon_society_checkbox").prop("checked",false);
                $("#col_RAOUtoma_checkbox").prop("checked",false);
                $("#col_automasian_alliance_checkbox").prop("checked",false).trigger("change");

                // Empty player cells
                $("#cell_player_birds").val("");
                $("#cell_player_bonus_cards").val("");
                $("#cell_player_end-of-round_goals").val("");
                $("#cell_player_eggs").val("");
                $("#cell_player_food_on_cards").val("");
                $("#cell_player_tucked_cards").val("");
                $("#cell_player_nectar").val("");
                $("#cell_player_duet_tokens").val("");
                $("#cell_player_total_score").text("");

                // Empty automa cells
                $("input[name='difficulty']").prop("checked",false);
                $("#cell_automa_n_drawn_cards").val("");
                $("#cell_automa_played_birds").val("");
                $("#cell_automa_end-of-round_goals").val("");
                $("#cell_automa_laid_eggs").val("");
                $("#cell_automa_tucked_cards").val("");
                $("#cell_automa_nectar").val("");
                $("#cell_automa_duet_tokens").val("");
                $("#cell_automa_total_score").text("");
            }
        )
    }
)