import { double } from "../src/index";

describe("Test double", () => {
  test("it detects even numbers", () => {
    expect(double(0)).toBe(0);
  });

  test("it detects odd numbers", () => {
    expect(double(1)).toBe(2);
  });
});
