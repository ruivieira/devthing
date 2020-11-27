/*\
title: $:/plugins/ruivieira/devthing/project-issues-timeline.js
type: application/javascript
module-type: macro

Show a project's issues timeline

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "project-issues-timeline";

  exports.params = [{ name: "project" }];

  /*
    Run the macro
    */
  exports.run = function (project) {
    return `<$visjstimeline filter="[tag[issue]] [field:project[${project}]]" startDateField="issue.date.due" boxing="auto" format="YYYY-MM-DD"/>`;
  };
})();
