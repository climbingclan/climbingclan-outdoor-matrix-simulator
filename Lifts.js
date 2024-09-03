function readLifts() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();


// https://docs.traveltime.com/api/overview/introduction
// https://developers.google.com/maps/documentation/distance-matrix/distance-matrix#maps_http_distancematrix_latlng-sh


 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
 var cell = sheet.getRange('B5').getValues();
 
 var results = stmt.executeQuery('select distinct `cc_outdoor_location_sim` "Venue", `nickname` "Facebook Name",`transport-need-lift` "Need lift", `transport-will-you-give-lift` "Can give lift", `transport-leaving-location` "Location",`admin-outdoors-requests-notes` "Requests and notes", pd.order_id from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND cc_attendance_sim in ("pending") order by `cc_outdoor_location_sim` ,`transport-need-lift` desc,`transport-will-you-give-lift` desc,`order_created` Desc');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Lifts');
 sheet.clearContents();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnLabel(col + 1));
 }
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }

// var range = SpreadsheetApp.getActive().getRange("Output!B2:B999");
//range.insertCheckboxes();
sheet.autoResizeColumns(1, numCols+1);

//readCragsData();
//Volunteerdata();


results.close();
stmt.close();

} 