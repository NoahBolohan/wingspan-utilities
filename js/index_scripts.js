$(document).ready(
    function() {

        $("#button_about").on(
            "click",
            function() {
                $("#modal_about").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_about").on(
            "click",
            function() {
                $("#modal_about").modal("hide");
            }
        );
    }
)