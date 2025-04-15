var scriptProp = PropertiesService.getScriptProperties()
var REDIRECT_URL = "https://wingspan-utilities-vd2qp.ondigitalocean.app/";

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function redirect() {
  return HtmlService.createHtmlOutput(
    `<script>window.open('${REDIRECT_URL}', '_self');</script>`
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
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return HtmlService.createHtmlOutput(
      `<script>window.open('${REDIRECT_URL}', '_self');</script>`
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