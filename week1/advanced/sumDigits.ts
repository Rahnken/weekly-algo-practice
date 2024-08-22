/**
 * Create a function that takes an integer and returns the sum of its digits without converting the number to a string. Make sure you handle negatives!
 */

export function sumDigits(input: number): number {
  let sum = 0;
  input = Math.abs(input);

  while (input > 0) {
    sum += input % 10;
    input = Math.trunc(input / 10);
  }

  return sum;
}
