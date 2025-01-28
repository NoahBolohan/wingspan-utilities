library(shiny)
library(bslib)
library(gsheet)
library(DT)
library(dplyr)
library(ggplot2)
library(tidyr)
library(stringr)
library(plotly)

ui <- page_sidebar(
    title = "Wingspan Analytics",
    sidebar = sidebar(
        selectInput(
            "playerName",
            label = "Select player name:",
            choices =
            c(
                "Alex",
                "Mila",
                "Noah"
            )
        )
    ),

    layout_column_wrap(
        width = 1/2,
        height = 300,
        card(
            card_header(
                "General stats"
            ),
            card_body(
                textOutput(outputId = "playerGeneralStatsText")
            )
        ),
        navset_card_tab(
            height = 450,
            full_screen = TRUE,
            title = "Player stats",
            nav_panel(
                "Total score",
                card_title("Total score over time"),
                plotOutput(outputId = "totalScorePlot")
            ),
            nav_panel(
                "Score breakdown",
                card_title("Score breakdown over time"),
                plotOutput(outputId = "scoreBreakdownPlot")
            )
        )
    ),

    card(
        card_header(
            "Player's games"
        ),
        card_body(
            dataTableOutput(outputId = "playerGamesTable")
        )
    )
)

server <- function(input, output) {

    df <- gsheet2tbl(
        'https://docs.google.com/spreadsheets/d/1K600qeRyYevSrMBUyevP4sZ4vRIBzq4ggCl3cLjHAvc#gid=2096833443'
    )

    df <- df |> mutate(game = 1:nrow(df), .before = 1)
    stacked_player_scores <- lapply(1:7, iterative_pivot, df = df) |> bind_rows()

    output$playerGeneralStatsText <- renderText({

        input$playerName
    })
    
    output$totalScorePlot <- renderPlot({

        player_scores_total <- stacked_player_scores %>% filter(
            Name == input$playerName,
            score_type == "total_score"
        ) %>% arrange(game)
        
        ggplot(
            player_scores_total,
            aes(
                x = pull(player_scores_total["game"]),
                y = pull(player_scores_total["score"])
            )
        ) +
        geom_line() +
        xlab("Game number") +
        ylab("Score")
    })

    output$scoreBreakdownPlot <- renderPlot({

        player_scores <- filter(
            stacked_player_scores,
            Name == input$playerName,
            score_type != "total_score"
        )
        
        ggplot(
            player_scores,
            aes(
                x = pull(player_scores["game"]),
                y = pull(player_scores["score"]),
                fill = pull(player_scores["score_type"])
            )
        ) + 
        geom_area() +
        xlab("Game number") +
        ylab("Score") +
        labs(fill="Score types")
    })

    output$playerGamesTable <- renderDataTable({
        
        datatable(
            filter(
                df,
                player_1_name == input$playerName | 
                player_2_name == input$playerName |
                player_3_name == input$playerName |
                player_4_name == input$playerName |
                player_5_name == input$playerName |
                player_6_name == input$playerName |
                player_7_name == input$playerName
            )
        )
    }) 
}

shinyApp(ui = ui, server = server)