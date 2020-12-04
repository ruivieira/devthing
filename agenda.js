/*\
title: $:/plugins/ruivieira/devthing/agenda.js
type: application/javascript
module-type: macro

Generate an agenda

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
      Information about this macro
      */

  exports.name = "agenda";

  exports.params = [];

  var moment = require("$:/plugins/kixam/moment/moment.js");

  let groupStatus = function (filter, dateField) {
    let today = [];
    let overdue = [];
    let future = [];

    $tw.wiki.filterTiddlers(filter).map((title) => {
      const tiddler = $tw.wiki.getTiddler(title);
      const due_date = tiddler.fields[dateField];
      if (due_date != undefined) {
        const days_diff = moment().diff(moment(due_date, "YYYY-MM-DD"), "days");
        if (days_diff == 0) {
          today.push(tiddler);
        } else if (days_diff > 0) {
          overdue.push(tiddler);
        } else if (days_diff < 0) {
          future.push(tiddler);
        }
      }
    });

    return { today: today, overdue: overdue, future: future };
  };

  let formatDate = function (tiddler, dateField) {
    return moment(tiddler.fields[dateField], "YYYY-MM-DD").format("Do MMM");
  };

  /*
      Run the macro
  */
  exports.run = function (code) {
    // get all issues and tasks
    let filterIssues = `[tag[issue]]`;
    let taskIssues = `[tag[task]]`;

    const issues = groupStatus(filterIssues, "issue.date.due");
    const tasks = groupStatus(taskIssues, "task.date.due");

    let html = "";
    if (issues.overdue.length > 0 || tasks.overdue.length > 0) {
      html += "!! Overdue\n";
      html += issues.overdue
        .map(
          (issue) =>
            `* [[[${issue.fields["title"]}] - ${
              issue.fields["issue.description"]
            }|${issue.fields["title"]}]] <span class="date-pill">${formatDate(
              issue,
              "issue.date.due"
            )}</span>`
        )
        .join("\n");
      html += "\n";
      html += tasks.overdue
        .map(
          (issue) =>
            `* [[${
              issue.fields["title"]
            }]] <span class="date-pill">${formatDate(
              issue,
              "task.date.due"
            )}}</span>`
        )
        .join("\n");
      html += "\n";
    }

    if (issues.today.length > 0 || tasks.today.length > 0) {
      html += "!! Today\n";
      html += issues.today
        .map(
          (issue) =>
            `* [[[${issue.fields["title"]}] - ${issue.fields["issue.description"]}|${issue.fields["title"]}]]`
        )
        .join("\n");
      html += "\n";
      html += tasks.today
        .map((issue) => `* [[${issue.fields["title"]}]]`)
        .join("\n");

      html += "\n";
    }

    if (issues.future.length > 0 || tasks.future.length > 0) {
      html += "!! Future\n";
      html += issues.future
        .map(
          (issue) =>
            `* [[[${issue.fields["title"]}] - ${
              issue.fields["issue.description"]
            }|${issue.fields["title"]}]] <span class="date-pill">${formatDate(
              issue,
              "issue.date.due"
            )}</span>`
        )
        .join("\n");
      html += "\n";
      html += tasks.future
        .map(
          (issue) =>
            `* [[${
              issue.fields["title"]
            }]] <span class="date-pill">${formatDate(
              issue,
              "task.date.due"
            )}</span>`
        )
        .join("\n");

      html += "\n";
    }

    return html;
  };
})();
