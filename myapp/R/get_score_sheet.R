get_score_sheet <- function(
    url = 'https://docs.google.com/spreadsheets/d/1K600qeRyYevSrMBUyevP4sZ4vRIBzq4ggCl3cLjHAvc',
    format = 'csv',
    sheetId = NULL
) {
  
  # Taken from Max Conway: https://github.com/maxconway/gsheet/tree/master
  key <- stringr::str_extract(url, '[[:alnum:]_-]{30,}')
  if(is.null(sheetId) & stringr::str_detect(url, 'gid=[[:digit:]]+')){
    sheetId <- as.numeric(stringr::str_extract(stringr::str_extract(url,'gid=[[:digit:]]+'),'[[:digit:]]+'))
  }
  address <- paste0('https://docs.google.com/spreadsheets/export?id=',key,'&format=',format)
  if(!is.null(sheetId)){
    address <- paste0(address, '&gid=', sheetId)
  }
  
  df <- read_csv(
    address,
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
  
  return(df)
}