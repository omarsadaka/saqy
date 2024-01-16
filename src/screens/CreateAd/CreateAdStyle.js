import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    adDetailsContainerStyle: {
        width: '95%', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
    },
    adDetailsTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(15), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    textInputsContainer: {
        width: '100%', 
        height: '50%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: '5%',
    },
})


export default style;