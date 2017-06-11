var tape = require("tape"),
  d3 = require("../");

require("./pathEqual");

tape("d3.bullet() has the expected defaults", function (test) {
  var b = d3.bullet();
  test.end();
});
