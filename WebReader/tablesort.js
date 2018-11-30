var sortAscending = true;
var previousIndex = -1;
var sortCounter = 0;

function sortTable(index) {
  if (index === previousIndex) {
    if (sortCounter % 2 === 0) {
      sortAscending = true;
    } else {
      sortAscending = false;
    }
  } else {
    sortAscending = true;
  }
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("teams");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[index];
      y = rows[i + 1].getElementsByTagName("TD")[index];
      if (sortAscending) {
        if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
          if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (x.innerHTML > y.innerHTML) {
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
          if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (x.innerHTML < y.innerHTML) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  previousIndex = index;
  sortCounter++;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
