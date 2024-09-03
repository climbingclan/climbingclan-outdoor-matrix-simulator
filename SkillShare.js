function readSkillShare() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

 //Diet
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
 var cell = sheet.getRange('B5').getValues();
 
 var results = stmt.executeQuery('select distinct `cc_outdoor_location_sim` as `Venue`, `nickname` as "Facebook Name", `climbing-trad-skills-passing-on` "Trad Skills", `climbing-sport-skills-passing-on` "Sport Skills", `climbing-indoors-skills-passing-on` "Indoor Skills", `admin-outdoors-requests-notes` "Requests and notes", pd.order_id from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id where product_id=' + cell + ' AND cc_attendance_sim in ("pending")  order by `cc_outdoor_location_sim` ,`climbing-trad-skills-passing-on` desc,`climbing-sport-skills-passing-on` desc,`order_created` Desc');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-SkillShare');
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