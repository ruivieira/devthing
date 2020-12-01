/*\
title: $:/plugins/ruivieira/devthing/utils.js
type: application/javascript
module-type: library

Link to an issue

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
      Information about this macro
      */

  exports.name = "utils";

  exports.naturalSort = function (a, b) {
    return a.localeCompare(b, navigator.languages[0] || navigator.language, {
      numeric: true,
      ignorePunctuation: true,
    });
  };
})();
