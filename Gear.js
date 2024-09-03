function readGear() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

 //Diet
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
 var cell = sheet.getRange('B5').getValues();
 
 var results = stmt.executeQuery('select distinct `cc_outdoor_location_sim` "Venue", `nickname` "Facebook Name",gear_bringing_personal_gear "helmet etc",gear_bringing_rack "Rack",gear_bringing_rope "Rope",gear_bringing_quickdraws "Quickdraws",gear_bringing_guidebook "Guidebook",  `skills-trad-climbing` "Trad Skills", `skills-sport-climbing` "Sport Skills",`admin-outdoors-requests-notes` "Requests and notes",`gear-bringing-evening-or-day-trip` "Gear",  pd.order_id from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id JOIN wp_member_db_gear gr on pd.user_id = gr.id where product_id=' + cell + ' AND cc_attendance_sim in ("pending") order by `cc_outdoor_location_sim` ,gear_bringing_personal_gear Desc, gear_bringing_rack Desc,gear_bringing_rope Desc, `transport-need-lift` desc,gear_bringing_quickdraws desc,gear_bringing_guidebook desc,`skills-trad-climbing`,`order_created` Desc');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Gear');
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



results.close();
stmt.close();

} 