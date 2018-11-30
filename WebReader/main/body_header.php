
  <script src="../tablesort.js"></script>
</head>
<body onload="loadTableData();">
  <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
  <header class="demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Home</span>
      <div class="mdl-layout-spacer"></div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" id="search" />
          <label class="mdl-textfield__label" for="search">Enter your query...</label>
        </div>
      </div>
      <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
        <i class="material-icons">more_vert</i>
      </button>
      <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
        <li class="mdl-menu__item">About</li>
        <li class="mdl-menu__item">Contact</li>
      </ul>
    </div>
  </header>
  <div class="demo-drawer mdl-layout__drawer mdl-color--red-600 mdl-color-text--white">
    <header class="drawer-header">
      <a class="mdl-navigation__link mdl-color-text--white" href="index.php"><h3 style="text-align: center;">Funky Scout</h3></a>
    </header>
    <nav class="demo-navigation mdl-navigation mdl-color--red-600">
      <a class="mdl-navigation__link mdl-color-text--white" href="index.php"><i class="material-icons" role="presentation">home</i>Home</a>
      <a class="mdl-navigation__link mdl-color-text--white" href="pitscout.php"><i class="material-icons" role="presentation">list</i>Pit Scout Data</a>
      <a class="mdl-navigation__link mdl-color-text--white" href="matchscout.php"><i class="material-icons" role="presentation">list</i>Match Scout Data</a>
      <a class="mdl-navigation__link mdl-color-text--white" href="superscout.php"><i class="material-icons" role="presentation">list</i>Super Scout Data</a>
      <a class="mdl-navigation__link mdl-color-text--white" href="picklist.php"><i class="material-icons" role="presentation">list</i>Pick List Data</a>
      <a class="mdl-navigation__link mdl-color-text--white" href="#"><i class="material-icons" role="presentation">settings</i>Settings</a>
    </nav>
  </div>
