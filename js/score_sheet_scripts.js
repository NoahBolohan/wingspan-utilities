function parseNaNOrInt(val) {

    var parsed_int = parseInt(val);

    if (isNaN(parsed_int)) {
      return 0;
    }
    return parsed_int;
}

// Toggle n_players modal
$(document).ready(
    function () {

        $('#modal_n_players').modal('toggle');
    }
);

// Create n_players columns
$(document).ready(
    function() {

        $.each(
            Array.from(Array(6), (e,i)=>i+2),
            function(key,value) {
                $(`#col_button_${value}_players`).on(
                    "click",
                    function() {
                        generate_n_score_columns(value);
                        $(`#modal_n_players`).modal("hide");
                    }
                )
            }
        )
    }
)

function generate_n_score_columns(n_players) {
    for (var i=1; i <= n_players; i++) {

        // Player names
        var cell = $("<th>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_name`
            }
        ).appendTo("#row_player_names");
        
        var div = $("<div>").attr(
            {
                class : "row p-0 justify-content-center margin_auto",
                id : `row_player_${i}_name`
            }
        ).appendTo(cell);

        $("<input>").attr(
            {
                class : "col-12",
                type : "text",
                id : `input_player_${i}_name`,
                name : `player_${i}_name`,
                value : `Player ${i}`
            }
        ).appendTo(div);

        // Birds
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_birds`
            }
        ).appendTo("#row_birds");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_birds`,
                name : `player_${i}_birds`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Bonus cards
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_bonus_cards`
            }
        ).appendTo("#row_bonus_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_bonus_cards`,
                name : `player_${i}_bonus_cards`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // End-of-round goals
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_end-of-round_goals`
            }
        ).appendTo("#row_end-of-round_goals");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_end-of-round_goals`,
                name : `player_${i}_end-of-round_goals`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Eggs
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_eggs`
            }
        ).appendTo("#row_eggs");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_eggs`,
                name : `player_${i}_eggs`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Food on cards
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_food_on_cards`
            }
        ).appendTo("#row_food_on_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_food_on_cards`,
                name : `player_${i}_food_on_cards`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Tucked cards
        var cell = $("<td>").attr(
            {
                class : "col bg-info",
                id : `col_player_${i}_tucked_cards`
            }
        ).appendTo("#row_tucked_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_tucked_cards`,
                name : `player_${i}_tucked_cards`
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Total
        var cell = $("<td>").attr(
            {
                class : "col bg-success",
                id : `col_player_${i}_total`
            }
        ).appendTo("#row_total");
        
        $("<div>").attr(
            {
                type : "number",
                id : `div_player_${i}_total`
            }
        ).appendTo(cell);
    }
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

// Populate certain divs before submitting form
function populate_form_data() {

    // Player 1: final score
    $("#input_player_1_total_score").val(
        $("#cell_player_total_score").text()
    )

    // Player 2: final score
    $("#input_player_2_total_score").val(
        $("#cell_player_total_score").text()
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
}