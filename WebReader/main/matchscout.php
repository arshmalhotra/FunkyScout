<?php include "header.php"; ?>
  <script src="../matchscoutData.js"></script>
<?php include "body_header.php"; ?>

<main class="mdl-layout__content mdl-color--grey-100">
  <div class="mdl-grid demo-content" style="overflow-x: scroll;">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(0);">Team Number</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(1);">Total Auto Gears</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(2);">Average Gears Auto</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(3);">Auto Gear Position</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(4);">Number of High Fuel Autos</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(5);">Number of Low Fuel Autos</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(6);">Average High Fuel Accuracy Auto</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(7);">Average Low Fuel Accuracy Auto</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(8);">Average Gears Teleop</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(9);">Number of High Fuel Teleops</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(10);">Number of Low Fuel Teleops</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(11);">Average High Fuel Accuracy Teleop</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(12);">Average Low Fuel Accuracy Teleop</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(13);">Climbs Succeeded</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(14);">Climbs Attempted</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(15);">Climb Rate</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(16);">Average Rope Grab Time</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(17);">Average Rope Climb Time</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(18);">Climb Failure Reason</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(19);">Number of Defense Matches</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(20);">Average Defense Quality</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(21);">Comments</th>
        </tr>
      </thead>
      <tbody id="teams">
      </tbody>
    </table>
  </div>
</main>

<?php include "footer.php" ?>
