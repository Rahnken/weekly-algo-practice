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
  test("Input:204 should return 6", () => {
    expect(sumDigits(204)).toBe(6);
  });
  test("Input:242 should return 8", () => {
    expect(sumDigits(242)).toBe(8);
  });
  test("Input: -242 should be 6", () => {
    expect(sumDigits(-242)).toBe(8);
  });
});
