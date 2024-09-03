//      .addItem('Finalise Assignments', 'test')
// MarkAttended and Close
// https://woocommerce.github.io/woocommerce-rest-api-docs/#batch-update-orders

// Get all IDs
// SELECT order_id  FROM wp_order_product_customer_lookup where product_id=$id AND status='wc-processing' AND cc_attendance='pending'
// Make on hold

function sendAllCragAssignments(tellme) {

  const action = tellme
  var sconn = Jdbc.getConnection(url, username, password);
  var sstmt = sconn.createStatement();

  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
  var product_id = sheet.getRange('B5').getValues();
  //var product_id = "3103";

  var order_results = sstmt.executeQuery('SELECT distinct order_id from wp_order_product_customer_lookup where product_id="' + product_id + '" AND (cc_attendance_sim="pending" OR cc_attendance_sim IS NULL) LIMIT 99');
  let active_user = Session.getActiveUser().getEmail();
  let currentUnixTime = Date.now();
  //var order_results = sstmt.executeQuery('select "3575"');

  while (order_results.next()) {

    scores_arr = [];
    for (let col = 0; col < 1; col++) {
      scores_arr.push(order_results.getString(col + 1));
    }
    console.log(scores_arr);


    let order_id = scores_arr[0];


    if (action === "close") {

            var data = {
//"status": "completed",
              "meta_data": [
                {
                  "key": "cc_attendance_sim_set_by",
                  "value": active_user
                },
                {
                  "key": "cc_attendance_sim_set_at",
                  "value": currentUnixTime
                },
                {
                  "key": "cc_attendance_sim",
                  "value": "attended"
                }

              ]
            }
            Logger.log(data);


            pokeToWordPressOrders(data, order_id);






    } else if (action === "location") {


            var data = {
              "id": order_id,
              //"status": "on-hold",
              "meta_data": [
                {
                  "key": "cc_location_sim_signed_off_by",
                  "value": active_user
                },
                {
                  "key": "cc_location_sim_finalised_at",
                  "value": currentUnixTime
                }
              ]
            }

            Logger.log(data);


            pokeToWordPressOrders(data, order_id);

} else if (action === "reset") {


            var data = {
              "meta_data": [
                {
                  "key": "cc_volunteer_attendance_sim",
                  "value": "pending"
                },
                {
                  "key": "cc_volunteer_sim",
                  "value": "none"
                },
                {
                  "key": "cc_location_sim",
                  "value": "none"
                },
                {
                  "key": "cc_location_sim_signed_off_by",
                  "value": ""
                },
                {
                  "key": "cc_location_sim_finalised_at",
                  "value": ""
                },
                {
                  "key": "cc_attendance_sim_set_by",
                  "value": ""
                },
                {
                  "key": "cc_attendance_sim",
                  "value": "pending"
                }

              ]
            }
            Logger.log(data);


            pokeToWordPressOrders(data, order_id);

    } else {
      console.log("All done")
    }
    //conn.close();

    //console.log("done")
  }


  if (action === "close") {

/*
    var data = {
      "status": "private",
      "meta_data": [
        {
          "key": "cc_post_set_private_set_by",
          "value": active_user
        },
        {
          "key": "cc_post_set_private_set_at",
          "value": currentUnixTime
        }

      ]

    }
    */
    console.log("data");
/*
    pokeToWordPressProducts(data, product_id);
*/
  } else {
    console.log("All done")
  }



}


//console.log(cell);


function markAttendedAndCloseEvent() {

        if (Browser.msgBox("This will mark all those who haven't been cancelled as ATTENDED and will close the event", Browser.Buttons.OK_CANCEL) == "ok") {
        if (Browser.msgBox("This should be done on Thursday evening", Browser.Buttons.OK_CANCEL) == "ok") {

          if (Browser.msgBox("This cannot be undone", Browser.Buttons.OK_CANCEL) == "ok") {
          if (Browser.msgBox("SIMULATOR: everyone was marked completed and the event was closed successfully", Browser.Buttons.OK_CANCEL) == "ok") {
          if (Browser.msgBox("SIMULATOR: this also closed the event on the website for signup", Browser.Buttons.OK_CANCEL) == "ok") {


  sendAllCragAssignments("close");
  //markEventComplete;
  /// Close the event 
          }}}}}
}

function finaliseCragLocations() {

        if (Browser.msgBox("This will finalise the locations and email everyone their locations immediately", Browser.Buttons.OK_CANCEL) == "ok") {
        if (Browser.msgBox("This should be done after 12:00 on Wed", Browser.Buttons.OK_CANCEL) == "ok") {
          if (Browser.msgBox("After this, you cant change any locations", Browser.Buttons.OK_CANCEL) == "ok") {
          if (Browser.msgBox("SIMULATOR: this completed successfully and everyone was emailed", Browser.Buttons.OK_CANCEL) == "ok") {


  sendAllCragAssignments("location");

            }}}}
}

function ResetSimulator() {

        if (Browser.msgBox("This will reset the simulator", Browser.Buttons.OK_CANCEL) == "ok") {
        if (Browser.msgBox("Any selections for this week will not be saved", Browser.Buttons.OK_CANCEL) == "ok") {


  sendAllCragAssignments("reset");
    readData();

            }}
            
}

