
var config = {
  apiKey: "AIzaSyBuU1c53vtVJUNsoNGgBm-2lvQNFpgZDVs",
  authDomain: "funky-scout-326ed.firebaseapp.com",
  databaseURL: "https://funky-scout-326ed.firebaseio.com",
  storageBucket: "funky-scout-326ed.appspot.com"
};

var firebaseApp = firebase.initializeApp(config);
var superScoutRef = firebaseApp.database().ref("superscout");

function loadTableData() {
  superScoutRef.on("child_added", function(matchSnapshot) {
    var matchNumber = matchSnapshot.key.toString().substring(14);
    var matchNumberRef = superScoutRef.child(matchSnapshot.key);

    var allianceColor = "";
    var teamFouls = "";
    var foulReasons = "";
    var teamYCards = "";
    var yCardReasons = "";
    var hpErrors = "";
    var pilotErrors = "";
    // MISC
    var comments = "";

    matchNumberRef.on("child_added", function(allianceSnapshot) {
      if (allianceSnapshot.key.toString().substring(16) !== "") {
        if (allianceSnapshot.key.toString().substring(16) === "NaN") {
          allianceColor += " / ";
        } else {
          allianceColor += allianceSnapshot.key.toString().substring(16) + " / ";
        }
        teamFouls += allianceSnapshot.child("foulTeamNumbers").val().toString() + " / ";
        foulReasons += allianceSnapshot.child("foulReasons").val().toString() + " / ";
        teamYCards += allianceSnapshot.child("yCardTeamNumbers").val().toString() + " / ";
        yCardReasons += allianceSnapshot.child("yCardReasons").val().toString() + " / ";
        hpErrors += allianceSnapshot.child("hpErrors").val().toString() + " / ";
        pilotErrors += allianceSnapshot.child("pilotErrors").val().toString() + " / ";
        // MISC SUMMATION
        comments += matchSnapshot.child("comments").val() + " / ";
      }
    });

    allianceColor = allianceColor.substring(0, allianceColor.length-3);
    teamFouls = teamFouls.substring(0, teamFouls.length-3);
    foulReasons = foulReasons.substring(0, foulReasons.length-3);
    teamYCards = teamYCards.substring(0, teamYCards.length-3);
    yCardReasons = yCardReasons.substring(0, yCardReasons.length-3);
    hpErrors = hpErrors.substring(0, hpErrors.length-3);
    pilotErrors = pilotErrors.substring(0, pilotErrors.length-3);
    comments = comments.substring(0, comments.length-3);

    var teamArray = [
      teamFouls.substring(0, teamFouls.indexOf("/")-1),
      teamFouls.substring(teamFouls.indexOf("/")+2),
      teamYCards.substring(0, teamYCards.indexOf("/")-1),
      teamYCards.substring(teamYCards.indexOf("/")+2)
    ];
    var reasonArray = [
      foulReasons.substring(0, foulReasons.indexOf("/")-1),
      foulReasons.substring(foulReasons.indexOf("/")+2),
      yCardReasons.substring(0, yCardReasons.indexOf("/")-1),
      yCardReasons.substring(yCardReasons.indexOf("/")+2)
    ];

    for (var i=0; i<teamArray.length; i++) {
      if (i < 2) {
        var alliance = allianceColor.substring(0, allianceColor.indexOf("/")-1);
        var foulOrYCard = "Foul";
      } else {
        var alliance = allianceColor.substring(allianceColor.indexOf("/")+2);
        var foulOrYCard = "Yellow Card";
      }
      if (teamArray[i] > 0) {
        document.getElementById("teams").innerHTML += '<tr class="team" id="'+teamArray[i]+'" onclick="loadTeamInfo();">'
            +'<td class="mdl-data-table__cell--non-numeric">'+teamArray[i]+'</td>'
            +'<td class="mdl-data-table__cell--non-numeric">'+matchNumber+'</td>'
            +'<td class="mdl-data-table__cell--non-numeric">'+alliance+'</td>'
            +'<td class="mdl-data-table__cell--non-numeric">'+foulOrYCard+'</td>'
            +'<td class="mdl-data-table__cell--non-numeric">'+reasonArray[i]+'</td>'
          +'</tr>';
      }
    }
  });
}
