/**
 * Prompt: Write a function that takes a string as input and returns the string reversed.
 Extension: Write a version of this function without built-in methods.
 */

import { reverseString, reverseInBuilts } from "./reverseString";
import { describe, expect, test } from "bun:test";

describe("ReverseString Function", () => {
  describe("ReverseString Function Existance ", () => {
    test("ReverseString Function to exist", () => {
      expect(reverseString).toBeFunction();
    });
    test("ReverseString Function returns a value ", () => {
      expect(reverseString("something")).toBeDefined();
    });
    test("ReverseString Function returns a string", () => {
      expect(reverseString("something")).toBeString();
    });
  });

  describe("ReverseString Function testing", () => {
    test("String should be reversed", () => {
      expect(reverseString("something")).toBe("gnihtemos");
    });
    test("String should be reversed ignoring case", () => {
      expect(reverseString("someThing")).toBe("gnihTemos");
    });
    test("String should be reversed including spaces ", () => {
      expect(reverseString("some Thing new")).toBe("wen gnihT emos");
    });
  });
});

describe("Reverse BuiltIns", () => {
  describe("Reverse BuiltIns Function Existance ", () => {
    test("Reverse BuiltIns Function to exist", () => {
      expect(reverseInBuilts).toBeInstanceOf(Function);
    });
    test("Reverse BuiltIns Function returns a value ", () => {
      expect(reverseInBuilts("something")).toBeDefined();
    });
    test("Reverse BuiltIns Function returns a string", () => {
      expect(reverseInBuilts("something")).toBeString();
    });
  });

  describe("Reverse BuiltIns Function testing", () => {
    test("String should be reversed", () => {
      expect(reverseInBuilts("something")).toBe("gnihtemos");
    });
    test("String should be reversed ignoring case", () => {
      expect(reverseInBuilts("someThing")).toBe("gnihTemos");
    });
    test("String should be reversed including spaces ", () => {
      expect(reverseInBuilts("some Thing new")).toBe("wen gnihT emos");
    });
  });
});
