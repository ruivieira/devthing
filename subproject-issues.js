/*\
title: $:/plugins/ruivieira/devthing/subproject-issues.js
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

  exports.name = "subproject-issues";

  exports.params = [{ name: "project" }, { name: "show", default: "open" }];

  /*
    Run the macro
    */
  exports.run = function (project, show) {
    let filter = `[tag[issue]field:issue.subproject[${project}]]`;

    if (show == "open") {
      filter += " +[!field:issue.status[done]]";
    } else if (show == "closed") {
      filter += " +[field:issue.status[done]]";
    }

    const issues = $tw.wiki.filterTiddlers(filter);
    let result = "<ul class='macro-listing'>";
    result += issues.map((issue) => `<li><<issue ${issue}>></li>`).join("\n");
    result += "</ul>";
    return result;
  };
})();
