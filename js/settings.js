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

if (current_theme == null) {
    document.documentElement.setAttribute(
        "data-theme",
        "default"
    );
}
else {
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

if (current_background == null) {
    document.documentElement.setAttribute(
        "data-background",
        "random"
    );
}
else {
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

const current_web_app_url = localStorage.getItem("web_app_url") ? localStorage.getItem("web_app_url") : null;

if (current_web_app_url == null) {
    document.documentElement.setAttribute(
        "data-web_app_url",
        ""
    );
}
else {
    document.documentElement.setAttribute(
        "data-web_app_url",
        current_web_app_url
    );
}

$(document).ready(
    function() {
        set_web_app_url(
            document.documentElement.getAttribute(
                "data-web_app_url"
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
                        "random"
                    );
                }

                // Check stored `web_app_url`
                const current_web_app_url = document.documentElement.getAttribute(
                    "data-web_app_url"
                );

                if (current_web_app_url) {
                    $("#input_web_app_url").val(
                        current_web_app_url
                    );
                }
                else {
                    $("#input_web_app_url").val(
                        ""
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

        $("#button_expansions").on(
            "click",
            function() {
                $("#modal_expansions").modal("show");
            }
        );

        $("#button_close_modal_expansions").on(
            "click",
            function() {
                $("#modal_expansions").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_expansions_overall_select_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_base",
                        "#toggle_european_expansion",
                        "#toggle_oceania_expansion",
                        "#toggle_asia",
                        "#toggle_birds_of_canada",
                        "#toggle_birds_of_new_zealand",
                        "#toggle_birds_of_the_usa",
                        "#toggle_british_birds",
                        "#toggle_birds_of_continental_europe",
                        "#toggle_additional_asian_avians"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            true
                        );

                        $(v).trigger("change");
                    }
                );

                show_display_hidden(
                    "#row_duet_mode_toggle"
                );
            }
        );

        $("#button_expansions_overall_deselect_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_base",
                        "#toggle_european_expansion",
                        "#toggle_oceania_expansion",
                        "#toggle_asia",
                        "#toggle_birds_of_canada",
                        "#toggle_birds_of_new_zealand",
                        "#toggle_birds_of_the_usa",
                        "#toggle_british_birds",
                        "#toggle_birds_of_continental_europe",
                        "#toggle_additional_asian_avians"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            false
                        );

                        $(v).trigger("change");
                    }
                );

                hide_display_hidden(
                    "#row_duet_mode_toggle"
                );

                $("#toggle_duet_mode").prop(
                    "checked",
                    false
                )
            }
        );

        $("#button_expansions_select_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_base",
                        "#toggle_european_expansion",
                        "#toggle_oceania_expansion",
                        "#toggle_asia"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            true
                        );

                        $(v).trigger("change");
                    }
                );

                show_display_hidden(
                    "#row_duet_mode_toggle"
                );
            }
        );

        $("#button_expansions_deselect_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_base",
                        "#toggle_european_expansion",
                        "#toggle_oceania_expansion",
                        "#toggle_asia"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            false
                        );

                        $(v).trigger("change");
                    }
                );

                hide_display_hidden(
                    "#row_duet_mode_toggle"
                );

                $("#toggle_duet_mode").prop(
                    "checked",
                    false
                ).trigger("change")
            }
        );

        $("#toggle_asia").on(
            "change",
            function() {
                if (
                    $("#toggle_asia").prop("checked") == true
                ) {
                    show_display_hidden(
                        "#row_duet_mode_toggle"
                    );
                }
                else {
                    hide_display_hidden(
                        "#row_duet_mode_toggle"
                    );

                    $("#toggle_duet_mode").prop(
                        "checked",
                        false
                    ).trigger("change")
                }
            }
        )

        $("#button_promo_packs_select_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_birds_of_canada",
                        "#toggle_birds_of_new_zealand",
                        "#toggle_birds_of_the_usa",
                        "#toggle_british_birds",
                        "#toggle_birds_of_continental_europe",
                        "#toggle_additional_asian_avians"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            true
                        );

                        $(v).trigger("change");
                    }
                );
            }
        );

        $("#button_promo_packs_deselect_all").on(
            "click",
            function() {

                $.each(
                    [
                        "#toggle_birds_of_canada",
                        "#toggle_birds_of_new_zealand",
                        "#toggle_birds_of_the_usa",
                        "#toggle_british_birds",
                        "#toggle_birds_of_continental_europe",
                        "#toggle_additional_asian_avians"
                    ],
                    function(idx, v) {

                        $(v).prop(
                            "checked",
                            false
                        );

                        $(v).trigger("change");
                    }
                );
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_no_web_app_url").on(
            "click",
            function() {
                $("#modal_no_web_app_url").modal("hide");
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
                    }),linear-gradient(rgba(255, 255, 255, 0) 72.5vh, rgba(255, 255, 255, 0.5) 85vh)`
                );
            }
        )
    }
    else {
        $("body").css(
            "background-image",
            `linear-gradient(rgba(255, 255, 255, 0.5) 15vh, rgba(255, 255, 255, 0) 27.5vh), url(https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/backgrounds/${background}.jpg),linear-gradient(rgba(255, 255, 255, 0) 72.5vh, rgba(255, 255, 255, 0.5) 85vh)`
        );
    }
}

$(document).ready(
    function() {

        $("#input_web_app_url").change(
            function() {

                set_web_app_url(
                    this.value
                );
            }
        );

        $("#input_web_app_url_from_submit_attempt").change(
            function() {

                set_web_app_url(
                    this.value
                );
            }
        );
    }
)

function set_web_app_url(web_app_url) {

    document.documentElement.setAttribute(
        "data-web_app_url",
        web_app_url
    );

    localStorage.setItem(
        "web_app_url",
        web_app_url
    );

    $("#google_form").attr(
        "action",
        web_app_url
    )
}

$(document).ready(

    function() {

        $("#google_form").on(
            "submit",
            function() {

                const rxChecks = [/^https:\/\/script.google.com\/macros\/s\//,/.\/exec/],
                word = $("#google_form").attr("action");
                result = rxChecks.every((rx) => rx.test(word));

                if (!result) {
                    $("#modal_no_web_app_url").modal("show");
                    return false;
                }
                else {
                    populate_form_data();
                    return true;
                }
            }
        );
    }
)