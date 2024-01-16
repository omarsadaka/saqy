import {StyleSheet, Dimensions, Platform} from 'react-native';
import {moderateScale} from '../../utils/moderateScale';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    width: '95%',
    //height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: '#EEEEEE',
    // borderWidth: 1,
    // borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  pickerParentStyle: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  headLineStyle: {
    textAlign: 'right',
    textAlignVertical: 'center',
    width: '100%',
    marginBottom: 8,
    fontSize: moderateScale(18),
    fontFamily: 'HacenMaghrebLt',
  },
  childContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
