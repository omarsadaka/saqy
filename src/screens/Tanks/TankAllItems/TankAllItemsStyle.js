import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    itemContainer:{
        width: '100%', height: height * 0.18,
         alignItems: 'center', borderRadius: 5,
          backgroundColor: '#FFFFFF',
           marginTop: '5%',justifyContent:'center' 
       },
       viewContaier:{
        alignItems: 'center',
         flexDirection: 'row-reverse',
         justifyContent:'center'
       },
       imageContainer:{ 
           alignItems: 'center',justifyContent:'center',
            width: '30%',height:'80%',
            elevation:2,backgroundColor:'#fff',
            borderRadius:5,
            marginHorizontal: width*0.02
        },
        infoContainer:{
            flex:1, justifyContent: 'space-around', height: '75%'
        },
        infoContainer2:{
            flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%'
        },
        name:{
            flex:1,
            textAlign: 'right',
             textAlignVertical: 'center', 
             fontSize: moderateScale(16), color: '#000000',
             fontFamily: 'HacenMaghrebBd'
        },
        rateContainer:{
            width: '25%', flexDirection: 'row',
             alignItems: 'center',
              justifyContent: 'flex-end'
        },
        rate:{
            textAlign: 'left',
             textAlignVertical: 'center', 
             paddingHorizontal: '1%',
              fontSize: moderateScale(15), color: '#363636',
              fontFamily: 'HacenMaghrebBd'
        },
        locationContainer:{
            width: '97%', flexDirection: 'row-reverse',
             alignItems: 'center', justifyContent: 'flex-start' 
        },
        location:{
            textAlign: 'left',
             textAlignVertical: 'center',
              paddingHorizontal: 8,
               fontSize: moderateScale(14), color: '#233B5D' ,
               fontFamily: 'HacenMaghrebBd'
        }
});


export default style;