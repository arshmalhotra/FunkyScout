<?php include "header.php"; ?>
  <script src="../pitscoutData.js"></script>
<?php include "body_header.php"; ?>

<main class="mdl-layout__content mdl-color--grey-100">
  <div class="mdl-grid demo-content" style="overflow-x: scroll;">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id="pitScoutTable">
      <thead>
        <tr>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(0);">Team Number</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(1);">Drivetrain</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(2);">Speed(s)</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(3);">Gear Cycle Time</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(4);">Gear Intake</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(5);">Gear Release</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(6);">Human Player or Pilot Preference</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(7);">Rope Type</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(8);">High Fuel Shooting Locations</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(9);">Fuel Intake</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(10);">Auto Starting Locations</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(11);">Auto Routine</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(12);">Tall or Short</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(13);">Cheescake Possibility</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(14);">Bumper Quality</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(15);">Comments</th>
        </tr>
      </thead>
      <tbody id="teams">
      </tbody>
    </table>
  </div>
</main>

<?php include "footer.php" ?>
