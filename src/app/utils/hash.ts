export const getImageHash = function (input: string | undefined) {
  let min = 1;
  let max = 25;
  if (input) {
    let output = input
      .split('')
      .map((char) => char.charCodeAt(0))
      .reduce((current, previous) => previous + current);
    output = output % 24;

    if (output <= 0) {
      output = 1;
    }
    return output;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
};
