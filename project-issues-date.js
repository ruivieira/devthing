/*\
title: $:/plugins/ruivieira/devthing/project-issues-date.js
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

  exports.name = "project-issues-date";

  exports.params = [{ name: "project" }];

  /*
    Run the macro
    */
  exports.run = function (project, overdue) {
    let issues = $tw.wiki
      .getTiddlersWithTag("issue")
      .map((name) => $tw.wiki.getTiddler(name))
      .filter(
        (tiddle) =>
          tiddle.fields["issue.project"] != undefined &&
          tiddle.fields["issue.project"] == project
      );

    return issues
      .map((tiddle) => `* <<issue ${tiddle.fields.title}>>`)
      .join("\n");
  };
})();
