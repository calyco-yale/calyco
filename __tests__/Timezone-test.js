import React from "react";

export const retrieveOffset = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  global.offset = offset;
  return offset;
};

export const getUTCTime = date => {
  var new_string = date.substring(0, 10) + "T" + date.substring(11, 16) + ":00";
  var currDate = new Date(new_string);
  var curr_string = currDate.toISOString();
  var new_string =
    curr_string.substring(0, 10) + " " + curr_string.substring(11, 16);
  return new_string;
};

export const convertLocalTime = date => {
  const offset = global.offset;
  var new_string = date.substring(0, 10) + "T" + date.substring(11, 16) + ":00";
  var currDate = new Date(new_string);
  currDate.setMinutes(currDate.getMinutes() - offset);
  var curr_month = currDate.getMonth() + 1;
  var curr_date = currDate.getDate();
  var curr_year = currDate.getFullYear();
  var curr_hour = currDate.getHours();
  var curr_minute = currDate.getMinutes();
  var temp_curr_date = curr_date;
  var temp_curr_month = curr_month;
  var temp_curr_hour = curr_hour;
  var temp_curr_minute = curr_minute;
  if (curr_date < 10) {
    temp_curr_date = "0" + curr_date.toString();
  }

  if (curr_month < 10) {
    temp_curr_month = "0" + curr_month.toString();
  }

  if (curr_hour < 10) {
    temp_curr_hour = "0" + curr_hour.toString();
  }

  if (curr_minute < 10) {
    temp_curr_minute = "0" + curr_minute.toString();
  }
  var new_string =
    curr_year +
    "-" +
    temp_curr_month +
    "-" +
    temp_curr_date +
    " " +
    temp_curr_hour +
    ":" +
    temp_curr_minute;
  return new_string;
};

export const getDateFromDatetime = datetime => {
  let arr = datetime.split(" ");
  return arr[0];
};

export const getDateFromString = datetimeString => {
  return new Date(
    Date.UTC(
      datetimeString.substring(0, 4),
      datetimeString.substring(5, 7) - 1,
      datetimeString.substring(8, 10),
      datetimeString.substring(11, 13),
      datetimeString.substring(14, 16)
    )
  );
};

export const getStringFromDate = date => {
  const iso = date.toISOString();
  return iso.substring(0, 10) + " " + iso.substring(11, 16);
};

var getTimezoneOffset = Date.prototype.getTimezoneOffset;
var testOffset = 10;
Date.prototype.getTimezoneOffset = function() {
  return testOffset;
};
describe("Test for retrieveOffset:", () => {
  it("retrieves the correct offset", () => {
    var res = retrieveOffset();
    expect(res).toBe(testOffset);
  });
});

var testDate = "2021-05-05 00:00";
var testDateObj = new Date(2021, 4, 5, 0, 0, 0);
describe("Test for getUTCTime:", () => {
  it("retrieves the correct utc time", () => {
    var res = getUTCTime(testDate);
    expect(res).toBe("2021-05-04 15:00");
  });
});

describe("Test for convertLocalTime:", () => {
  it("retrieves the correct local time", () => {
    var res = convertLocalTime(testDate);
    expect(res).toBe("2021-05-04 23:50");
  });
});

describe("Test for getDateFromDatetime:", () => {
  it("retrieves the date", () => {
    var res = getDateFromDatetime(testDate);
    expect(res).toBe("2021-05-05");
  });
});

describe("Test for getDateFromString:", () => {
  it("retrieves the string date", () => {
    var res = getDateFromString(testDate);
    expect(res.toDateString()).toBe("Wed May 05 2021");
  });
});

describe("Test for getStringFromDate:", () => {
  it("retrieves the string date", () => {
    var res = getStringFromDate(testDateObj);
    expect(res).toBe("2021-05-04 15:00");
  });
});
