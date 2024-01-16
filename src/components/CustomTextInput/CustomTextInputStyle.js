import {StyleSheet, Dimensions, Platform, I18nManager} from 'react-native';
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
    color: '#000000',
    paddingHorizontal: 10,
    fontFamily: 'HacenMaghrebBd',
    height: Platform.OS === 'ios' ? '90%' : undefined,
  },
  iconContainer: {
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    width: '10%',
    alignItems: 'center',
    position: 'absolute',
  },
  headLineStyle: {
    textAlign: Platform.OS == 'ios' ? 'right' : null,
    textAlignVertical: 'center',
    width: '100%',
    marginBottom: 8,
    fontSize: moderateScale(18),
    fontFamily: 'HacenMaghrebBd',
  },
});

export default style;
