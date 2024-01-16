import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    tabViewContainer: {
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        left: 0, 
        height: '75%',
    }
})

export default style;