function Volunteerdata() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();

// Volunteering Report
//
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Dashboard');
  var cell = sheet.getRange('B5').getValues();


 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sim-Volunteering');
 sheet.clearContents();
  sheet.clearFormats();




// start of volunteering function
function volunteering(querystring, title,flip)
{
sheet.appendRow([title]);
//var tobold = sheet.getRange(getLastRow());
let row = sheet.getLastRow();
//console.log(row);
sheet.getRange(row, 1, 2, 25).setFontWeight("bold");
if (flip==="volunteers") {

 var results = stmt.executeQuery('select `cc_outdoor_location_sim` "Simulated Location",`first_name` "First Name",`nickname` "Facebook Name",pd.cc_volunteer_sim "Simulated Roles",volunteer_outdoor_preevent_facebook_promo "FB promo", volunteer_outdoor_crag_coordinator "Crg Coord", volunteer_outdoor_event_reporter "Crg Rprtr", volunteer_outdoor_group_maker "Grp Mkr", volunteer_outdoor_message_lord "Mssngr Groups",volunteer_outdoor_event_director "Event Dir",scores_volunteer_score_cached "Receptiveness",stats_volunteer_for_denominator_cached "Attended",  `admin-outdoors-requests-notes` "Requests and notes", pd.order_id from wp_member_db db JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id join wp_member_db_volunteering vl on pd.user_id = vl.id where product_id=' + cell + ' AND cc_attendance_sim in ("pending") AND `admin-first-timer-question`="no" AND (`admin-can-you-help-outdoors`<>"" OR pd.cc_volunteer_sim<>"none")  order by `cc_outdoor_location_sim`, FIELD(pd.cc_volunteer_sim,"none",  "outdoor_cragcoordinator1", "outdoor_assistantcragcoordinator1", "outdoor_postpromo1", "mondaypromo1", "mondaypromo2", "outdoor_messagelord") asc, CAST(db.scores_volunteer_score_cached AS UNSIGNED INTEGER) asc,pd.cc_volunteer_sim desc,volunteer_outdoor_preevent_facebook_promo,volunteer_outdoor_crag_coordinator,volunteer_outdoor_event_reporter, CAST(db.scores_volunteer_score_cached AS UNSIGNED INTEGER) asc'); 
  //console.log(results);

  }
else if (flip==="non-volunteers"){
 var results = stmt.executeQuery('select `cc_outdoor_location_sim` "Simulated Location",`first_name` "First Name",`nickname` "Facebook Name",pd.cc_volunteer_sim "Simulated Roles",volunteer_outdoor_preevent_facebook_promo "FB promo", volunteer_outdoor_crag_coordinator "Crg Coord", volunteer_outdoor_event_reporter "Crg Rprtr", volunteer_outdoor_group_maker "Grp Mkr", volunteer_outdoor_message_lord "Mssngr Groups",volunteer_outdoor_event_director "Event Dir",scores_volunteer_score_cached "Receptiveness",stats_volunteer_for_denominator_cached "Attended",  `admin-outdoors-requests-notes` "Requests and notes", pd.order_id from wp_member_db db JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id join wp_member_db_volunteering vl on pd.user_id = vl.id  where product_id=' + cell + ' AND cc_attendance_sim in ("pending") AND  `admin-first-timer-question`="no" AND (`admin-can-you-help-outdoors`="" OR `admin-can-you-help-outdoors` is null ) AND pd.cc_volunteer_sim="none" AND scores_volunteer_score_cached<>"" AND CAST(stats_volunteer_for_denominator_cached AS UNSIGNED INTEGER)>="3"  order by pd.cc_volunteer_sim asc, CAST(db.scores_volunteer_score_cached AS UNSIGNED INTEGER) asc,CAST(db.stats_volunteer_for_denominator_cached AS UNSIGNED INTEGER) desc') 
}

 var metaData=results.getMetaData();
  var numCols = metaData.getColumnCount();
 var arr=[];
  for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnLabel(col + 1));
 }
 // https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js 
  sheet.appendRow(arr);
 while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
 }
sheet.autoResizeColumns(1, numCols+1);



} //end of volunteering

// full options
//help online beforehand,help at sign-in,help around announcements and cake time,do announcements,help online afterwards,be event director for the evening

volunteering("beforehand", "Volunteers","volunteers");
volunteering("beforehand", "People who haven't volunteered or been assigned","non-volunteers");

setColoursFormat(sheet, "D3:D1000","none","#DAF7A6 ")
setColoursFormat(sheet, "D3:C1000","Selected","#FFFFFF")
setColoursFormat(sheet, "D3:D1000","","#e0ffff")
 setTextFormat(sheet,"E2:M1000","No","#a9a9a9")
sheet.setColumnWidth(3, 160);
sheet.setColumnWidth(1, 150);
setWrapped(sheet,"m2:m1000");

sheet.setColumnWidth(13, 300);

} 

