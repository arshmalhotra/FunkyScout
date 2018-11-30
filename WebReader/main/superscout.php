<?php include "header.php" ?>
  <script src="../superscoutData.js"></script>
<?php include "body_header.php" ?>

<main class="mdl-layout__content mdl-color--grey-100">
  <div class="mdl-grid demo-content" style="overflow-x: scroll;">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id="header">
      <thead>
        <tr>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(0);">Match Number</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(1);">Alliance Color</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(2);">HP</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(3);">Pilots</th>
          <th style="text-align:left;cursor:pointer;" onclick="sortTable(4);">Comment</th>
        </tr>
      </thead>
      <tbody id="teams">
      </tbody>
    </table>
  </div>
</main>

<?php include "footer.php" ?>
