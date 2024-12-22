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

                        var width_p = 34;

                        $("#row_score_sheet").data(
                            "n_players",
                            value
                        );
                        generate_row_headers(width_p);
                        generate_n_score_columns(value, (100-width_p)/value);
                        $(`#modal_n_players`).modal("hide");
                    }
                );
            }
        )
    }
)

function generate_row_headers(width_p) {

    // Player names
     $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%;`
        }
    ).appendTo("#row_player_names");

    // Birds
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Birds"
    ).appendTo("#row_birds");

    // Bonus cards
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Bonus cards"
    ).appendTo("#row_bonus_cards");

    // End-of-round goals
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "End-of-round goals"
    ).appendTo("#row_end-of-round_goals");

    // Eggs
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Eggs"
    ).appendTo("#row_eggs");

    // Food on cards
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Food on cards"
    ).appendTo("#row_food_on_cards");

    // Tucked cards
    $("<th>").attr(
        {
            class : "bg-info",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Tucked cards"
    ).appendTo("#row_tucked_cards");

    // Total
    $("<th>").attr(
        {
            class : "bg-success",
            style : `width:${width_p}%`,
            scope : "row"
        }
    ).text(
        "Total"
    ).appendTo("#row_total");
}

function generate_n_score_columns(n_players, width_p) {
    for (var i=1; i <= n_players; i++) {

        // Player names
        var cell = $("<th>").attr(
            {
                class : "bg-info",
                id : `player_${i}_name`,
                style : `width:${width_p}%`
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
                class : "col-12 input-vertical",
                type : "text",
                id : `input_player_${i}_name`,
                name : `player_${i}_name`,
                placeholder : `Player ${i}`,
                style : "height:80px;"
            }
        ).appendTo(div);

        // Birds
        var cell = $("<td>").attr(
            {
                class : "bg-info",
                id : `col_player_${i}_birds`,
                style : `width:${width_p}%`
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
                class : "bg-info",
                id : `col_player_${i}_bonus_cards`,
                style : `width:${width_p}%`
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
                class : "bg-info",
                id : `col_player_${i}_end-of-round_goals`,
                style : `width:${width_p}%`
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
                class : "bg-info",
                id : `col_player_${i}_eggs`,
                style : `width:${width_p}%`
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
                class : "bg-info",
                id : `col_player_${i}_food_on_cards`,
                style : `width:${width_p}%`
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
                class : "bg-info",
                id : `col_player_${i}_tucked_cards`,
                style : `width:${width_p}%`
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
                class : "bg-success",
                id : `col_player_${i}_total_score`,
                style : `width:${width_p}%`
            }
        ).appendTo("#row_total");
        
        $("<div>").attr(
            {
                type : "number",
                id : `div_player_${i}_total_score`
            }
        ).appendTo(cell);

        // Total to submit
        $("<input>").attr(
            {
                type : "number",
                id : `submit_player_${i}_total_score`,
                name : `player_${i}_total_score`
            }
        ).appendTo($("#total_scores_to_submit"));

        assign_player_event_listeners(i);
    }
}

// Recompute player total score
function recompute_player_total_score(i) {

    $(`#div_player_${i}_total_score`).text(

        parseNaNOrInt(
            $(`#input_player_${i}_birds`).val()
        ) + parseNaNOrInt(
            $(`#input_player_${i}_bonus_cards`).val()
        ) + parseNaNOrInt(
            $(`#input_player_${i}_end-of-round_goals`).val()
        )+ parseNaNOrInt(
            $(`#input_player_${i}_eggs`).val()
        ) + parseNaNOrInt(
            $(`#input_player_${i}_food_on_cards`).val()
        ) + parseNaNOrInt(
            $(`#input_player_${i}_tucked_cards`).val()
        )
   )
}

function assign_player_event_listeners(i) {

    // Update player total score on player_birds change
    $(`#input_player_${i}_birds`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )

    // Update player total score on bonus_cards change
    $(`#input_player_${i}_bonus_cards`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )

    // Update player total score on end-of-round_goals change
    $(`#input_player_${i}_end-of-round_goals`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )

    // Update player total score on eggs change
    $(`#input_player_${i}_eggs`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )

    // Update player total score on food_on_cards change
    $(`#input_player_${i}_food_on_cards`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )

    // Update player total score on tucked_cards change
    $(`#input_player_${i}_tucked_cards`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )
}

$(document).ready(

    function() {

        $("#button_reset_sheet").on(
            "click",
            function () {
                
                // Checkboxes
                $("#col_base_game_checkbox").prop("checked",false);
                $("#col_european_expansion_checkbox").prop("checked",false);
                $("#col_oceania_expansion_checkbox").prop("checked",false);
                $("#col_asia_checkbox").prop("checked",false);
            }
        )
    }
)

function reset_inputs_for_all_players() {

    for (var i=1; i <= $("#row_score_sheet").data("n_players"); i++) {

        $(`#input_player_${i}_name`).val(`Player ${i}`);
        $(`#input_player_${i}_birds`).val("");
        $(`#input_player_${i}_bonus_cards`).val("");
        $(`#input_player_${i}_end-of-round_goals`).val("");
        $(`#input_player_${i}_eggs`).val("");
        $(`#input_player_${i}_food_on_cards`).val("");
        $(`#input_player_${i}_tucked_cards`).val("");
        $(`#div_player_${i}_total_score`).text("");
    }
}

$(document).ready(

    function () {
        $("#button_reset_sheet").on(
            "click",
            function () {
                reset_inputs_for_all_players()
            }
        )
    }
)

// Populate certain divs before submitting form
function populate_form_data() {

    // Player names
    for (var i=1; i <= $("#row_score_sheet").data("n_players"); i++) {
         if ($(`#input_player_${i}_name`).val() == "") {
            $(`#input_player_${i}_name`).val(`Player ${i}`);
         }
    }

    // Player total scores
    for (var i=1; i <= $("#row_score_sheet").data("n_players"); i++) {
        $(`#submit_player_${i}_total_score`).val(
            $(`#div_player_${i}_total_score`).text()
        )
    }

    // Number of players
    $("#submit_n_players").val(
        $("#row_score_sheet").data("n_players")
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