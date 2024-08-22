/**
 * Create a function that takes an integer
 * and returns the sum of its digits without converting the number to a string.
 *  Make sure you handle negatives!
 */

import { describe, expect, test } from "bun:test";
import { sumDigits } from "./sumDigits";

describe("SumDigits exists", () => {
  test("Sum Digits function to exist and be a function", () => {
    expect(sumDigits).toBeFunction();
  });
  test("Sum Digits should return a value", () => {
    expect(sumDigits(2)).toBeDefined();
  });
  test("Sum Digits should return a number", () => {
    expect(sumDigits(20)).toBeNumber();
  });
});
describe("SumDigits edge cases", () => {
  test("Input:24 should return 6", () => {
    expect(sumDigits(24)).toBe(6);
  });
  test("Handle 0 as a digit properly", () => {
    expect(sumDigits(204)).toBe(6);
  });
  test("Multiple digits added correctly", () => {
    expect(sumDigits(242)).toBe(8);
  });
  test("Negative inputs are handled correctly", () => {
    expect(sumDigits(-242)).toBe(8);
  });
});
