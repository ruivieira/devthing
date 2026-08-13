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
      let result = "<ul class='macro-listing'>";
      result += issues.map((issue) => `<li><<issue ${issue}>></li>`).join("\n");
      result += "</ul>";
      return result;
    } else {
      return "No tasks lined up.";
    }
  };
})();
