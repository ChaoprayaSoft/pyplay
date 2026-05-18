/**
 * PyPlay Academy - Google Apps Script Backend
 * Deployed as a Web App to sync user profiles, progress, and activity logs.
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var contents = e.postData ? e.postData.contents : null;
  if (!contents) {
    if (e.parameter && e.parameter.data) {
      contents = e.parameter.data;
    } else {
      return ContentService.createTextOutput("No data").setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  var data;
  try {
    data = JSON.parse(contents);
  } catch (err) {
    try {
      data = JSON.parse(decodeURIComponent(contents));
    } catch(err2) {
      return ContentService.createTextOutput("JSON Parse Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
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
  var existingRole = data.role || "Learner"; // default to payload role

  // Find existing user by email to preserve manually assigned roles (e.g. Admin)
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] === email) {
      rowIndex = i + 1;
      if (rows[i][4]) {
        existingRole = rows[i][4]; // Keep manual sheet assignment
      }
      break;
    }
  }

  var rowData = [
    data.email,
    data.name,
    data.avatar || "🐱",
    data.color || "#3b82f6",
    existingRole, // Preserved role (handles manual Google Sheet overrides)
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
  var callback = e.parameter.callback;
  
  if (action === 'get_all_users') {
    return getAllUsers(ss, callback);
  }
  
  var email = e.parameter.email;
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
