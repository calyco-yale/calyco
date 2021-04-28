import React from "react";
// import * as myModule from "/app/test_functions.js";
import { retrieveOffset } from "../app/test_functions.js";

var getTimezoneOffset = Date.prototype.getTimezoneOffset;
var testOffset = 10;
Date.prototype.getTimezoneOffset = function() {
  return testOffset;
};

describe("Time things", () => {
  it("retrieves the correct offset", () => {
    var res = retrieveOffset();
    expect(res).toBe(testOffset);
  });
  // it("converts time to the correct local time", () => {
  //   global.offset = 60;
  //   var testDate = "1000-11-11 11:00";
  //   var expectedDate = "1000-11-11 10:00";
  //   expect(convertLocalTime(testDate)).toBe(expectedDate);
  // });
});
