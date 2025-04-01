// https://github.com/richtr/NoSleep.js
var noSleep = new NoSleep();
var wakeLockEnabled = false;

$(document).ready(

    function() {

        $("#button_toggle_screen_sleep").on(
            "click",
            function() {
                if (!wakeLockEnabled) {
                    noSleep.enable(); // keep the screen on!
                    wakeLockEnabled = true;
                } else {
                    noSleep.disable(); // let the screen turn off.
                    wakeLockEnabled = false;
                }
            }
        )
    }
)

$(document).ready(
    function() {

        $("#button_settings").on(
            "click",
            function() {
                $("#modal_settings").modal("show");

                const current_theme = document.documentElement.getAttribute(
                    "data-theme"
                );

                if (current_theme) {
                    $("#theme_options").val(
                        current_theme
                    );
                }
                else {
                    $("#theme_options").val(
                        "default"
                    );
                }

                
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_settings").on(
            "click",
            function() {
                $("#modal_settings").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#theme_options").change(
            function() {
                
                switch_theme(
                    this.value
                );
            }
        );
    }
)

function switch_theme(theme) {
    document.documentElement.setAttribute(
        "data-theme",
        theme
    );
    localStorage.setItem(
        "theme",
        theme
    );
}

const current_theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

if (current_theme) {
    document.documentElement.setAttribute(
        "data-theme",
        current_theme
    );
}