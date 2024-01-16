import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    appRateContainer: {
        width: '90%', 
        height: height * 0.18, 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        margin: 8, 
        elevation: 5, 
        shadowColor: '#233B5D', 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        shadowOffset: { height: 1, width: 1 },
    },
    contentContainer: {
        width: '100%', 
        margin: 8, 
        height: '30%', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
})


export default style;