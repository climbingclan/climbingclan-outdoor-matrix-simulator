function readSkills() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

 //Diet
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
 var cell = sheet.getRange('B5').getValues();
 
 var results = stmt.executeQuery('select distinct `cc_outdoor_location_sim` AS "Venue", `nickname` AS "Facebook Name",`skills_belaying_top_rope` AS "TR Bly",skills_belaying_lead "Lead Bly",skills_trad_leading "Lead Trad",skills_sport_leading_outside "Sport Lead Outside",skills_sport_stripping "Sport Strip",skills_trad_seconding "Second Trad", skills_trad_toprope "Trad Toprope",`skills_belaying_lead_needs_supervision` "lead belay sup?",skills_trad_leading_needs_supervision "Trad lead with sup",skills_trad_seconding_needs_supervision "seconding with sup",skills_belaying_halfropes "twin belay",skills_trad_belay_escape "Trad Escape",skills_sport_seconding_outside "Sport Second",skills_sport_seconding_inside "Sport Second Inside", skills_sport_leading_inside "Sport Lead Inside",`skills-belaying` "Belaying Skills", `skills-trad-climbing` "Trad Skills", `skills-sport-climbing` "Sport Skills", `climbing-trad-skills-extra` "Trad Climbing Skills", `climbing-sport-skills-extra` "Sport Climbing Skills",`admin-outdoors-requests-notes` "Requests and notes", pd.order_id from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id JOIN wp_member_db_skills sk on pd.user_id = sk.id where product_id=' + cell + ' AND cc_attendance_sim in ("pending")  order by `cc_outdoor_location_sim` ,`skills_belaying_top_rope` asc,`skills_belaying_lead` desc,`skills_trad_leading` desc,`skills_trad_leading` desc,skills_sport_leading_outside desc, `order_created` Desc');
  //console.log(results);
 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Skills');
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