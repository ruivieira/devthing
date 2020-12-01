/*\
title: $:/plugins/ruivieira/devthing/projects.js
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

  exports.name = "projects";

  exports.params = [];

  /*
    Run the macro
    */
  exports.run = function () {
    let filter = `[tag[project]]`;
    const projects = $tw.wiki.filterTiddlers(filter);
    let result = "<ul class='macro-listing'>";
    result += projects
      .map((title) => {
        const open_issues = $tw.wiki.filterTiddlers(
          `[tag[issue]field:issue.project[${title}]!field:issue.status[done]]`
        );
        const open_issues_msg =
          open_issues.length > 0
            ? `(${open_issues.length} open issues)`
            : "(no open issues)";
        return `<li>{{$:/plugins/ruivieira/devthing/images/box}} [[${title}]] ${open_issues_msg}</li>`;
      })
      .join("\n");
    result += "</ul>";
    return result;
  };
})();
