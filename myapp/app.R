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

df <- get_score_sheet(
  sheetId = 2096833443
)

ui <- page_sidebar(
  
  title = "Wingspan Analytics",
  sidebar = sidebar(
    selectInput(
      inputId = "playerName",
      label = "Select player name:",
      choices =
        c(
          "Alex",
          "Mila",
          "Noah"
        )
    ),
    uiOutput("slider")
    # sliderInput( 
    #   inputId = "nGamesToDisplay",
    #   label = "Last N games:",
    #   min = 10,
    #   max = nrow(df), 
    #   value = 50 
    # )
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
  
  stacked_player_scores <- lapply(1:7, iterative_pivot, df = df) |> bind_rows() |>
    drop_na() |>
    group_by(game) |>
    mutate(
      winner = case_when(
        score >= max(score, na.rm = TRUE) ~ TRUE,
        .default = FALSE
      )
    ) |>
    ungroup()
  
  #N-games slider
  output$slider <- renderUI({
    
    player_scores_total <- stacked_player_scores %>% filter(
      Name == input$playerName,
      score_type == "total_score"
    )
    
    sliderInput(
      inputId = "nGamesToDisplay",
      label = "Last N games:",
      min = 10,
      max = nrow(
        player_scores_total
      ),
      value = min(
        30,
        nrow(
          player_scores_total
        )
      )
    )
  })

  # Player stats table
  output$tablePlayerStats <- render_gt({
    
    shiny::req(input$nGamesToDisplay)
    
    player_scores_total <- stacked_player_scores %>% filter(
      Name == input$playerName,
      score_type == "total_score"
    ) %>% arrange(game)
    
    if (input$nGamesToDisplay != "All") {
      player_scores_total <- tail(
        player_scores_total,
        min(
          input$nGamesToDisplay,
          nrow(
            player_scores_total
          )
        )
      )
    }
    
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
          round(
            100 *
            sum(player_scores_total["winner"]) /
            nrow(player_scores_total),
            2
          ), " %"
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
    
    shiny::req(input$nGamesToDisplay)
    
    player_scores_total <- stacked_player_scores %>% filter(
      Name == input$playerName,
      score_type == "total_score"
    ) %>% arrange(
      game
    ) %>% tail(
      input$nGamesToDisplay
    )
    
    ggplot(
      player_scores_total,
      aes(
        # x = pull(player_scores_total["game"]),
        x = as.integer(rownames(player_scores_total)),
        y = pull(player_scores_total["score"])
      )
    ) +
      geom_line() +
      xlab("Game number") +
      ylab("Score")
  })
  
  # Player score breakdown plot
  output$scoreBreakdownPlot <- renderPlot({
    
    shiny::req(input$nGamesToDisplay)
    
    player_scores <- filter(
      stacked_player_scores,
      Name == input$playerName,
      score_type != "total_score"
    ) %>% filter(
      game >= min(
        tail(
          sort(
            unique(
              game
            )
          ),
          input$nGamesToDisplay
        )
      )
    ) %>% mutate(
      inc_game = as.numeric(
        factor(
          game,
          levels = unique(game)
        )
      )
    )
    
    ggplot(
      player_scores,
      aes(
        # x = pull(player_scores["game"]),
        x = as.numeric(factor(game, levels = unique(game))),
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

# shinylive::export(
#   appdir = "C:/Git/wingspan-utilities/myapp",
#   destdir = "C:/Git/wingspan-utilities/docs"
# )

# httpuv::runStaticServer("C:/Git/wingspan-utilities/docs")