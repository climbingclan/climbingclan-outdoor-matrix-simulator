function readCragsData(){
  var conn = Jdbc.getConnection(url, username, password);
  var stmt = conn.createStatement();
let cell = setupCell("Sim-Dashboard","B5")
let sheet = setupSheet("Sim-Crags")

  var results = stmt.executeQuery('select distinct `cc_outdoor_location_sim` "SIMULATED Venue", `cc_volunteer_sim` AS "SIMULATED Role", `first_name` "Name",`nickname` "FB Name",`admin-first-timer-outdoor` "New?",`climbing-discipline-preference` "Sp or Tr?",  `skills-trad-climbing` "Trad Skills", `skills-sport-climbing` "Sport Skills", gear_bringing_rack "Rack",gear_bringing_rope "Rope",`climbing-indoors-toproping-grades` "Indoor TR",`transport-need-lift` "Lift?", `transport-leaving-location` "Location",`admin-outdoors-requests-notes` "Requests and notes", climbing_outdoor_crag_location_preference "Crag pref",scores_attendance_reliability_score_cached "Attendce %", `skills-belaying` "Belaying Skills",pd.order_id "Order ID" from wp_member_db db LEFT JOIN wp_order_product_customer_lookup pd on pd.user_id = db.id JOIN wp_member_db_gear gr on pd.user_id = gr.id JOIN wp_member_db_skills sk on pd.user_id = sk.id where product_id=' + cell + '  order by FIELD(`cc_outdoor_location_sim`,"none","", "bamford_edge", "harpurhill",  "wilton1", "wilton2", "wilton3", "wilton4", "cadshaw", "windgather") Asc,`cc_outdoor_location`,cc_volunteer_sim desc, gear_bringing_rack Desc, skills_belaying_lead Desc, `skills-trad-climbing` Asc,`skills-sport-climbing` Asc, `climbing-indoors-toproping-grades` Desc');
  appendToSheet(sheet, results);
sheet.setColumnWidth(1, 80);
sheet.setColumnWidth(2, 110);
sheet.setColumnWidth(3, 60);
sheet.setColumnWidth(4, 130);
sheet.setColumnWidth(5, 50);
sheet.setColumnWidth(6, 60);
sheet.setColumnWidth(7, 80);
sheet.setColumnWidth(8, 80);
sheet.setColumnWidth(9, 50);
sheet.setColumnWidth(10, 50);
sheet.setColumnWidth(11, 60);
sheet.setColumnWidth(12, 50);
sheet.setColumnWidth(15, 80);
sheet.setColumnWidth(14, 250);
sheet.setColumnWidth(13, 150);

setWrapped(sheet,"n2:n1000");

 setColoursFormat(sheet,"A1:A1000","wind","#ffcccb")
  setColoursFormat(sheet,"A1:A1000","hobson","#D1FF19")
 setColoursFormat(sheet,"a1:a1000","wilton","#ADD8E6")
  //setColoursFormat(sheet, "E2:E1000","","#D1FF19")

 setTextFormat(sheet,"E2:L1000","No","#a9a9a9")
 setTextFormat(sheet,"a2:a1000","none","#a9a9a9")

 setColoursFormat(sheet,"Q1:Q1000","learner-lead-belayer","#D1FF19")
 setColoursFormat(sheet,"Q1:Q1000","lead-belayer","#5CFF5C")
 setColoursFormat(sheet,"Q1:Q1000","top","#ADD8E6")
 setColoursFormat(sheet,"Q1:Q1000","No-belaying","#ffcccb")
setColoursFormat(sheet, "B2:B1000","","#e0ffff")
setColoursFormat(sheet,"K1:L1000","Yes","#ffcccb")
setColoursFormat(sheet,"G1:H1000","lead trad","#5CFF5C")
setColoursFormat(sheet,"G1:H1000","top rope trad","#5CFF5C")
setColoursFormat(sheet,"G1:H1000","seconding","#FFFF8A")
setColoursFormat(sheet,"G1:H1000","learning","#D1FF19")
setColoursFormat(sheet,"H1:I1000","Lead Outdoors","#90ee90")
setColoursFormat(sheet,"H1:I1000","Lead Indoors","#D1FF19")
setColoursFormat(sheet,"H1:I1000","Strip but no","#D1FF19")
 setColoursFormat(sheet,"F1:F1000","Trad but happy to","#8A8AFF")
 setColoursFormat(sheet,"F1:F1000","Sport but happy to","#D7A1F9")
 setColoursFormat(sheet,"F1:F1000","Trad","#2E2EFF")
 setColoursFormat(sheet,"F1:F1000","Sport","#B24BF3")
setColoursFormat(sheet,"N2:N1000","","#FFFF8A")

setColoursFormatLessThanOrEqualTo(sheet, "P2:P1000","50","#fad02c")
setColoursFormatLessThanOrEqualTo(sheet, "P2:P1000","80","#ff75d8")
setColoursFormatLessThanOrEqualTo(sheet, "P2:P1000","90","#ffd898")





  results.close();
  stmt.close();





}
