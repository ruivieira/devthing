/*\
title: $:/plugins/ruivieira/devthing/issue.js
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

  exports.name = "issue";

  exports.params = [{ name: "code" }];

  /*
    Run the macro
    */
  exports.run = function (code) {
    let issue = $tw.wiki.getTiddler(code);
    let status = issue.fields["issue.status"];

    if (status != undefined && status == "done") {
      return `~~[[${code}]]~~ {{$:/plugins/ruivieira/devthing/harvey/full}}`;
    } else {
      return `[[${code}]] {{$:/plugins/ruivieira/devthing/harvey/half}}`;
    }
  };
})();
