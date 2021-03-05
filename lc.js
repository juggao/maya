cal = require("./maya.js")

d = cal.LCToday();

console.log("Tzolkin: "+d["numeral"]+" "+d["month"]);
