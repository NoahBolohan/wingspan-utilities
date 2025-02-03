library(shiny)
library(bslib)
library(DT)
library(dplyr)
library(ggplot2)
library(tidyr)
library(stringr)
library(plotly)
library(readr)
library(gt)

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
        gt_output(outputId = "tablePlayerStats")
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
  
  # Player stats table
  output$tablePlayerStats <- render_gt({
    
    player_scores_total <- stacked_player_scores %>% filter(
      Name == input$playerName,
      score_type == "total_score"
    ) %>% arrange(game)
    
    summary_frame = data.frame(
      Measure = c(
        "Games played",
        "Games won",
        "Win rate",
        "Max score",
        "Min score",
        "Mean score"
      ),
      Value = c(
        nrow(player_scores_total),
        sum(player_scores_total["winner"]),
        paste0(
          100 *
          sum(player_scores_total["winner"]) /
          nrow(player_scores_total), " %"
        ),
        max(player_scores_total["score"]),
        min(player_scores_total["score"]),
        paste(
          round(
            colMeans(player_scores_total["score"]),
            2
          ),
          " (+/-",
          round(
            colSdColMeans(player_scores_total["score"]),
            2
          ),
          ")",
          sep=""
        )
      )
    )
    
    summary_frame %>%
      gt() %>%
      tab_header(
        title = paste(
          input$playerName
        )
      )
  })
  
  # Player total score plot
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
  
  # Player score breakdown plot
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