import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    orderInfoContainer: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8,
    },
    orderInfoTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    orderCommonContainer: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    orderCommonTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        margin: 8, 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
})


export default style;