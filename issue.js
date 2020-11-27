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
    let description = issue.fields["issue.description"];

    let wiki_link =
      description != undefined
        ? `[[[${code}] ${description}|${code}]]`
        : `[[${code}]]`;

    if (status != undefined) {
      if (status == "done") {
        wiki_link = `{{$:/plugins/ruivieira/devthing/harvey/full}} ~~${wiki_link}~~`;
      } else {
        wiki_link = `{{$:/plugins/ruivieira/devthing/harvey/half}} ${wiki_link}`;
      }
    }
    return wiki_link;
  };
})();
