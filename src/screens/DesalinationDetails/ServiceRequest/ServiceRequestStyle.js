import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    serviceRequestContentContainer: {
        width: '100%', 
        margin: 8, 
        height: '40%', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    dateHeadLineTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '95%', 
        marginBottom: 8, 
        fontSize: moderateScale(18), 
        fontFamily: 'HacenMaghrebLt',
    },
    calendarIconStyle: {
        position: 'absolute', 
        left: '3%', 
        top: 0, 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
    },
    timeHeadLineTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '95%', 
        marginBottom: 8, 
        fontSize: moderateScale(18), 
        fontFamily: 'HacenMaghrebLt',
    },
    timePickerContainer: {
        width: '95%', 
        borderWidth: 1, 
        borderColor: '#EEEEEE', 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: height / 13,
    },
    timeIconStyle: {
        position: 'absolute', 
        left: '3%', 
        top: 0, 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
    },
    selectedTimeTextContainer: {
        position: 'absolute', 
        left: 0, 
        top: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
    },
})

export default style;