# How to submit Wingspan scores to a Google Sheet

Note: This guide is derived from jamiewilson's [form-to-google-sheets repository](https://github.com/jamiewilson/form-to-google-sheets).

This page will guide you through the following:

+ Creating a Google Sheet to store your Wingspan game scores
+ Deploying a Google Web App to post data to your Sheet
+ Attaching the deployed App script to the score sheets found throughout this Wingspan Utilities application

From start to finish, this guide should take approx. 10-15 minutes to follow.

## Creating a Wingspan Tracker Sheet

+ Navigate to the [blank Wingspan tracker Sheet](https://docs.google.com/spreadsheets/d/10GoCP8AZ7hhurscRSbggIbDGG8VhBn5YajbWVUoWhlE)
+ Click on `File` > `Make a copy`
+ Rename the new Sheet how you'd like and click `Make a Copy`
+ Navigate to your newly copied Wingspan Tracker Sheet

## Deploying a Google Web App

+ Click on `Extensions` > `Apps Script`
+ In the code editor, replace the default code with the contents of `gs/form_script.gs` ([link](https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/gs/form_script.gs))
+ Save the project and Run (this step may prompt authorize permissions, sometimes hidden under the **Advanced** section of the request)
+ Confirm the that script ran successfully via the execution log
+ In the top right of the page, click on `Deploy` > `New deployment`
+ Under the `Select type` cogwheel, choose `Web app`
+ Customize the fields as you wish and click `Deploy` (you may have to authorize permissions again)
+ If successful, you should be presented with a pop-up that contains a unique `Deployment ID` and a unique `Web App URL`. This URL is your personal `Web App URL` and will indicate to the Wingspan Utilities application score sheets to where your scores should posted

## Attaching your deployed Web App