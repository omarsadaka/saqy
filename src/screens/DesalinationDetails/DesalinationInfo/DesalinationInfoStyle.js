import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    imageContainer:{ 
        alignItems: 'center',justifyContent:'center',
         width: '30%',
         elevation:2,backgroundColor:'#fff',
         borderRadius:5,
         marginHorizontal: width*0.02
     },
})


export default style;