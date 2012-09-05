var roomy = module.exports = {};

//
// `roomy.parse(string)`
//
// The only argument is a string like `1LDK`. The return value is an object
// like the following:
//
// ```json
// {
//   "rooms": 1,
//   "living_room": true,
//   "dining_room": true,
//   "kitchen": true
// }
// ```
//

roomy.parse = function parse(string) {
  var parts = string.toUpperCase().replace(/\s+/g, "").split(/(\D)/).filter(function(e) { return e.length > 0; });

  var res = {};

  if (parts[0].match(/^\d+$/)) {
    res.rooms = parseInt(parts.shift(), 10);
  }

  parts.forEach(function(part) {
    switch (part) {
      case "R": if (!res.rooms) { res.rooms = 1; } break;
      case "L": res.living_room = true; break;
      case "D": res.dining_room = true; break;
      case "K": res.kitchen = true; break;
      default: break;
    }
  });

  return res;
};

//
// `roomy.generate(object)`
//
// The only argument is an object with the same format as the output of `parse`.
// The return value is a string like `1LDK`.
//

roomy.generate = function generate(object) {
  return [
    object.rooms ? object.rooms.toString() : "",
    object.living_room ? "L" : "",
    object.dining_room ? "D" : "",
    object.kitchen ? "K" : "",
  ].join("");
};
