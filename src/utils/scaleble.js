import {Dimensions, PixelRatio} from 'react-native';
import {DEFAULT_SCREEN_WIDTH} from '../constants/constants.js';

const entireScreenWidth = Dimensions.get('window').width;
const scale = entireScreenWidth / DEFAULT_SCREEN_WIDTH;

export const rem = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
