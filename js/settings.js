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

function update_score_sheet_automa_theme(
    theme_name
) {

    var paint_stroke_idx = [
        "#div_header",
        "#button_dropdown_expansions_menu",
        "#button_dropdown_extra_cards_menu",
        "#button_reset_sheet",
        "#submit",
        "#button_return_to_home_page"
    ];

    if (theme_name == "default") {
        $("#div_header").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-white.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
        $("#button_dropdown_expansions_menu").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-teal.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
        $("#button_dropdown_extra_cards_menu").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-teal.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
        $(".cell_info").css(
            "background-color",
            "#949cc4"
        );
        $(".cell_vertical").css(
            "background-color",
            "#fefefe"
        );
        $(".cell_input").css(
            "background-color",
            "#fefefe"
        );
        $(".cell_disabled").css(
            "background-color",
            "#c17b38"
        );
        $(".cell_total").css(
            "background-color",
            "#6fbfb9"
        );
        $("#button_reset_sheet").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-pink.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
        $("#submit").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-yellow.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
        $("#button_return_to_home_page").css(
            {
                "background": "url('https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/paint_strokes/stripe-brown.webp')",
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "background-position": "center"
            }
        );
    }
    else {

        $.each(
            paint_stroke_idx,
            function(i,k) {
                $(k).css(
                    "background",
                    "none"
                );
            }
        )

        var theme = $("#body_score_sheet_automa").data(
            "themes"
        )[
            theme_name
        ];

        $("#div_header").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $("#button_dropdown_expansions_menu").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $("#button_dropdown_extra_cards_menu").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $(".cell_info").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $(".cell_vertical").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $(".cell_input").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $(".cell_disabled").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $(".cell_total").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $("#button_reset_sheet").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $("#submit").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
        $("#button_return_to_home_page").css(
            "background-color",
            theme[Math.floor(Math.random() * theme.length)]
        );
    }
}

function to_title_case(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    ).replaceAll(
        '_',
        ' '
    );
}

function theme_options_sort(a, b) {
    if ((a.text === 'Default') != (b.text === 'Default')) {
        return a.text === 'Default' ? 1 : 1;
    }
    return a.text > b.text ? 1 :
        a.text < b.text ? -1 : 0;
}

$(document).ready(
    function() {

        $.ajax({
            url: 'https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/data/themes.json',
            async: false,
            dataType: 'json',
            success: function (themes) {

                $("#body_score_sheet_automa").data(
                    "themes",
                    themes
                );

                $("#theme_options").append(
                    $(
                        "<option>",
                        {
                            value: "default",
                            text: "Default"
                        }
                    )
                );

                $.each(
                    themes,
                    function(k,v) {

                        $("#theme_options").append(
                            $(
                                "<option>",
                                {
                                    value: k,
                                    text: to_title_case(k)
                                }
                            )
                        );
                    }
                )
            }
        });

        $("#theme_options").html(
            $("#theme_options option").sort(
                theme_options_sort
            )
        )

        update_score_sheet_automa_theme("default");
    }
)

$(document).ready(
    function() {

        $("#theme_options").change(
            function() {
                if ($(document.body).attr("id") == "body_score_sheet_automa")
                {
                    update_score_sheet_automa_theme(this.value)
                }
                else {
                }
            }
        );
    }
)