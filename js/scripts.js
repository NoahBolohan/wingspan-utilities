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
                        <td>${automa_action["round_1"]["primary_action"]}</td>\
                        <td>${automa_action["round_1"]["secondary_action"]}</td>\
                    </tr>;`;

                    $('#table_automa_actions tbody').append(tr);
                })
                
            }
        )
    }
)