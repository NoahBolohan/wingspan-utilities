// https://github.com/richtr/NoSleep.js
var noSleep = new NoSleep();

//Check local storage
const current_wake_lock = localStorage.getItem("wake_lock") ? localStorage.getItem("wake_lock") : null;

if (current_wake_lock) {
    document.documentElement.setAttribute(
        "data-wake_lock",
        $.parseJSON(current_wake_lock.toLowerCase())
    );
}

$(document).ready(
    function() {
        if (
            document.documentElement.getAttribute(
                "data-wake_lock"
            ) == "true"
        ) {

            $('#button_toggle_screen_sleep').prop(
                "checked",
                true
            );

            noSleep.enable();
        }
        else {

            $('#button_toggle_screen_sleep').prop(
                "checked",
                false
            );

            noSleep.disable();
        }
    }
)

const current_theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

if (current_theme) {
    document.documentElement.setAttribute(
        "data-theme",
        current_theme
    );
}

$(document).ready(
    function() {
        switch_theme(
            document.documentElement.getAttribute(
                "data-theme"
            )
        )
    }
)

const current_background = localStorage.getItem("background") ? localStorage.getItem("background") : null;

if (current_background) {
    document.documentElement.setAttribute(
        "data-background",
        current_background
    );
}

$(document).ready(
    function() {
        switch_background(
            document.documentElement.getAttribute(
                "data-background"
            )
        )
    }
)

$(document).ready(

    function() {

        $("#button_toggle_screen_sleep").on(
            "click",
            function() {
                if (
                    $("#button_toggle_screen_sleep").is(":checked")
                ) {

                    document.documentElement.setAttribute(
                        "data-wake_lock",
                        true
                    );
                    localStorage.setItem(
                        "wake_lock",
                        true
                    );

                    noSleep.enable(); // keep the screen on!
                } else {

                    document.documentElement.setAttribute(
                        "data-wake_lock",
                        false
                    );
                    localStorage.setItem(
                        "wake_lock",
                        false
                    );

                    noSleep.disable(); // let the screen turn off.
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

                //Check store `wake_lock`
                const current_wake_lock = document.documentElement.getAttribute(
                    "data-wake_lock"
                );

                if (current_wake_lock) {
                    if (current_wake_lock == "true") {
                        $('#button_toggle_screen_sleep').prop(
                            "checked",
                            true
                        );
                    }
                    else {
                        $('#button_toggle_screen_sleep').prop(
                            "checked",
                            false
                        );
                    }
                }
                else {
                    $('#button_toggle_screen_sleep').prop(
                        "checked",
                        false
                    );
                }

                // Check stored `theme`
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

                // Check stored `background`
                const current_background = document.documentElement.getAttribute(
                    "data-background"
                );

                if (current_background) {
                    $("#background_options").val(
                        current_background
                    );
                }
                else {
                    $("#background_options").val(
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

    rgb_triple = window.getComputedStyle(document.body).getPropertyValue('--heading-color').split(',');

    let color = new Color(
        rgb_triple[0], rgb_triple[1], rgb_triple[2]
    );
    let solver = new Solver(color);
    let result = solver.solve()
    let filterCSS = result.filter;

    $(".header-background").attr("style", filterCSS);
    $(".header-background-for-index-menu").attr("style", filterCSS);

}

$(document).ready(
    function() {

        $("#background_options").change(
            function() {
                
                switch_background(
                    this.value
                );
            }
        );
    }
)

function switch_background(background) {
    document.documentElement.setAttribute(
        "data-background",
        background
    );
    localStorage.setItem(
        "background",
        background
    );

    if (background == "random") {
        $.getJSON(
            "https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/backgrounds/backgrounds.json",
            function(data) {

                $("body").css(
                    "background-image",
                    `linear-gradient(rgba(255, 255, 255, 0.5) 15vh, rgba(255, 255, 255, 0) 27.5vh), url(https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/backgrounds/${
                        data["backgrounds"][Math.floor(Math.random() * data["backgrounds"].length)]
                    })`
                );
            }
        )
    }
    else {
        $("body").css(
            "background-image",
            `linear-gradient(rgba(255, 255, 255, 0.5) 15vh, rgba(255, 255, 255, 0) 27.5vh), url(https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/backgrounds/${background}.jpg)`
        );
    }
}