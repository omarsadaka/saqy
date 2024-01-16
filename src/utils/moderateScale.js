import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guideLineBaseWidth = 350;
const guideLineBaseHeight = 680;

const scale = size => width / guideLineBaseWidth * size;
const verticalScale = size => height / guideLineBaseHeight * size;

export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;