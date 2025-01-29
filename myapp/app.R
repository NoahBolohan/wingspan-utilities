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
  
  iterative_pivot <- function(df, player) {
    tryCatch(
      expr = {
        id_col_name <- paste0("player_",player)
        
        df |> select(
          !contains("player"),
          contains(as.character(player))
        ) |>
          pivot_longer(
            cols = paste0(id_col_name,"_birds"):paste0(id_col_name,"_total_score"),
            names_to = "score_type",
            values_to = "score"
          ) |>
          rename(Name =paste0("player_",player,"_name")) |>
          mutate(
            score_type = str_remove(
              score_type,
              paste0(id_col_name, "_")
            )
          )
      },
      error = function(e) {
        message("Player: ", player, " not found.")
      }
    )
  }
  
  construct_download_url <- function(url, format='csv', sheetid = NULL){
    # Taken from Max Conway: https://github.com/maxconway/gsheet/tree/master
    key <- stringr::str_extract(url, '[[:alnum:]_-]{30,}')
    if(is.null(sheetid) & stringr::str_detect(url, 'gid=[[:digit:]]+')){
      sheetid <- as.numeric(stringr::str_extract(stringr::str_extract(url,'gid=[[:digit:]]+'),'[[:digit:]]+'))
    }
    address <- paste0('https://docs.google.com/spreadsheets/export?id=',key,'&format=',format)
    if(!is.null(sheetid)){
      address <- paste0(address, '&gid=', sheetid)
    }
    return(address)
  }
  
  # df <- gsheet2tbl(
  #   'https://docs.google.com/spreadsheets/d/1K600qeRyYevSrMBUyevP4sZ4vRIBzq4ggCl3cLjHAvc#gid=2096833443'
  # )
  
  df <- read_csv(
    construct_download_url(
      'https://docs.google.com/spreadsheets/d/1K600qeRyYevSrMBUyevP4sZ4vRIBzq4ggCl3cLjHAvc'
    ),
    col_types = cols(
      timestamp = col_character(),
      n_players = col_integer(),
      base = col_character(),
      european_expansion = col_character(),
      oceania_expansion = col_character(),
      asia = col_character(),
      duet_mode = col_character(),
      player_1_name = col_character(),
      player_1_birds = col_integer(),
      player_1_bonus_cards = col_integer(),
      "player_1_end-of-round_goals" = col_integer(),
      player_1_eggs = col_integer(),
      player_1_food_on_cards = col_integer(),
      player_1_tucked_cards = col_integer(),
      player_1_nectar = col_integer(),
      player_1_duet_tokens = col_integer(),
      player_1_total_score = col_integer(),
      player_2_name = col_character(),
      player_2_birds = col_integer(),
      player_2_bonus_cards = col_integer(),
      "player_2_end-of-round_goals" = col_integer(),
      player_2_eggs = col_integer(),
      player_2_food_on_cards = col_integer(),
      player_2_tucked_cards = col_integer(),
      player_2_nectar = col_integer(),
      player_2_duet_tokens = col_integer(),
      player_2_total_score = col_integer(),
      player_3_name = col_character(),
      player_3_birds = col_integer(),
      player_3_bonus_cards = col_integer(),
      "player_3_end-of-round_goals" = col_integer(),
      player_3_eggs = col_integer(),
      player_3_food_on_cards = col_integer(),
      player_3_tucked_cards = col_integer(),
      player_3_nectar = col_integer(),
      player_3_total_score = col_integer(),
      player_4_name = col_character(),
      player_4_birds = col_integer(),
      player_4_bonus_cards = col_integer(),
      "player_4_end-of-round_goals" = col_integer(),
      player_4_eggs = col_integer(),
      player_4_food_on_cards = col_integer(),
      player_4_tucked_cards = col_integer(),
      player_4_nectar = col_integer(),
      player_4_total_score = col_integer(),
      player_5_name = col_character(),
      player_5_birds = col_integer(),
      player_5_bonus_cards = col_integer(),
      "player_5_end-of-round_goals" = col_integer(),
      player_5_eggs = col_integer(),
      player_5_food_on_cards = col_integer(),
      player_5_tucked_cards = col_integer(),
      player_5_nectar = col_integer(),
      player_5_total_score = col_integer(),
      player_6_name = col_character(),
      player_6_birds = col_integer(),
      player_6_bonus_cards = col_integer(),
      "player_6_end-of-round_goals" = col_integer(),
      player_6_eggs = col_integer(),
      player_6_food_on_cards = col_integer(),
      player_6_tucked_cards = col_integer(),
      player_6_nectar = col_integer(),
      player_6_total_score = col_integer(),
      player_7_name = col_character(),
      player_7_birds = col_integer(),
      player_7_bonus_cards = col_integer(),
      "player_7_end-of-round_goals" = col_integer(),
      player_7_eggs = col_integer(),
      player_7_food_on_cards = col_integer(),
      player_7_tucked_cards = col_integer(),
      player_7_nectar = col_integer(),
      player_7_total_score = col_integer(),
    )
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
}

shinyApp(ui = ui, server = server)