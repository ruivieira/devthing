/*\
title: $:/plugins/ruivieira/devthing/project-sprint-issues.js
type: application/javascript
module-type: macro

Lists issues in a sprint

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "project-sprint-issues";

  exports.params = [
    { name: "project" },
    { name: "sprint" },
    { name: "show", default: "open" },
  ];

  /*
    Run the macro
    */
  exports.run = function (project, sprint, show) {
    let filter = `[tag[issue]field:issue.project[${project}]field:issue.sprint[${sprint}]]`;

    if (show == "open") {
      filter += " +[!field:issue.status[done]]";
    } else if (show == "closed") {
      filter += " +[field:issue.status[done]]";
    }

    const issues = $tw.wiki.filterTiddlers(filter);
    let result = `<div class='tree'><p class='tree'>{{$:/plugins/ruivieira/devthing/images/sprint-black}} [[${sprint}]]</p><ul class='macro-listing tree'>`;
    result += issues.map((issue) => `<li><<issue ${issue}>></li>`).join("\n");
    result += "</ul></div>";
    return result;
  };
})();
