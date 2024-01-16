import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    tabViewContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: '75%',
    },
    tabBarStyle: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        width: '90%',
        elevation: 0,
        borderRadius: 5,
    },
    bottomSheetContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: height / 2.8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    filterTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: moderateScale(17),
        color: '#000000',
        margin: 8,
    },
    commonContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    filterCommonTextStyle: {
        fontSize: moderateScale(16),
        color: '#363636',
        paddingHorizontal: 8,
    },
})