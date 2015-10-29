
var sensor_0_gpio = 17;
var sensor_1_gpio = 27;
var sensor_2_gpio = 22;

var states = [
  {
    id: sensor_0_gpio,
    color: "orange",
    count: 0,
    millis: 0,
    pouring: false
  },
  {
    id: sensor_1_gpio,
    color: "green",
    count: 0,
    millis: 0,
    pouring: false
  },
  {
    id: sensor_2_gpio,
    color: "yellow",
    count: 0,
    millis: 0,
    pouring: false
  }
];

module.exports.states = states;