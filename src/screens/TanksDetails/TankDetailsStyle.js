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
    }
})


export default style;