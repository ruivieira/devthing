/*\
title: $:/plugins/ruivieira/devthing/issue-children.js
type: application/javascript
module-type: macro

Get all the children for this issue

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "issue-children";

  exports.params = [];

  /*
    Run the macro
    */
  exports.run = function (code) {
    let filter = `[tag[issue]field:issue.parent[${code}]]`;
    console.log(`Fetching children for filter ${filter}`);
    const issues = $tw.wiki.filterTiddlers(filter);

    let result = "";

    if (issues.length > 0) {
      result += "<h3>Sub-tasks</h3>\n\n";
      result += "<ul>";
      result += issues.map((issue) => `<li><<issue ${issue}>></li>`).join("\n");
      result += "</ul>";
      return result;
    } else {
      return "";
    }
  };
})();
