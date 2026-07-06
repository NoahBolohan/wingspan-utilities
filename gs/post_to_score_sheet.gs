var scriptProp = PropertiesService.getScriptProperties()
var REDIRECT_URL = "https://wingspan-utilities-vd2qp.ondigitalocean.app/";

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function redirect() {
  return HtmlService.createHtmlOutput(
    `<script>window.open('${REDIRECT_URL}', '_top');</script>`
  );
}

function doGet() {
  Logger.log("GET request");
  var template = HtmlService.createTemplateFromFile("score_sheet_automa");
  template.url = ScriptApp.getService().getUrl();
  return template.evaluate();
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var sheetName = e.parameter["submit"]
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return (header === 'timestamp' && e.parameter[header] == '') ? new Date() : e.parameter[header]
      return e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    // return HtmlService.createHtmlOutput(
    //   "<script>window.location.href='https://wingspan-utilities-vd2qp.ondigitalocean.app/';</script>"
    // );

    return HtmlService.createHtmlOutput(
      '<style>body {background-image: url("https://raw.githubusercontent.com/NoahBolohan/wingspan-utilities/refs/heads/main/static/backgrounds/base_game_forest_habitat.jpg");div {background-color: yellow;}</style><div>Go back to return to the Score Sheet!</div>'
    );
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}