function assignSundayPromo1() {
  var volunteerrole = "SundayPromo1"
  var metakey = "cc_volunteer_sim"
  var orderstatus = "on-hold"
  var metavalue = "sundaypromo1"

  assignRole(volunteerrole, metavalue)
}

function assignMondayPromo1() {
  var volunteerrole = "MondayPromo1"
  var metakey = "cc_volunteer_sim"
  var orderstatus = "on-hold"
  var metavalue = "mondaypromo1"

  assignRole(volunteerrole, metavalue)
}

function assignMondayPromo2() {
  var volunteerrole = "MondayPromo2"
  var metakey = "cc_volunteer_sim"
  var orderstatus = "on-hold"
  var metavalue = "mondaypromo2"

  assignRole(volunteerrole, metavalue)
}

function assignMessageLord() {
  var volunteerrole = "Message Lord"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "outdoor_messagelord"

  assignRole(volunteerrole, metavalue)
}

function assignGroupMaker() {
  var volunteerrole = "Group Maker"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "outdoor_groupmaker"

  assignRole(volunteerrole, metavalue)
}

function assignWeekDirector() {
  var volunteerrole = "Week Director"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "trip_director"

  assignRole(volunteerrole, metavalue)
}

function assignCragCoordinator() {
  var volunteerrole = "Crag Coordinator"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "outdoor_cragcoordinator1"

  assignRole(volunteerrole, metavalue)
}

function assignAssistantCragCoordinator() {
  var volunteerrole = "Assistant Crag Coordinator"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "outdoor_assistantcragcoordinator1"

  assignRole(volunteerrole, metavalue)
}

function assignCragReporter() {
  var volunteerrole = "Crag Reporter"
  var metakey = "cc_volunteer"
  var orderstatus = "on-hold"
  var metavalue = "outdoor_postpromo1"

  assignRole(volunteerrole, metavalue)
}

function markVolunteerClear() {

  if (Browser.msgBox("This wont notify the person automatically that their roles has been cancelled - you will want to do that", Browser.Buttons.OK_CANCEL) == "ok") {

    var volunteerrole = "No Role"
    var metakey = "cc_volunteer"
    //var orderstatus = "processing"
    var metavalue = "none"

    assignRole(volunteerrole, metavalue)
  }
}


function assignRole(volunteerrole, metavalue) {

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Sim-Volunteering');
  var active_range = sheet.getActiveRange();
  var currentRow = active_range.getRowIndex();
  //var currentRow = "5";
  console.log(currentRow);


  if (currentRow <= 1) { Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return; }
  if (currentRow >= 100) { Browser.msgBox('Select an actual signup', Browser.Buttons.OK); return; }


  var order_id = sheet.getRange(currentRow, 14, 1, 1).getValue();  /// get submission ID 1 BV ( was 67)
  var first_name = sheet.getRange(currentRow, 3, 1, 1).getValue();  /// get submission ID 1 BV ( was 67)

  console.log(order_id);

  if (order_id === "" || order_id === "order_id") { Browser.msgBox('No Order ID Found', Browser.Buttons.OK); return; }

  /**
    var encodedAuthInformation = Utilities.base64Encode(apiusername+ ":" + apipassword);
    var headers = {"Authorization" : "Basic " + encodedAuthInformation};
    var options = {
    'method' : 'get',
    'contentType': 'application/json',
      'headers': headers,  // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  url="https://www."+ apidomain + "/wp-json/wc/v3/orders/" + order_id
  
  var response = UrlFetchApp.fetch(url, options);
    console.log(response);
   */


  if (Browser.msgBox("Assign " + volunteerrole + " to " + first_name + "? \n Order " + order_id, Browser.Buttons.OK_CANCEL) == "ok") {
  if (Browser.msgBox("SIMULATOR: this person was assign their role and emailed how to do it", Browser.Buttons.OK_CANCEL) == "ok") {



    var cc_role_assigner = Session.getActiveUser().getEmail();

    var data = {
      "meta_data": [
        {
          "key": "cc_volunteer_sim",
          "value": metavalue
        },
        {
          "key": "cc_volunteer_sim_role_assigned_by",
          "value": cc_role_assigner
        }
      ],
    };
//    console.log(orderstatus);

    var encodedAuthInformation = Utilities.base64Encode(apiusername + ":" + apipassword);
    var headers = { "Authorization": "Basic " + encodedAuthInformation };
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'headers': headers,  // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };
    url = "https://www." + apidomain + "/wp-json/wc/v3/orders/" + order_id

    var response = UrlFetchApp.fetch(url, options);
    console.log(response);




    let assignedrole = [[metavalue]];
    sheet.getRange(currentRow, 4, 1, 1).setValues(assignedrole);   // paste the blank variables into the cells to delete contents
  }
  }
}


