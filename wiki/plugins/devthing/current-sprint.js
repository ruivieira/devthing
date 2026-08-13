/*\
title: $:/plugins/ruivieira/devthing/current-sprint.js
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

  exports.name = "current-sprint";

  exports.params = [{ name: "project" }];

  var moment = require("$:/plugins/kixam/moment/moment.js");

  /*
    Run the macro
    */
  exports.run = function (project) {
    let filter = `[tag[sprint]field:project[${project}]]`;
    const sprints = $tw.wiki.filterTiddlers(filter);
    console.log(sprints);
    const now = moment();

    let candidates = sprints.filter((sprint) => {
      const tiddle = $tw.wiki.getTiddler(sprint);
      const isBetween = moment().isBetween(
        tiddle.fields["sprint.start"],
        tiddle.fields["sprint.end"],
        "day",
        "[]"
      );
      return isBetween;
    });

    if (candidates.length > 0) {
      return `[[${candidates[0]}]]`;
    } else {
      return "";
    }
  };
})();
