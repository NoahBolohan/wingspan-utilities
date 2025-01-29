
#' iteratively pivot to grab each player from each game
#'
#' @param df dataframe of score data
#' @param player int 1 to 7
#'
#' @return pivoted df
#' @export
#'
#' @examples
#' 
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