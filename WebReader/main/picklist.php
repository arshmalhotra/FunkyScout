<?php include "header.php" ?>
  <script src="../picklistData.js"></script>
<?php include "body_header.php" ?>

<main class="mdl-layout__content mdl-color--grey-100">
  <div class="demo-options mdl-card mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop" id="formDiv">
    <div class="mdl-card__supporting-text mdl-color-text--red-50 mdl-color-text--grey-600">
      <h3>Pick List Options</h3>
      <ul style="list-style-type: none;">
        <?php
        $attributes = [
          "Total Auto Gears",
          "Average Gears Auto",
          "Auto Gear Position",
          "Number of High Fuel Autos",
          "Number of Low Fuel Autos",
          "Average High Fuel Accuracy Auto",
          "Average Low Fuel Accuracy Auto",
          "Average Gears Teleop",
          "Number of High Fuel Teleops",
          "Number of Low Fuel Teleops",
          "Average High Fuel Accuracy Teleop",
          "Average Low Fuel Accuracy Teleop",
          "Climbs Succeeded",
          "Climbs Attempted",
          "Climb Rate",
          "Average Rope Grab Time",
          "Average Rope Climb Time",
          "Climb Failure Reason",
          "Number of Defense Matches",
          "Average Defense Quality",
          "Comments"
        ];

        foreach ($attributes as $attribute) :
        ?>
          <li style="padding-bottom: 10px;">
            <?php $attributeId = strtolower(str_replace(" ", "", $attribute)); ?>
            <label for="<?php echo $attributeId ?>" class="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-color-text--grey-600">
              <input type="checkbox" id="<?php echo $attributeId; ?>" onclick="showNormInput('<?php echo $attributeId; ?>')" class="mdl-switch__input" />
              <span class="mdl-switch__label"><?php echo $attribute; ?></span>
            </label>
            <ul id="<?php echo ($attributeId . "norminput") ?>">
            </ul>
          </li>
        <?php endforeach ?>
        <br>
        <li>
          <button onclick="generateTable();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
            Generate Table
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div class="mdl-grid demo-content" id="tableDiv" style="overflow-x: scroll; visibility: hidden;">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id="header">
      <thead>
        <tr id="teamsHeaders">
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(0);">Team Number</th>
        </tr>
      </thead>
      <tbody id="teams">
      </tbody>
    </table>
  </div>
</main>

<?php include "footer.php" ?>
