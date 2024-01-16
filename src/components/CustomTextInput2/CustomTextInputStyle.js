import {StyleSheet, Dimensions, Platform} from 'react-native';
import {moderateScale} from '../../utils/moderateScale';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    width: '100%',
    //height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childContainer: {
    width: '95%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: '100%',
    textAlign: 'right',
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? '4%' : null,
    fontFamily: 'HacenMaghrebBd',
    // height: Platform.OS === 'ios' ? '30%' : undefined,
  },
  iconContainer: {
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    width: '10%',
    //alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default style;
