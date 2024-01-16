import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from '../../utils/moderateScale';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: height / 13,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnStyle: {
    //height: '70%', //height / 14,
    justifyContent: 'center',
    width: '95%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  btnTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    //height: '100%',
    color: '#FFFFFF',
    fontSize: moderateScale(20),
    // fontFamily: 'HacenMaghrebBd',
  },
});

export default style;
