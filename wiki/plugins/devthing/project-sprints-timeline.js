/*\
title: $:/plugins/ruivieira/devthing/project-sprints-timeline.js
type: application/javascript
module-type: macro

Show a project's sprint timeline

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "project-sprints-timeline";

  exports.params = [{ name: "project" }];

  /*
    Run the macro
    */
  exports.run = function (project) {
    return `<$visjstimeline filter="[tag[sprint]] [field:project[${project}]]" startDateField="sprint.start" endDateField="sprint.end" boxing="auto" format="YYYY-MM-DD"/>`;
  };
})();
