function parseNaNOrInt(val) {

    var parsed_int = parseInt(val);

    if (isNaN(parsed_int)) {
      return 0;
    }
    return parsed_int;
}

// Manual .active class flag (https://stackoverflow.com/questions/25016848/bootstrap-putting-checkbox-in-a-dropdown)
$(document).ready(

    function () {

        $(".checkbox-menu").on(
            "change",
            "input[type='checkbox']",
            function() {
                $(this).closest("li").toggleClass("active", this.checked);
            }
        );
    }
)

$(document).on(
    "click",
    ".allow-focus",
    function (e) {
        e.stopPropagation();
    }
);

$(document).ready(

    function() {

        var expansion_names = {
            "base":"--base-color",
            "european_expansion":"--european-expansion-color",
            "oceania_expansion":"--oceania_expansion-color",
            "asia":"--asia-color",
            "duet_mode":"--asia-color",
            "americas_expansion":"--americas-expansion-color",
            "birds_of_canada":"--birds-of-canada-color",
            "birds_of_new_zealand":"--birds-of-new-zealand-color",
            "birds_of_the_usa":"--birds-of-the-usa-color",
            "british_birds":"--british-birds-color",
            "birds_of_continental_europe":"--birds-of-continental-europe-color",
            "additional_asian_avians":"--additional-asian-avians-color"
        };

        var expansion_codes = {
            "base":"B",
            "european_expansion":"EE",
            "oceania_expansion":"OE",
            "asia":"A",
            "duet_mode":"DM",
            "americas_expansion":"AE",
            "birds_of_canada":"CA",
            "birds_of_new_zealand":"NZ",
            "birds_of_the_usa":"US",
            "british_birds":"BB",
            "birds_of_continental_europe":"CE",
            "additional_asian_avians":"AA"
        };

        for(
            var key in expansion_names
        ) {
            $(`#toggle_${key}`).change(
                function() {

                    $("#cell_chosen_expansions").empty();

                    for(
                        var key_2 in expansion_names
                    ) {

                        if (
                            $(`#toggle_${key_2}`).is(":checked")
                        ) {

                            $("<div>").attr(
                                {
                                    style: `width:6vw;height:6vw;object-fit:cover;border:1px solid rgba(var(--font-color-headers));background-color:rgba(var(${expansion_names[key_2]}));text-align:center;align-items: center;`
                                }
                            ).text(
                                expansion_codes[key_2]
                            ).appendTo("#cell_chosen_expansions");
                        }
                    }
                }
            )
        }
    }
)

// Show nectar row
$(document).ready(

    function () {

        $("#toggle_oceania_expansion").change(
            function () {
                if ($("#toggle_oceania_expansion").is(":checked")) {

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

        $("#toggle_duet_mode").change(
            function () {
                if ($("#toggle_duet_mode").is(":checked")) {

                    $("#rowspan-vertical-1-pt-each").attr(
                        {
                            rowspan:4
                        }
                    );

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

                    $("#rowspan-vertical-1-pt-each").attr(
                        {
                            rowspan:3
                        }
                    );

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

// Show hummingbird track
$(document).ready(

    function () {

        $("#toggle_americas_expansion").change(
            function () {
                if ($("#toggle_americas_expansion").is(":checked")) {

                    $("#row_hummingbird_track").css(
                        "visibility",
                        "visible"
                    );

                    $(`#input_player_hummingbird_track`).prop(
                        "required",
                        true
                    );

                    $(`#input_automa_hummingbird_track`).prop(
                        "required",
                        true
                    );
                }
                else {

                    $("#row_hummingbird_track").css(
                        "visibility",
                        "collapse"
                    );

                    $(`#input_player_hummingbird_track`).prop(
                        "required",
                        false
                    );

                    $(`#input_automa_hummingbird_track`).prop(
                        "required",
                        false
                    );

                    $("#cell_player_hummingbird_track").val("");
                    $("#cell_automa_hummingbird_track").val("");

                    recompute_player_total_score();
                    recompute_automa_total_score();
                }
            }
        )
    }
)

$(document).ready(

    function() {
        $("#toggle_oceania_expansion").trigger("change");
        $("#toggle_duet_mode").trigger("change");
        $("#toggle_americas_expansion").trigger("change");
    }
)


// Recompute player total score
function recompute_player_total_score() {

    var total_score =  parseNaNOrInt(
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
    ) + parseNaNOrInt(
        $("#cell_player_hummingbird_track").val()
    );

    if (total_score > 0) {

        $("#cell_player_total_score").text(
            total_score
        )
    }
    else {
        $("#cell_player_total_score").text(
            ""
        )
    }
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
            "toggle_base_game",
            "toggle_european_expansion",
            "toggle_oceania_expansion",
            "toggle_asia",
            "toggle_duet_mode",
            "toggle_americas_expansion",
            "toggle_birds_of_canada",
            "toggle_birds_of_new_zealand",
            "toggle_birds_of_the_usa",
            "toggle_british_birds",
            "toggle_birds_of_continental_europe",
            "toggle_additional_asian_avians",
            "col_automubon_society_checkbox",
            "col_RAOUtoma_checkbox",
            "col_automasian_alliance_checkbox"
        ]

        var radios = [
            "col_automa_points_per_face_down_bird_card_radio"
        ]

        var inputs = [
            "cell_player_birds",
            "cell_player_bonus_cards",
            "cell_player_end-of-round_goals",
            "cell_player_eggs",
            "cell_player_food_on_cards",
            "cell_player_tucked_cards",
            "cell_player_duet_tokens",
            "cell_player_nectar",
            "cell_automa_n_drawn_cards",
            "cell_automa_played_birds",
            "cell_automa_end-of-round_goals",
            "cell_automa_laid_eggs",
            "cell_automa_duet_tokens",
            "cell_automa_nectar",
            "cell_automa_total_score"
        ]

        $.each(
            checkboxes,
            function(idx, v) {
                
                if (data_dict[v] == "true") {
                    $(`#${v}`).prop(
                        "checked",
                        true
                    ).trigger("change");
                }
                else {
                    $(`#${v}`).prop(
                        "checked",
                        false
                    );
                }
                
            }
        );

        $.each(
            radios,
            function(idx, v) {              
                $(`input[name=${v}]:radio[value=${data_dict[v]}]`).prop("checked", true);
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
            recompute_player_total_score();
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

// Update player total score on hummingbird_track change
$(document).ready(
    function() {

        $("#cell_player_hummingbird_track").on(
            "change",
            function() {
                recompute_player_total_score()
            }
        )
    }
)

// Recompute automa total score
function recompute_automa_total_score() {

    var face_down_card_multiplier = parseInt(
        $("input[name='col_automa_points_per_face_down_bird_card_radio']:checked").val()
    );
    
    $("#cell_automa_drawn_cards").text(
        face_down_card_multiplier * parseNaNOrInt(
            $("#cell_automa_n_drawn_cards").val()
        )
   );

   var total_score = face_down_card_multiplier * parseNaNOrInt(
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
    ) + parseNaNOrInt(
        $("#cell_automa_hummingbird_track").val()
    );
    
    if (total_score > 0) {

        $("#cell_automa_total_score").text(
            total_score
        )
    }
    else {
        $("#cell_automa_total_score").text(
            ""
        )
    }
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

// Update automa total score on hummingbird_track change
$(document).ready(
    function() {

        $("#cell_automa_hummingbird_track").on(
            "change",
            function() {
                recompute_automa_total_score()
            }
        )
    }
)

// Populate certain divs before submitting form
function populate_form_data() {

    // Automa: difficulty
    switch(
        $("input[name='col_automa_points_per_face_down_bird_card_radio']:checked").val()
    ) {
        case "3":
            $("#submit_automa_difficulty").val(
                "eaglet"
            );

            $("#submit_automa_points_per_face_down_bird_card").val(
                3
            );

            break;

        case "4":
            $("#submit_automa_difficulty").val(
                "eagle"
            );

            $("#submit_automa_points_per_face_down_bird_card").val(
                4
            );
            
            break;

        case "5":
            $("#submit_automa_difficulty").val(
                "eagle-eyed eagle"
            );

            $("#submit_automa_points_per_face_down_bird_card").val(
                5
            );
            
            break;

    }

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
    $.each(
        [
            "base",
            "european_expansion",
            "oceania_expansion",
            "asia",
            "duet_mode",
            "americas_expansion",
            "birds_of_canada",
            "birds_of_new_zealand",
            "birds_of_the_usa",
            "british_birds",
            "birds_of_continental_europe",
            "additional_asian_avians"
        ],
        function(idx,v) {
            if(document.getElementById(`toggle_${v}`).checked) {
                document.getElementById(`toggle_${v}_hidden`).disabled = true;
            }
        }
    )

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

                // Expansions
                // $("#toggle_base").prop("checked",true);
                // $("#toggle_european_expansion").prop("checked",false);
                // $("#toggle_oceania_expansion").prop("checked",false).trigger("change");
                // $("#toggle_asia").prop("checked",false);
                // $("#toggle_duet_mode").prop("checked",false);
                // $("#toggle_americas_expansion").prop("checked",false);
                // $("#toggle_birds_of_canada").prop("checked",false);
                // $("#toggle_birds_of_new_zealand").prop("checked",false);
                // $("#toggle_birds_of_the_usa").prop("checked",false);
                // $("#toggle_british_birds").prop("checked",false);
                // $("#toggle_birds_of_continental_europe").prop("checked",false);
                // $("#toggle_additional_asian_avians").prop("checked",false);

                // Extra cards
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
                $("#cell_automa_tucked_cards").val("");
                $("#cell_automa_laid_eggs").val("");
                $("#cell_automa_nectar").val("");
                $("#cell_automa_duet_tokens").val("");
                $("#cell_automa_total_score").text("");
            }
        )
    }
)