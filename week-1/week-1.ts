/* 

Prompt: Write a function that takes a string as input and returns the string reversed.

Extension: Write a version of this function without built-in methods.
*/

function reverseString(input: string): string {
  let reversed = "";
  for (let i = input.length - 1; i >= 0; i--) {
    reversed += input[i];
  }
  return reversed;
}

function reverseInBuilts(input: string): string {
  return input.split("").reverse().join("");
}

export { reverseString, reverseInBuilts };
