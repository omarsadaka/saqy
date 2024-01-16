import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 8,
    },
    notificationContentContainer: {
        width: '95%', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        flexDirection: 'row',
    },
    notificationDateTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(12), 
        color: '#707070', 
        fontFamily: 'HacenMaghrebLt',
    },
    notificationTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '75%', 
        fontSize: moderateScale(13.5), 
        color: '#363636', 
        fontFamily: 'HacenMaghrebLt',
    },
})


export default style;