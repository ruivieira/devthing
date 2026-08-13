/*\
title: $:/plugins/ruivieira/devthing/project-sprints.js
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

  exports.name = "project-sprints";

  exports.params = [{ name: "project" }];

  var moment = require("$:/plugins/kixam/moment/moment.js");
  /*
    Run the macro
    */
  exports.run = function (project) {
    const filter = `[tag[sprint]field:project[${project}]]`;
    const sprints = $tw.wiki.filterTiddlers(filter);
    console.log(`project-sprints: ${sprints}`);
    let results = "<ul class='macro-listing'>";
    results += sprints
      .map((sprint) => {
        const tiddle = $tw.wiki.getTiddler(sprint);
        const start = tiddle.fields["sprint.start"];
        const end = tiddle.fields["sprint.end"];
        const isBetween = moment().isBetween(start, end, "day", "[]");

        let colour = isBetween ? "black" : "faded";
        let dates = `${moment(start, "YYYY-MM-DD").format(
          "Do MMM YYYY"
        )} to ${moment(end, "YYYY-MM-DD").format("Do MMM YYYY")}`;
        if (isBetween) {
          dates += ` (${moment().diff(end, "days")} left)`;
        }
        return `<li>{{$:/plugins/ruivieira/devthing/images/sprint-${colour}}} [[${sprint}]] ${dates}</li>`;
      })
      .join("\n");
    results += "</ul>";
    return results;
  };
})();
