/**
 * Create a function that takes an integer and returns the sum of its digits without converting the number to a string. Make sure you handle negatives!
 */

export function sumDigits(input: number) {
  let digits = [];
  // separate input into digits
  while (input != 0) {
    input = Math.abs(input);
    digits.push(input % 10);
    input = Math.trunc(input / 10);
  }
  // sum digits together
  return digits.reduce((acc, digit) => acc + digit, 0);
}
