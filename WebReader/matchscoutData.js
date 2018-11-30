
var config = {
  apiKey: "AIzaSyBuU1c53vtVJUNsoNGgBm-2lvQNFpgZDVs",
  authDomain: "funky-scout-326ed.firebaseapp.com",
  databaseURL: "https://funky-scout-326ed.firebaseio.com",
  storageBucket: "funky-scout-326ed.appspot.com"
};

var firebaseApp = firebase.initializeApp(config);
var matchScoutRef = firebaseApp.database().ref("matchscout");

function loadTableData() {
  matchScoutRef.on("child_added", function(teamSnapshot) {
    var teamNumber = teamSnapshot.key.toString().substring(13);
    var teamNumberRef = matchScoutRef.child(teamSnapshot.key);
    // AUTONOMOUS
    var gearAutoSum = 0;
    var gearAutoSide = "";
    var numHighFuelAutoMatches = 0;
    var numLowFuelAutoMatches = 0;
    var highFuelAccuracyPercentAutoSum = 0;
    var lowFuelAccuracyPercentAutoSum = 0;
    // TELEOP
    var gearTeleopSum = 0;
    var numHighFuelTeleopMatches = 0;
    var numLowFuelTeleopMatches = 0;
    var highFuelAccuracyPercentTeleopSum = 0;
    var lowFuelAccuracyPercentTeleopSum = 0;
    var climbsAttempted = 0;
    var climbsFailed = 0;
    var ropeGrabTimeSum = 0;
    var ropeClimbTimeSum = 0;
    var failureReason = "";
    var numDefenseMatch = 0;
    var defenseQualitySum = 0;
    // MISC
    var comments = "";
    var counter = 0;

    teamNumberRef.on("child_added", function(matchSnapshot) {
      counter++;
      // AUTONOMOUS SUMMATION
      gearAutoSum += matchSnapshot.child("gearAuto").val();
      gearAutoSide += matchSnapshot.child("gearAutoSide").val() + " / ";
      if (matchSnapshot.child("highFuelAuto").val()) {
        numHighFuelAutoMatches++;
        highFuelAccuracyPercentAutoSum += matchSnapshot.child("highFuelAccuracyPercentAuto").val();
      }
      if (matchSnapshot.child("lowFuelAuto").val()) {
        numLowFuelAutoMatches++;
        lowFuelAccuracyPercentAutoSum += matchSnapshot.child("lowFuelAccuracyPercentAuto").val();
      }
      // TELEOP SUMMATION
      gearTeleopSum += matchSnapshot.child("gearTeleop").val();
      if (matchSnapshot.child("highFuelTeleop").val()) {
        numHighFuelTeleopMatches++;
        highFuelAccuracyPercentTeleopSum += matchSnapshot.child("highFuelAccuracyPercentTeleop").val();
      }
      if (matchSnapshot.child("lowFuelTeleop").val()) {
        numLowFuelTeleopMatches++;
        lowFuelAccuracyPercentTeleopSum += matchSnapshot.child("lowFuelAccuracyPercentTeleop").val();
      }
      if (matchSnapshot.child("climb").val()) climbsAttempted++;
      if (matchSnapshot.child("failed").val()) climbsFailed++;
      ropeGrabTimeSum += matchSnapshot.child("ropeGrabTime").val();
      ropeClimbTimeSum += matchSnapshot.child("ropeClimbTime").val();
      failureReason += matchSnapshot.child("failureReason").val() + " / ";
      if (matchSnapshot.child("defense").val()) numDefenseMatch++;
      switch (matchSnapshot.child("defenseQuality").val()) {
        case "Very Good":
          defenseQualitySum += 5;
          break;
        case "Good":
          defenseQualitySum += 4;
          break;
        case "Decent":
          defenseQualitySum += 3;
          break;
        case "Bad":
          defenseQualitySum += 2;
          break;
        case "Very Bad":
          defenseQualitySum += 1;
          break;
        default:
          defenseQualitySum += 0;
          break;

      }
      // MISC SUMMATION
      comments += matchSnapshot.child("comments").val() + " / ";
    });
    // AUTONOMOUS AVG
    var gearAutoAvg = Number(Math.round(gearAutoSum/counter+'e2')+'e-2');
    var highFuelAccuracyPercentAutoAvg = Number(Math.round(highFuelAccuracyPercentAutoSum/counter+'e2')+'e-2');
    var lowFuelAccuracyPercentAutoAvg = Number(Math.round(lowFuelAccuracyPercentAutoSum/counter+'e2')+'e-2');
    // TELEOP AVG
    var gearTeleopAvg = Number(Math.round(gearTeleopSum/counter+'e2')+'e-2');
    var highFuelAccuracyPercentTeleopAvg = Number(Math.round(highFuelAccuracyPercentTeleopSum/counter+'e2')+'e-2');
    var lowFuelAccuracyPercentTeleopAvg = Number(Math.round(lowFuelAccuracyPercentTeleopSum/counter+'e2')+'e-2');
    var climbsSucceeded = climbsAttempted - climbsFailed;
    var climbRate = Number(Math.round(climbsSucceeded/climbsAttempted+'e2')+'e-2');
    if (climbsAttempted === 0) {
      climbRate = 0;
    }
    var ropeGrabTimeAvg = Number(Math.round(ropeGrabTimeSum/counter+'e2')+'e-2');
    var ropeClimbTimeAvg = Number(Math.round(ropeClimbTimeSum/counter+'e2')+'e-2');
    var defenseQualityAvg = defenseQualitySum/numDefenseMatch;
    if (numDefenseMatch === 0) {
      defenseQualityAvg = 0;
    }

    failureReason = failureReason.substring(0, failureReason.length-3);
    comments = comments.substring(0, comments.length-3);

    var gearAutoBgArray = bgColor(gearAutoSum, 6);
    var gearTeleopAvgBgArray = bgColor(gearTeleopAvg, 3);
    var climbRateBgArray = bgColor(climbRate, 1);

    document.getElementById("teams").innerHTML += '<tr class="team" id="'+teamNumber+'" onclick="loadTeamInfo();">'
        +'<td class="mdl-data-table__cell--non-numeric">'+teamNumber+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric" style="background-color: rgb('+gearAutoBgArray.red+', '+gearAutoBgArray.green+', '+gearAutoBgArray.blue+')">'+gearAutoSum+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+gearAutoAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+gearAutoSide+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+numHighFuelAutoMatches+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+numLowFuelAutoMatches+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+highFuelAccuracyPercentAutoAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+lowFuelAccuracyPercentAutoAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric" style="background-color: rgb('+gearTeleopAvgBgArray.red+', '+gearTeleopAvgBgArray.green+', '+gearTeleopAvgBgArray.blue+')">'+gearTeleopAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+numHighFuelTeleopMatches+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+numLowFuelTeleopMatches+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+highFuelAccuracyPercentTeleopAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+lowFuelAccuracyPercentTeleopAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+climbsSucceeded+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+climbsAttempted+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric" style="background-color: rgb('+climbRateBgArray.red+', '+climbRateBgArray.green+', '+climbRateBgArray.blue+')">'+climbRate+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+ropeGrabTimeAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+ropeClimbTimeAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+failureReason+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+numDefenseMatch+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+defenseQualityAvg+'</td>'
        +'<td class="mdl-data-table__cell--non-numeric">'+comments+'</td>'
      +'</tr>';
  });
}

function bgColor(col, divisor) {
  var green = 124;
  var blue = 87;
  var red = 230;
  if (col/divisor <= 106/300) {
    green = green + (col/divisor)*300;
    green = parseInt(green);
    if (green > 230) {
      green = 230;
    }
  }
  if (col/divisor >= 106/300 && col/divisor <= 249/300) {
    green = 230;
    red = red - (col/divisor - 106/300)*300;
    red = parseInt(red);
    if (red < 87) {
      red = 87;
    }
  }
  if (col/divisor > 249/300) {
    green = 230;
    red = 87;
    blue = blue + (col/divisor - 279/300)*300;
    blue = parseInt(blue);
    if (blue > 108) {
      blue = 108;
    }
  }
  return {red, green, blue};
}
