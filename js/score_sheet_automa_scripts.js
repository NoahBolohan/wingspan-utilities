function parseNaNOrInt(val) {

    var parsed_int = parseInt(val);

    if (isNaN(parsed_int)) {
      return 0;
    }
    return parsed_int;
 }

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
        )
   )
}

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

// Recompute automa total score
function recompute_automa_total_score() {

    $("#cell_automa_final_score").text(

        parseNaNOrInt(
            $("#cell_automa_birds").val()
        ) + parseNaNOrInt(
            $("#cell_automa_end-of-round_goals").val()
        )+ parseNaNOrInt(
            $("#cell_automa_laid_eggs").val()
        ) + parseNaNOrInt(
            $("#cell_automa_tucked_cards").val()
        )
   )
}

// Update automa total score on automa_birds change
$(document).ready(
    function() {

        $("#cell_automa_birds").on(
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

// Populate certain divs before submitting form
function populate_form_data() {

    // Player: final score
    $("#input_player_total_score").val(
        $("#cell_player_total_score").text()
    )

    // Automa: final score
    $("#input_automa_final_score").val(
        $("#cell_automa_final_score").text()
    )
}