/*\
title: $:/plugins/ruivieira/devthing/line-up.js
type: application/javascript
module-type: macro

Get the task line-up

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "line-up";

  exports.params = [];

  /*
    Run the macro
    */
  exports.run = function () {
    let filter = `[tag[issue]tag[line-up]]`;

    const issues = $tw.wiki.filterTiddlers(filter);

    if (issues.length > 0) {
      return issues.map((issue) => `* <<issue ${issue}>>`).join("\n");
    } else {
      return "No tasks lined up.";
    }
  };
})();
