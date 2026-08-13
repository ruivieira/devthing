/*\
title: $:/plugins/ruivieira/randompage/random-page.js
type: application/javascript
module-type: macro

Return a random page

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /*
    Information about this macro
    */

  exports.name = "random-page";

  exports.params = [];
  /*
    Run the macro
    */
  exports.run = function () {
    let filter = `[!is[system]]`;
    const tiddlers = $tw.wiki.filterTiddlers(filter);
    const random_tiddler = tiddlers[Math.floor(Math.random() * tiddlers.length)];
    console.log(`Random tiddler: ${random_tiddler}`);

    return random_tiddler;
  };
})();
