/*\
title: $:/plugins/ruivieira/devthing/projects-issues-all.js
type: application/javascript
module-type: macro

List all issues for all projects

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "projects-issues-all";

  exports.params = [{ name: "show", default: "open" }];

  var utils = require("$:/plugins/ruivieira/devthing/utils.js");

  let showIssues = function (project, show) {
    let filter = `[tag[issue]field:issue.project[${project}]]`;

    if (show == "open") {
      filter += " +[!field:issue.status[done]]";
    } else if (show == "closed") {
      filter += " +[field:issue.status[done]]";
    }

    const issues = $tw.wiki.filterTiddlers(filter).sort(utils.naturalSort);

    let result = `<div class='tree'><p class='tree'>{{$:/plugins/ruivieira/devthing/images/box}}  [[${project}]]</p><ul class='macro-listing tree'>`;
    result += issues.map((issue) => `<li><<issue ${issue}>></li>`).join("\n");
    result += "</ul></div>";
    return result;
  };

  /*
    Run the macro
    */
  exports.run = function (show) {
    let filter = `[tag[project]]`;

    const projects = $tw.wiki.filterTiddlers(filter).sort(utils.naturalSort);

    return projects.map((project) => showIssues(project, show)).join("\n");
  };
})();
