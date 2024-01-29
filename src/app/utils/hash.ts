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

const style = {
  1: {
    primaryColor: '#F9F65D',
    secondaryColor: '#F9F65D',
    primaryText: 'text-black',
    secondaryText: 'text-gray-400',
  },
  2: {
    primaryColor: '#8853BD',
    secondaryColor: '#8853BD',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  3: {
    primaryColor: '#BFDCDD',
    secondaryColor: '#BFDCDD',
    primaryText: 'text-black',
    secondaryText: 'text-gray-300',
  },
  4: {
    primaryColor: '#3E5C84',
    secondaryColor: '#3E5C84',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  5: {
    primaryColor: '#E58431',
    secondaryColor: '#E58431',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  6: {
    primaryColor: '#CE75A8',
    secondaryColor: '#CE75A8',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  7: {
    primaryColor: '#387E22',
    secondaryColor: '#387E22',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  8: {
    primaryColor: '#C63E28',
    secondaryColor: '#C63E28',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  9: {
    primaryColor: '#5072B6',
    secondaryColor: '#5072B6',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  10: {
    primaryColor: '#ECA171',
    secondaryColor: '#ECA171',
    primaryText: 'text-black',
    secondaryText: 'text-gray-300',
  },
  11: {
    primaryColor: '#7F5BBA',
    secondaryColor: '#7F5BBA',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  12: {
    primaryColor: '#C429DC',
    secondaryColor: '#C429DC',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  13: {
    primaryColor: '#B7A43E',
    secondaryColor: '#B7A43E',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  14: {
    primaryColor: '#3171AD',
    secondaryColor: '#3171AD',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  15: {
    primaryColor: '#F3B05A',
    secondaryColor: '#F3B05A',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  16: {
    primaryColor: '#5F4842',
    secondaryColor: '#5F4842',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  17: {
    primaryColor: '#74FBC0',
    secondaryColor: '#74FB00',
    primaryText: 'text-black',
    secondaryText: 'text-gray-800',
  },
  18: {
    primaryColor: '#52B4C4',
    secondaryColor: '#52B4C4',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  19: {
    primaryColor: '#540E86',
    secondaryColor: '#540E86',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  20: {
    primaryColor: '#D75D36',
    secondaryColor: '#D75D36',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  21: {
    primaryColor: '#5AB0DE',
    secondaryColor: '#5AB0DE',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  22: {
    primaryColor: '#EA5A65',
    secondaryColor: '#EA5A65',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
  23: {
    primaryColor: '#8BBFE1',
    secondaryColor: '#8BBFE1',
    primaryText: 'text-black',
    secondaryText: 'text-gray-300',
  },
  24: {
    primaryColor: '#CE6171',
    secondaryColor: '#CE6171',
    primaryText: 'text-white',
    secondaryText: 'text-gray-300',
  },
};

export const getStyleHash = function (input: string | undefined) {
  let number = getImageHash(input);
  // @ts-ignore
  return style[number];
};
