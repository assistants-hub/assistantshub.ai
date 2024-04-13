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
    primaryTextColor: 'text-[#000000]',
    secondaryTextColor: 'text-[#9ca3af]',
  },
  2: {
    primaryColor: '#8853BD',
    secondaryColor: '#8853BD',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  3: {
    primaryColor: '#BFDCDD',
    secondaryColor: '#BFDCDD',
    primaryTextColor: 'text-[#000000]',
    secondaryTextColor: 'text-[#1f2937]',
  },
  4: {
    primaryColor: '#3E5C84',
    secondaryColor: '#3E5C84',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  5: {
    primaryColor: '#E58431',
    secondaryColor: '#E58431',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  6: {
    primaryColor: '#CE75A8',
    secondaryColor: '#CE75A8',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  7: {
    primaryColor: '#387E22',
    secondaryColor: '#387E22',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  8: {
    primaryColor: '#C63E28',
    secondaryColor: '#C63E28',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  9: {
    primaryColor: '#5072B6',
    secondaryColor: '#5072B6',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  10: {
    primaryColor: '#ECA171',
    secondaryColor: '#ECA171',
    primaryTextColor: 'text-[#000000]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  11: {
    primaryColor: '#7F5BBA',
    secondaryColor: '#7F5BBA',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  12: {
    primaryColor: '#C429DC',
    secondaryColor: '#C429DC',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  13: {
    primaryColor: '#B7A43E',
    secondaryColor: '#B7A43E',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  14: {
    primaryColor: '#3171AD',
    secondaryColor: '#3171AD',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  15: {
    primaryColor: '#F3B05A',
    secondaryColor: '#F3B05A',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  16: {
    primaryColor: '#5F4842',
    secondaryColor: '#5F4842',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  17: {
    primaryColor: '#74FBC0',
    secondaryColor: '#74FB00',
    primaryTextColor: 'text-[#000000]',
    secondaryTextColor: 'text-[#1f2937]',
  },
  18: {
    primaryColor: '#52B4C4',
    secondaryColor: '#52B4C4',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  19: {
    primaryColor: '#540E86',
    secondaryColor: '#540E86',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  20: {
    primaryColor: '#D75D36',
    secondaryColor: '#D75D36',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  21: {
    primaryColor: '#5AB0DE',
    secondaryColor: '#5AB0DE',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  22: {
    primaryColor: '#EA5A65',
    secondaryColor: '#EA5A65',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  23: {
    primaryColor: '#8BBFE1',
    secondaryColor: '#8BBFE1',
    primaryTextColor: 'text-[#000000]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
  24: {
    primaryColor: '#CE6171',
    secondaryColor: '#CE6171',
    primaryTextColor: 'text-[#FFFFFF]',
    secondaryTextColor: 'text-[#d1d5db]',
  },
};

export const getStyleHash = function (input: string | undefined) {
  let number = getImageHash(input);
  // @ts-ignore
  return style[number];
};
