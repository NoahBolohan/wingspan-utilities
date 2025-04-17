# How to submit Wingspan scores to a Google Sheet

Note: This guide is derived from jamiewilson's [form-to-google-sheets repository](https://github.com/jamiewilson/form-to-google-sheets).

This page will guide you through the following:

+ Creating a Google Sheet to store your Wingspan game scores
+ Deploying a Google Web App to post data to your Sheet
+ Attaching the deployed App script to the score sheets found throughout this Wingspan Utilities application

From start to finish, this guide should take approx. 10-15 minutes to follow. It is also **recommended** to follow this guide on a desktop browser.

## Creating a Wingspan Tracker Sheet

1. Navigate to the [blank Wingspan tracker Sheet](https://docs.google.com/spreadsheets/d/10GoCP8AZ7hhurscRSbggIbDGG8VhBn5YajbWVUoWhlE)
2. Click on `File` > `Make a copy`
3. Rename the new Sheet how you'd like and click `Make a Copy`
4. Navigate to your newly copied Wingspan Tracker Sheet

<details>

<summary>Screenshots</summary>

### 2. Click on `File` > `Make a copy`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/make_a_copy.png)

### 3. Rename the new Sheet how you'd like and click `Make a Copy`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/rename.png)

</details>

## Deploying a Google Web App

1. Click on `Extensions` > `Apps Script`
2. In the code editor, replace the default code with the contents of `gs/form_script.gs` ([link](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/gs/form_script.gs))
3. Save the project and Run (this step may prompt authorize permissions, sometimes hidden under the **Advanced** section of the request)
4. Confirm the that script ran successfully via the execution log
5. In the top right of the page, click on `Deploy` > `New deployment`
6. Under the `Select type` cogwheel, choose `Web app`
7. Customize the fields as you wish and click `Deploy` (you may have to authorize permissions again)
8. If successful, you should be presented with a pop-up that contains a unique `Deployment ID` and a unique `Web App URL`. This URL is your personal `Web App URL` and will indicate to the Wingspan Utilities application score sheets to where your scores should posted

<details>

<summary>Screenshots</summary>

### 1. Click on `Extensions` > `Apps Script`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/apps_script.png)

### 3. Save the project and Run (this step may prompt authorize permissions, sometimes hidden under the **Advanced** section of the request)

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/save_run.png)

### 4. Confirm the that script ran successfully via the execution log

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/confirm_execution_log.png)

### 5. In the top right of the page, click on `Deploy` > `New deployment`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/new_deployment.png)

### 6. Under the `Select type` cogwheel, choose `Web app`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/select_web_app.png)

### 7. Customize the fields as you wish and click `Deploy` (you may have to authorize permissions again)

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/deploy.png)

### 8. If successful, you should be presented with a pop-up that contains a unique `Deployment ID` and a unique `Web App URL`. This URL is your personal `Web App URL` and will indicate to the Wingspan Utilities application score sheets to where your scores should posted

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/successful_deployment.png)

</details>

## Attaching your deployed Web App

1. In the settings menu of the Wingspan Utilities application, paste your `Web App URL`
2. Alternatively, you can try submitting a score from any score sheet to be prompted to paste your `Web App URL`
3. Test the submission of a score sheet by clicking on the `Submit Score` button of a score sheet and verifying that a new row of scores is appended in the appropriate Google Sheet page (the buttons below will take you to pre-filled score sheets)

<details>

<summary>Screenshots</summary>

### 1. In the settings menu of the Wingspan Utilities application, paste your `Web App URL`

![](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/how_to_guide/paste_url.png)

</details>

## Pre-filled Score Sheets

[Regular](https://wingspan-utilities-vd2qp.ondigitalocean.app/score_sheet_automa.html?col_base_game_checkbox=true&col_european_expansion_checkbox=true&col_oceania_expansion_checkbox=true&col_asia_checkbox=true&col_automubon_society_checkbox=false&col_RAOUtoma_checkbox=false&cell_player_birds=0&cell_player_bonus_cards=0&cell_player_end-of-round_goals=0&cell_player_eggs=0&cell_player_food_on_cards=0&cell_player_tucked_cards=0&cell_player_duet_tokens=0&cell_player_nectar=0&col_automa_points_per_face_down_bird_card_radio=4&cell_automa_n_drawn_cards=0&cell_automa_played_birds=0&cell_automa_end-of-round_goals=0&cell_automa_laid_eggs=0&cell_automa_duet_tokens=0&cell_automa_nectar=0)

[Automa](https://wingspan-utilities-vd2qp.ondigitalocean.app/score_sheet_automa.html?col_base_game_checkbox=true&col_european_expansion_checkbox=true&col_oceania_expansion_checkbox=true&col_asia_checkbox=true&col_automubon_society_checkbox=false&col_RAOUtoma_checkbox=false&cell_player_birds=0&cell_player_bonus_cards=0&cell_player_end-of-round_goals=0&cell_player_eggs=0&cell_player_food_on_cards=0&cell_player_tucked_cards=0&cell_player_duet_tokens=0&cell_player_nectar=0&col_automa_points_per_face_down_bird_card_radio=4&cell_automa_n_drawn_cards=0&cell_automa_played_birds=0&cell_automa_end-of-round_goals=0&cell_automa_laid_eggs=0&cell_automa_duet_tokens=0&cell_automa_nectar=0)