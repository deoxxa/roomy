var vows = require('vows'),
    assert = require('assert');

var roomy = require("../index");

var data = [
  {string: "1", object: {rooms: 1}, output: "1"},
  {string: "1R", object: {rooms: 1}, output: "1"},
  {string: "R", object: {rooms: 1}, output: "1"},
  {string: "1K", object: {rooms: 1, kitchen: true}, output: "1K"},
  {string: "1D", object: {rooms: 1, dining_room: true}, output: "1D"},
  {string: "1L", object: {rooms: 1, living_room: true}, output: "1L"},
  {string: "RK", object: {rooms: 1, kitchen: true}, output: "1K"},
  {string: "1DK", object: {rooms: 1, dining_room: true, kitchen: true}, output: "1DK"},
  {string: "2LDK", object: {rooms: 2, living_room: true, dining_room: true, kitchen: true}, output: "2LDK"},
];

var tests = {};

data.forEach(function(entry) {
  var test = {
    topic: function() {
      return roomy.parse(entry.string);
    },
  };

  Object.keys(entry.object).forEach(function(k) {
    test[["type of", k, "is", typeof entry.object[k]].join(" ")] = function(result) {
      assert(typeof result[k] === typeof entry.object[k]);
    };

    test[["value of", k, "is", entry.object[k].toString()].join(" ")] = function(result) {
      assert(result[k] === entry.object[k]);
    };
  });

  test["value of generated string is " + entry.output] = function() {
    assert(roomy.generate(entry.object) === entry.output);
  };

  tests[entry.string] = test;
});

vows.describe("roomy").addBatch(tests).export(module);
