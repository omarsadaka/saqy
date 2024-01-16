import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from '../../utils/moderateScale';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  categoryContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  label_style: {
    fontSize: moderateScale(18),
    fontFamily: 'HacenMaghrebLt',
    height: height * 0.07,
  },
  text_style: {
    // flex: 1,
    // width: width * 0.48,
    marginHorizontal: width * 0.03,
    textAlignVertical: 'center',
    fontFamily: 'HacenMaghrebLt',
    fontSize: moderateScale(15),
    color: '#000000',
  },
  dropdown_style: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingBottom: height * 0.01,
    overflow: 'hidden',
    borderBottomRightRadius: width * 0.02,
    borderBottomLeftRadius: width * 0.02,
  },
  spiner_label: {
    margin: height * 0.017,
    fontSize: 16,
    fontFamily: 'HacenMaghrebLt',
    paddingHorizontal: width * 0.03,
  },
  spinner: {
    alignItems: 'center',
    width: width * 0.6,
    height: height * 0.05,
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.01,
    paddingHorizontal: height * 0.012,
    borderTopRightRadius: width * 0.02,
    borderTopLeftRadius: width * 0.02,
  },
});

export default style;
