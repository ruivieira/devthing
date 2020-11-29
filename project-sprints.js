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
        const isBetween = moment().isBetween(
          tiddle.fields["sprint.start"],
          tiddle.fields["sprint.end"],
          "day",
          "[]"
        );

        let colour = isBetween ? "black" : "faded";
        return `<li>{{$:/plugins/ruivieira/devthing/images/sprint-${colour}}} [[${sprint}]]</li>`;
      })
      .join("\n");
    results += "</ul>";
    return results;
  };
})();
