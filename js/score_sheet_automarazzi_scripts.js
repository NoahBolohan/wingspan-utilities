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

// Custom show div
function show_height_hidden(div_id) {
    $(div_id).css(
        "visibility",
        "visible"
    );
    $(div_id).css(
        "max-height",
        "100%"
    );
}

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

$(document).ready(

    function() {
        $("#col_oceania_expansion_checkbox").trigger("change");
        $("#col_automasian_alliance_checkbox").trigger("change");
    }
)

// Create n_players columns
$(document).ready(
    function() {

        $.each(
            Array.from(Array(6), (e,i)=>i+2),
            function(key,value) {
                $(`#col_button_${value}_players`).on(
                    "click",
                    function() {

                        var width_p = 28;

                        var width_player_col = (100-width_p)/(value + 1);

                        $("#row_score_sheet").data(
                            "n_players",
                            value
                        );
                        reset_score_sheet();
                        generate_row_headers(value, width_p, width_player_col);
                        generate_n_score_columns(value, width_player_col);
                        $(`#modal_n_players`).modal("hide");
                        $("#col_oceania_expansion_checkbox").trigger("change");
                        show_height_hidden("#row_score_sheet");
                    }
                );
            }
        )
    }
)

function reset_score_sheet() {

    $("#score_sheet_colgroup").empty();
    $("#score_sheet_thead").empty();
    $("#score_sheet_tbody").empty();
}

function generate_row_headers(n_players, width_p, width_player_col) {

    $("<col>").attr(
        {
            style : "width: 10%;"
        }
    ).appendTo("#score_sheet_colgroup");

    $("<col>").attr(
        {
            style : `width:${width_p}%;`
        }
    ).appendTo("#score_sheet_colgroup")

    for (var i=1; i <= n_players; i++) {
        $("<col>").attr(
            {
                style : `width:${width_player_col}%;`
            }
        ).appendTo("#score_sheet_colgroup")
    }

    // Score sheet HTML thead
    $("<tr>").attr(
        {
            style : "height:11vh;",
            id : "row_player_names"
        }
    ).appendTo("#score_sheet_thead");

    // Score sheet HTML tbody
    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_birds"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_bonus_cards"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_end-of-round_goals"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_eggs"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_food_on_cards"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_tucked_cards"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "visibility:collapse;height:5vh;",
            id : "row_nectar"
        }
    ).appendTo("#score_sheet_tbody");

    $("<tr>").attr(
        {
            style : "height:5vh;",
            id : "row_total"
        }
    ).appendTo("#score_sheet_tbody");

    // Player names + change n players button
    var cell = $("<td>").attr(
        {
            style : `width:${width_p + 10}%; border-left: 0px; vertical-align: middle; text-align: center;`,
            colspan : "2",
            class : "cell-info"
        }
    )

    cell.appendTo("#row_player_names");

    $("#button_change_n_players").on(
        "click",
        function () {
            $(`#modal_n_players`).modal("show");
        }
    )

    // Vertical text: Amount on cards
    var cell_vert_amount_on_cards = $("<td>").attr(
        {
            class : "cell-vertical",
            rowspan : "3"
        }
    )

    $("<div>").attr(
        {
            class:"rowspan-vertical"
        }  
    ).text(
        "Amount on cards"
    ).appendTo(cell_vert_amount_on_cards);
    
    
    cell_vert_amount_on_cards.appendTo("#row_birds");

    // Birds
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Birds"
    ).appendTo("#row_birds");

    // Bonus cards
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Bonus cards"
    ).appendTo("#row_bonus_cards");

    // End-of-round goals
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "End-of-round goals"
    ).appendTo("#row_end-of-round_goals");

    // Vertical text: 1 point each
    var cell_vert_1_point_each = $("<td>").attr(
        {
            class : "cell-vertical",
            rowspan : "3",
            id : "rowspan-vertical-1-pt-each"
        }
    )

    $("<div>").attr(
        {
            class:"rowspan-vertical"
        }  
    ).text(
        "1 point each"
    ).appendTo(cell_vert_1_point_each);
    
    
    cell_vert_1_point_each.appendTo("#row_eggs");

    // Eggs
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Eggs"
    ).appendTo("#row_eggs");

    // Food on cards
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Food on cards"
    ).appendTo("#row_food_on_cards");

    // Tucked cards
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Tucked cards"
    ).appendTo("#row_tucked_cards");

    // Vertical text: 5/2
    var cell_vert_52 = $("<td>").attr(
        {
            class : "cell-vertical",
            rowspan : "1"
        }
    )

    $("<div>").attr(
        {
            class:"rowspan-vertical"
        }  
    ).text(
        "5/2"
    ).appendTo(cell_vert_52);
    
    
    cell_vert_52.appendTo("#row_nectar");

    // Nectar
    $("<th>").attr(
        {
            style : `width:${width_p}%`,
            scope : "row",
            class : "cell-info score_sheet_cell_no_padding"
        }
    ).text(
        "Nectar"
    ).appendTo("#row_nectar");

    // Total
    $("<th>").attr(
        {
            colspan : "2",
            class : "cell-total score_sheet_cell_no_padding"
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
                id : `player_${i}_name`,
                style : `width:${width_p}%`,
                class : "cell-info"
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
                class : "bg-white col-12 input-vertical",
                type : "text",
                id : `input_player_${i}_name`,
                name : `player_${i}_name`,
                placeholder : `Player ${i}`,
                style : "height:9vh;"
            }
        ).appendTo(div);

        // Birds
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_birds`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_birds");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_birds`,
                name : `player_${i}_birds`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Bonus cards
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_bonus_cards`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_bonus_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_bonus_cards`,
                name : `player_${i}_bonus_cards`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // End-of-round goals
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_end-of-round_goals`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_end-of-round_goals");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_end-of-round_goals`,
                name : `player_${i}_end-of-round_goals`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Eggs
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_eggs`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_eggs");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_eggs`,
                name : `player_${i}_eggs`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Food on cards
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_food_on_cards`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_food_on_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_food_on_cards`,
                name : `player_${i}_food_on_cards`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Tucked cards
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_tucked_cards`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_tucked_cards");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_tucked_cards`,
                name : `player_${i}_tucked_cards`,
                class : "bg-white"
            }
        ).prop(
            "required",
            true
        ).appendTo(cell);

        // Nectar
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_nectar`,
                style : `width:${width_p}%`,
                class : "cell-input"
            }
        ).appendTo("#row_nectar");
        
        $("<input>").attr(
            {
                type : "number",
                id : `input_player_${i}_nectar`,
                name : `player_${i}_nectar`,
                class : "bg-white"
            }
        ).appendTo(cell);

        // Total
        var cell = $("<td>").attr(
            {
                id : `col_player_${i}_total_score`, 
                style : `width:${width_p}%`,
                class : "cell-total score_sheet_cell_no_padding"
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

    // Automarazzi column
    var cell = $("<th>").attr(
        {
            id : `player_${i}_name`,
            style : `width:${width_p}%`,
            class : "cell-info"
        }
    ).appendTo("#row_player_names");
    
    var div = $("<div>").attr(
        {
            class : "row p-0 justify-content-center margin_auto",
            id : `row_player_${i}_name`
        }
    ).appendTo(cell);

    $("<span>").attr(
        {
            class : "col-12 input-vertical",
            type : "text",
            style : "height:9vh;"
        }
    ).text(
        "Automa"
    ).appendTo(div);

    // Birds
    
    var cell = $("<td>").attr(
        {
            id : `col_player_${i}_birds`,
            style : `width:${width_p}%`,
            class : "cell-input"
        }
    ).appendTo("#row_birds");
    
    $("<input>").attr(
        {
            type : "number",
            id : `input_player_${i}_birds`,
            name : `player_${i}_birds`,
            class : "bg-white"
        }
    ).prop(
        "required",
        true
    ).appendTo(cell);

    // Bonus cards
    $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-disabled"
        }
    ).appendTo("#row_bonus_cards");

    // End-of-round goals
    var cell = $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-input score_sheet_cell_no_padding"
        }
    ).appendTo("#row_end-of-round_goals");
    
    $("<input>").attr(
        {
            type : "number",
            id : `cell_automa_end-of-round_goals`,
            name : `automa_end-of-round_goals`,
            min: "0",
            class : "bg-white"
        }
    ).prop(
        "required",
        true
    ).appendTo(cell);

    // Eggs
    var cell = $("<td>").attr(
        {
            colspan: "6",
            style : `width:${width_p}%`,
            class : "cell-input score_sheet_cell_no_padding"
        }
    ).appendTo("#row_eggs");
    
    $("<input>").attr(
        {
            type : "number",
            id : `cell_automa_laid_eggs`,
            name : `automa_laid_eggs`,
            min : "0",
            class : "bg-white"
        }
    ).prop(
        "required",
        true
    ).appendTo(cell);

    // Food on cards
    $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-disabled"
        }
    ).appendTo("#row_food_on_cards");

    // Tucked cards
    $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-disabled"
        }
    ).appendTo("#row_tucked_cards");

    // Nectar
    var cell = $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-input score_sheet_cell_no_padding"
        }
    ).appendTo("#row_nectar");
    
    $("<input>").attr(
        {
            type : "number",
            id : `cell_automa_nectar`,
            name : `automa_nectar`,
            min : "0",
            class : "bg-white"
        }
    ).appendTo(cell);

    // Total
    var cell = $("<td>").attr(
        {
            colspan : "6",
            style : `width:${width_p}%`,
            class : "cell-total score_sheet_cell_no_padding"
        }
    ).appendTo("#row_total");
    
    $("<div>").attr(
        {
            type : "number",
            id : `cell_automa_total_score`
        }
    ).appendTo(cell);

    // Total to submit
    $("<input>").attr(
        {
            type : "number",
            id : `submit_automa_total_score`,
            name : `automa_total_score`
        }
    ).appendTo($("#total_scores_to_submit"));

    assign_automa_event_listeners();
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

    // Update player total score on nectar change
    $(`#input_player_${i}_nectar`).on(
        "change",
        function() {
            recompute_player_total_score(i)
        }
    )
}

function assign_automa_event_listeners() {

    // Update automa total score on automa_birds change
    $(`#input_automa_birds`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on bonus_cards change
    $(`#input_automa_bonus_cards`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on end-of-round_goals change
    $(`#input_automa_end-of-round_goals`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on eggs change
    $(`#input_automa_eggs`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on food_on_cards change
    $(`#input_automa_food_on_cards`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on tucked_cards change
    $(`#input_automa_tucked_cards`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )

    // Update automa total score on nectar change
    $(`#input_automa_nectar`).on(
        "change",
        function() {
            recompute_automa_total_score()
        }
    )
}

// Toggle n_players modal
$(document).ready(
    function () {

        $('#modal_n_players').modal('toggle');
    }
);


// Recompute player total score
function recompute_player_total_score(i) {

    var total_score =  parseNaNOrInt(
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
    ) + parseNaNOrInt(
        $(`#input_player_${i}_nectar`).val()
    );

    if (total_score > 0) {

        $(`#div_player_${i}_total_score`).text(
            total_score
        )
    }
    else {
        $(`#div_player_${i}_total_score`).text(
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
            "col_base_game_checkbox",
            "col_european_expansion_checkbox",
            "col_oceania_expansion_checkbox",
            "col_asia_checkbox",
            "col_birds_of_canada_checkbox",
            "col_birds_of_new_zealand_checkbox",
            "col_birds_of_the_usa_checkbox",
            "col_british_birds_checkbox",
            "col_birds_of_continental_europe_checkbox",
            "col_additional_asian_avians_checkbox",
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
            "cell_player_nectar",
            "cell_automa_n_drawn_cards",
            "cell_automa_played_birds",
            "cell_automa_end-of-round_goals",
            "cell_automa_laid_eggs",
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

    // Player: total score
    $("#input_player_total_score").val(
        $("#cell_player_total_score").text()
    )

    // Automa: nectar
    if ($(`#cell_automa_nectar`).val() == "") {
        $(`#cell_automa_nectar`).val(0);
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

    if(document.getElementById("col_birds_of_canada_checkbox").checked) {
        document.getElementById("col_birds_of_canada_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_birds_of_new_zealand_checkbox").checked) {
        document.getElementById("col_birds_of_new_zealand_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_birds_of_the_usa_checkbox").checked) {
        document.getElementById("col_birds_of_the_usa_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_british_birds_checkbox").checked) {
        document.getElementById("col_british_birds_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_birds_of_continental_europe_checkbox").checked) {
        document.getElementById("col_birds_of_continental_europe_checkbox_hidden").disabled = true;
    }

    if(document.getElementById("col_additional_asian_avians_checkbox").checked) {
        document.getElementById("col_additional_asian_avians_checkbox_hidden").disabled = true;
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
                $("#col_base_game_checkbox").prop("checked",true);
                $("#col_european_expansion_checkbox").prop("checked",true);
                $("#col_oceania_expansion_checkbox").prop("checked",true).trigger("change");
                $("#col_asia_checkbox").prop("checked",true);
                $("#col_birds_of_canada_checkbox").prop("checked",false);
                $("#col_birds_of_new_zealand_checkbox").prop("checked",false);
                $("#col_birds_of_the_usa_checkbox").prop("checked",false);
                $("#col_british_birds_checkbox").prop("checked",false);
                $("#col_birds_of_continental_europe_checkbox").prop("checked",false);
                $("#col_additional_asian_avians_checkbox").prop("checked",false);
                $("#col_automubon_society_checkbox").prop("checked",false);
                $("#col_RAOUtoma_checkbox").prop("checked",false);
                $("#col_automasian_alliance_checkbox").prop("checked",true).trigger("change");

                // Empty player cells
                $("#cell_player_birds").val("");
                $("#cell_player_bonus_cards").val("");
                $("#cell_player_end-of-round_goals").val("");
                $("#cell_player_eggs").val("");
                $("#cell_player_food_on_cards").val("");
                $("#cell_player_tucked_cards").val("");
                $("#cell_player_nectar").val("");
                $("#cell_player_total_score").text("");

                // Empty automa cells
                $("input[name='difficulty']").prop("checked",false);
                $("#cell_automa_n_drawn_cards").val("");
                $("#cell_automa_played_birds").val("");
                $("#cell_automa_end-of-round_goals").val("");
                $("#cell_automa_tucked_cards").val("");
                $("#cell_automa_laid_eggs").val("");
                $("#cell_automa_nectar").val("");
                $("#cell_automa_total_score").text("");
            }
        )
    }
)