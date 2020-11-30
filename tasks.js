/*\
title: $:/plugins/ruivieira/devthing/tasks.js
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

  exports.name = "tasks";

  exports.params = [{ name: "project" }, { name: "show", default: "open" }];

  var moment = require("$:/plugins/kixam/moment/moment.js");

  let render_task = function (task) {
    const tiddler = $tw.wiki.getTiddler(task);
    let task_link = `[[${task}]]`;
    const status = tiddler.fields["task.status"];

    if (status == "open") {
      const due_date = tiddler.fields["task.date.due"];
      if (due_date != undefined) {
        const days_diff = moment().diff(moment(due_date, "YYYY-MM-DD"), "days");
        if (days_diff == 0) {
          task_link = `{{$:/plugins/ruivieira/devthing/images/due-today}} ${task_link}`;
        } else if (days_diff > 0) {
          task_link = `{{$:/plugins/ruivieira/devthing/images/due-overdue}} ${task_link}`;
        }
      }
    } else if (status == "done") {
      task_link = `~~${task_link}~~`;
    }
    return `<li><$checkbox tiddler="${task}" field="task.status" checked="done" unchecked="open"> ${task_link}</$checkbox></li>`;
  };

  /*
    Run the macro
    */
  exports.run = function (project, show) {
    let filter = `[tag[task]field:task.project[${project}]]`;

    if (show == "open") {
      filter += " +[!field:task.status[done]]";
    } else if (show == "done") {
      filter += " +[field:task.status[done]]";
    }

    const tasks = $tw.wiki.filterTiddlers(filter);
    let result = "<ul class='macro-listing'>";
    result += tasks
      .map((task) => {
        return render_task(task);
      })
      .join("\n");
    result += "</ul>";
    return result;
  };
})();
