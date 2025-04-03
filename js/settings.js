// https://github.com/richtr/NoSleep.js
var noSleep = new NoSleep();

//Check local storage
const current_theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

if (current_theme) {
    document.documentElement.setAttribute(
        "data-theme",
        current_theme
    );
}

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

    $(".filterPixel").attr("style", "filter: " + filterCSS["filter"]);

    $(".header-background").css("filter",filterCSS["filter"]);
    $(".header-background-for-index-menu").css("filter",filterCSS["filter"]);
    // $.each(
    //     filterCSS,
    //     function(k,v) {
            
    //         $(".header-background").css(
    //             v[0],
    //             v[1]
    //         );
    //         $(".header-background-for-index-menu").css(
    //             v[0],
    //             v[1]
    //         );
    //     }
    // )
    
}