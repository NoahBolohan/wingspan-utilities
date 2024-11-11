function random_entry_from_dict(object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
};

// Set an event listener for performing a new automa action by clicking the automa action button
$(document).ready(
    function() {
        $("#button_automa_action").on(
            "click",
            function() {

                $.getJSON('https://raw.githubusercontent.com/NoahBolohan/wingspan-tracker/refs/heads/main/static/automa_actions/base.json', function(data) {

                    var automa_action = random_entry_from_dict(data);

                    var tr = `<tr>\
                        <th scope='row'>${$('#table_automa_actions tr').length}</th>\
                        <td>${automa_action['round_1']['primary_action']}</td>\
                        <td>${automa_action['round_1']['secondary_action']}</td>\
                    </tr>;`;

                    $("#table_automa_actions tbody").append(tr);

                    if (automa_action["round_1"]["secondary_action"] == "place_end-of-round_cube") {

                        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).data(
                            "counter",
                            $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).data(
                                "counter"
                            ) + 1
                        );
                    }
                    else if (automa_action["round_1"]["secondary_action"] == "remove_end-of-round_cube") {

                        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).data(
                            "counter",
                            Math.max(
                                0,
                                $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).data(
                                    "counter"
                                ) - 1
                            )
                        );
                    }

                    $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).text(
                        $(`#col_round_${$("#row_round_info").data("round")}_end_cube_count`).data("counter")
                    )
                })
                
            }
        )
    }
)