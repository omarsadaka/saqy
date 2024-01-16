import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    imageContainer:{ 
        alignItems: 'center',justifyContent:'center',
         width: '25%',
         elevation:2,backgroundColor:'#fff',
         borderRadius:5,
         marginHorizontal: width*0.03
     },
})


export default style;