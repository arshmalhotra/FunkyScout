
var config = {
  apiKey: "AIzaSyBuU1c53vtVJUNsoNGgBm-2lvQNFpgZDVs",
  authDomain: "funky-scout-326ed.firebaseapp.com",
  databaseURL: "https://funky-scout-326ed.firebaseio.com",
  storageBucket: "funky-scout-326ed.appspot.com"
};

var firebaseApp = firebase.initializeApp(config);
var pitScoutRef = firebaseApp.database().ref("pitscout");

function loadTableData() {
  pitScoutRef.on("child_added", function(teamSnapshot) {
    var teamNumber = teamSnapshot.key.toString().substring(13);

    var drivetrain = teamSnapshot.child("drivetrain").val();
    if (drivetrain === "Other") {
      drivetrain = teamSnapshot.child("drivetrainOther").val();
    }
    var speed = teamSnapshot.child("speed").val();
    var speedShift = teamSnapshot.child("speedShift").val();
    var secondSpeed = teamSnapshot.child("secondSpeed").val();
    // GAME PLAY
    var gearCycle = teamSnapshot.child("gearCycle").val();
    var gearIntake = teamSnapshot.child("gearIntake").val();
    var gearRelease = teamSnapshot.child("gearRelease").val();
    var hpPilot = teamSnapshot.child("hpPilot").val();
    var ropeType = teamSnapshot.child("ropeType").val();
    var highShootingLocations = teamSnapshot.child("highShootingLocation").val();
    var fuelPickup = teamSnapshot.child("fuelPickup").val();
    // AUTONOMOUS
    var autoStartingLocations = teamSnapshot.child("startingLocations").val();
    var baselineAuto = teamSnapshot.child("baselineAuto").val();
    var gearAuto = teamSnapshot.child("gearAuto").val();
    if (gearAuto) {
      baselineAuto = true;
    }
    var highFuelAuto = teamSnapshot.child("highFuelAuto").val();
    var lowFuelAuto = teamSnapshot.child("lowFuelAuto").val();
    // CONSTRUCTION
    var tallShort = teamSnapshot.child("tallShort").val();
    var cheesecakeClimber = teamSnapshot.child("cheesecakeClimber").val();
    var bumperQuality = teamSnapshot.child("bumperQuality").val();
    // MISC
    var comments = teamSnapshot.child("comments").val();

    var autoRoutine = "";
    var speeds = "";

    if (baselineAuto) autoRoutine += "Basline, ";
    if (gearAuto) gearAuto += "Gear, ";
    if (highFuelAuto) highFuelAuto += "High Fuel, ";
    if (lowFuelAuto) lowFuelAuto += "Low Fuel, ";

    if (speedShift) speeds = speed + ", " + secondSpeed;
    if (!speedShift) speeds = speed;

    autoRoutine = autoRoutine.substring(0, autoRoutine.length-2);

    document.getElementById("teams").innerHTML += '<tr class="team" id="'+teamNumber+'">'
        +'<td class="mdl-data-table__cell--non-numeric">'+teamNumber+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+drivetrain+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+speeds+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+gearCycle+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+gearIntake+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+gearRelease+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+hpPilot+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+ropeType+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+highShootingLocations+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+fuelPickup+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+autoStartingLocations+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+autoRoutine+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+tallShort+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+cheesecakeClimber+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+bumperQuality+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+comments+'</td>'
      +'</tr>';
  });
}
