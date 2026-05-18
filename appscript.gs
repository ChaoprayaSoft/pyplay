/**
 * PyPlay Academy - Google Apps Script Backend
 * Deployed as a Web App to sync user profiles, progress, and activity logs.
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var contents = e.postData.contents;
  if (!contents) return ContentService.createTextOutput("No data").setMimeType(ContentService.MimeType.TEXT);
  
  var data = JSON.parse(contents);
  
  if (data.type === 'user') {
    return handleUserUpdate(ss, data);
  } else if (data.type === 'log') {
    return handleActivityLog(ss, data);
  }
  
  return ContentService.createTextOutput("Unknown Action").setMimeType(ContentService.MimeType.TEXT);
}

function handleUserUpdate(ss, data) {
  var sheet = ss.getSheetByName("Users");
  if (!sheet) {
    sheet = ss.insertSheet("Users");
    sheet.appendRow(["Email", "Name", "Avatar", "Color", "Role", "Progress", "Last Updated"]);
    sheet.setFrozenRows(1);
  }

  var email = data.email;
  var rows = sheet.getDataRange().getValues();
  var rowIndex = -1;

  // Find existing user by email
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === email) {
      rowIndex = i + 1;
      break;
    }
  }

  var rowData = [
    data.email,
    data.name,
    data.avatar || "🐱",
    data.color || "#3b82f6",
    data.role || "Learner",
    typeof data.progress === 'object' ? JSON.stringify(data.progress) : data.progress || "{}",
    data.lastUpdated || new Date().toISOString()
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, 7).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

function handleActivityLog(ss, data) {
  var logSheet = ss.getSheetByName("Logs");
  if (!logSheet) {
    logSheet = ss.insertSheet("Logs");
    logSheet.appendRow(["Timestamp", "Email", "Name", "Status"]);
    logSheet.setFrozenRows(1);
  }
  
  logSheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.email,
    data.name,
    data.status || "Activity"
  ]);
  
  return ContentService.createTextOutput("Logged").setMimeType(ContentService.MimeType.TEXT);
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = e.parameter.action;
  
  if (action === 'get_all_users') {
    return getAllUsers(ss, e.parameter.callback);
  }
  
  var email = e.parameter.email;
  var callback = e.parameter.callback;
  
  var sheet = ss.getSheetByName("Users");
  if (!sheet || !email) return sendResponse(null, callback);

  var rows = sheet.getDataRange().getValues();
  var user = null;

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === email) {
      user = {
        email: rows[i][0],
        name: rows[i][1],
        avatar: rows[i][2],
        color: rows[i][3],
        role: rows[i][4],
        progress: rows[i][5],
        lastUpdated: rows[i][6]
      };
      break;
    }
  }

  return sendResponse(user, callback);
}

function getAllUsers(ss, callback) {
  var sheet = ss.getSheetByName("Users");
  if (!sheet) return sendResponse([], callback);
  
  var rows = sheet.getDataRange().getValues();
  var users = [];
  
  for (var i = 1; i < rows.length; i++) {
    users.push({
      email: rows[i][0],
      name: rows[i][1],
      avatar: rows[i][2],
      color: rows[i][3],
      role: rows[i][4],
      progress: rows[i][5],
      lastUpdated: rows[i][6]
    });
  }
  
  return sendResponse(users, callback);
}

function sendResponse(data, callback) {
  var jsonResponse = JSON.stringify(data);
  if (callback) {
    var output = callback + "(" + jsonResponse + ")";
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
  }
}
