library(shiny)
library(bslib)
library(DT)
library(dplyr)
library(ggplot2)
library(tidyr)
library(stringr)
library(plotly)
library(readr)

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
  )
)

server <- function(input, output) {
  
  lapply(
    list.files("./R", full.names = TRUE),
    source
  )
  
  df <- get_score_sheet(
    sheetId = 2096833443
  )
  
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
}

shinyApp(ui = ui, server = server)