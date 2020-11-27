/*\
title: $:/plugins/ruivieira/devthing/project-issues.js
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

  exports.name = "project-issues";

  exports.params = [{ name: "project" }, { name: "show", default: "open" }];

  /*
    Run the macro
    */
  exports.run = function (project, show) {
    let filter = `[tag[issue]field:issue.project[${project}]]`;

    if (show == "open") {
      filter += " +[!field:issue.status[done]]";
    } else if (show == "closed") {
      filter += " +[field:issue.status[done]]";
    }

    console.log(filter);
    const issues = $tw.wiki.filterTiddlers(filter);

    return issues.map((issue) => `* <<issue ${issue}>>`).join("\n");
  };
})();
