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
    let priority = issue.fields["issue.priority"]; // New priority field

    let wiki_link =
      description != undefined
        ? `[[[${code}] ${description}|${code}]]`
        : `[[${code}]]`;

    // Add priority display
    if (priority != undefined) {
      switch (priority) {
        case "low":
          wiki_link = `{{$:/plugins/ruivieira/devthing/images/priority-low}} ${wiki_link}`;
          break;
        case "medium":
          wiki_link = `{{$:/plugins/ruivieira/devthing/images/priority-medium}} ${wiki_link}`;
          break;
        case "high":
          wiki_link = `{{$:/plugins/ruivieira/devthing/images/priority-high}} ${wiki_link}`;
          break;
        case "critical":
          wiki_link = `{{$:/plugins/ruivieira/devthing/images/priority-critical}} ${wiki_link}`;
          break;
      }
    }

    if (status != undefined) {
      switch (status) {
        case "todo":
          wiki_link = `<<HB 5>> ${wiki_link}`;
          break;
        case "next":
          wiki_link = `<<HB 8>> ${wiki_link}`;
          break;
        case "inprogress":
          wiki_link = `<<HB 13>> ${wiki_link}`;
          break;
        case "onhold":
          wiki_link = `{{$:/plugins/ruivieira/devthing/images/onhold}} ${wiki_link}`;
          break;
        case "review":
          wiki_link = `<<HB 21>> ${wiki_link}`;
          break;
        case "done":
          wiki_link = `<<HB 34>> ~~${wiki_link}~~`;
          break;
      }
    }



    return wiki_link;
  };
})();
