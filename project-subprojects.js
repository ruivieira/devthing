/*\
title: $:/plugins/ruivieira/devthing/project-subprojects.js
type: application/javascript
module-type: macro

Link to an issue

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "project-subprojects";

  exports.params = [{ name: "project" }];

  /*
    Run the macro
    */
  exports.run = function (project) {
    let filter = `[tag[subproject]field:project[${project}]]`;

    const subprojects = $tw.wiki.filterTiddlers(filter);

    let result = `<div class='tree'><p class='tree'>{{$:/plugins/ruivieira/devthing/images/box}} [[${project}]]</p><ul class='macro-listing tree'>`;
    result += subprojects
      .map(
        (sp) =>
          `<li>{{$:/plugins/ruivieira/devthing/images/subproject}} [[${sp}]]</li>`
      )
      .join("\n");
    result += "</ul></div>";
    return result;
  };
})();
