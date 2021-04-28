import React from "react";
import renderer from "react-test-renderer";
// import { testFunc } from "../app/helpers";

jest.mock("../app/base_components/PrimaryText", () => "PrimaryText");
jest.mock("../app/base_components/AppBase", () => "AppBase");
jest.mock("../app/base_components/TextInput", () => "TextInput");
jest.mock("../app/base_components/BR", () => "BR");
jest.mock("../app/base_components/RoundButton", () => "RoundButton");
jest.mock("../app/base_components/SecondaryText", () => "SecondaryText");
jest.mock("../app/base_components/TextButton", () => "TextButton");
jest.mock("../app/components/User", () => "UserComponent");

jest.mock("react-native-router-flux", () => ({
  Actions: {
    signUpScreen: jest.fn()
    // whatever other Actions you use in your code
  }
}));

export const testFunc = () => {
  return 1;
};

// Testing Rendering of User Component
test("test function", () => {
  expect(testFunc()).toBe(1);
});

// Here's a random test that you can run npm test on to see that Jest works
// describe("Addition", () => {
//   it("knows that 2 and 2 make 4", () => {
//     expect(2 + 2).toBe(4);
//   });
// });
