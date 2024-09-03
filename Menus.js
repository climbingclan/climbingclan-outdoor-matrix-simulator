function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Mark an Attendance')

      .addItem('Mark Cancelled', 'markCancelled')
      .addItem('Mark Late Bail', 'markLateBail')
      .addItem('Mark No Show', 'markNoShow')
      .addSeparator()
      .addItem('Mark Duplicate', 'markDuplicate')
      .addSeparator()
//      .addItem('Mark Attended', 'markAttended')
     // .addItem('NOT WORKING - Did not Register but showed', 'markNoRegisterShow')
     .addItem('Mark ALL Attended', 'markAttendedAndCloseEvent')


      .addToUi();

   // create menu for dispatch  functions
  ui.createMenu('Assign a Sim Role')

      .addItem('Crag Coordinator', 'assignCragCoordinator')
      .addItem('Assistant Crag Coordinator', 'assignAssistantCragCoordinator')
      .addItem('Crag Reporter', 'assignCragReporter')
      .addSeparator()
      .addItem('Message Lord', 'assignMessageLord')
      .addItem('Group Creator', 'assignGroupCreator')
      .addItem('Week Director', 'assignTripDirector')
      .addSeparator()

//      .addSeparator()
//      .addItem('SundayPromo1', 'assignSundayPromo1')
//      .addItem('SundayPromo2', 'assignSundayPromo2')
      .addItem('MondayPromo1', 'assignMondayPromo1')
      .addItem('MondayPromo2', 'assignMondayPromo2')
      .addSeparator()


      .addItem('Unassign Role', 'markVolunteerClear')

      .addToUi();   

      



  ui.createMenu('Send to Sim Crag ')
      .addItem('Wilton 3', 'sendWilton3')
      .addItem('Castle Cadshaw Rocks', 'sendCadshaw')
      .addItem('Wilton 1', 'sendWilton1')
      .addItem('Wilton 2', 'sendWilton2')
      .addItem('Wilton 4', 'sendWilton4')
      .addItem('Egerton Quarry', 'sendEgerton')
      .addItem('Anglezarke Quarry', 'sendAnglezarke')
      .addItem('Denham Hill Quarry', 'sendDenham')
      .addSeparator()
      .addItem('Pule Hill Rocks', 'sendPuleHill')
      .addItem('Heptonstall Rocks', 'sendHeptonstall')
      .addItem('Hobson Moor Quarry', 'sendHobsonMoor')
      .addSeparator()
      .addItem('Windgather', 'sendWindgather')
      .addItem('Castle Naze', 'sendCastleNaze')
      .addSeparator()
      .addItem('Horsethief Quarry', 'sendHorsethief')
      .addItem('Harpur Hill Quarry', 'sendkHarpurHill')
      .addItem('Horseshoe Quarry', 'sendHorseshoe')
      .addSeparator()
      .addItem('Stanage Popular', 'sendStanagePopular')
      .addItem('Froggatt Edge', 'sendFroggatt')
      .addItem('Bamford Edge', 'sendBamford')
      .addItem('The Roaches', 'sendRoaches')
      .addSeparator()
      .addItem('Finalise ALL Assignments', 'finaliseCragLocations')


      .addToUi();   

  ui.createMenu('Refresh the Matrix')
      .addItem('Refresh All Simulated reports', 'readData')
      .addSeparator()
      .addItem('Refresh Sim Crags', 'readCragsData')
      .addItem('Refresh Sim Volunteering', 'Volunteerdata')
      .addSeparator()
      .addItem('Refresh Sim Transport', 'readLifts')
      .addItem('Refresh Sim Skills', 'readSkills')
      .addItem('Refresh Sim Gear', 'readGear')
      .addItem('Refresh Sim Skillshare', 'readSkillShare')
      .addItem('Refresh Sim Grades', 'readGrades')

      .addToUi();   

        ui.createMenu('Simulation resets')
      .addItem('Initialise and Reset the Simulator', 'ResetSimulator')


      .addToUi();   

}