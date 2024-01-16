import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: '100%',
        height: height * 0.18,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
    },
    commentAndRateContainer: {
        width: '100%',
        justifyContent: 'space-around',
        height: '100%'
    },
    commentAndRateSubContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        margin: 8,
    },
    commentTextContainerStyle: {
        width: '60%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentTextStyle: {
        textAlign: 'right',
        textAlignVertical: 'center',
        width: '100%',
        paddingHorizontal: 8,
        fontSize: moderateScale(16),
        color: '#000000',
    },
    rateContainer: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    rateTextStyle: {
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingHorizontal: 8,
        fontSize: moderateScale(15),
        color: '#363636',
    },
    likeIconStyle: {
        width: '35%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    imageContainer:{ 
         alignItems: 'center',justifyContent:'center',
         width: '30%',height:'80%',
         elevation:2,backgroundColor:'#fff',
         borderRadius:5,
         marginHorizontal: width*0.02
     },
     locationContainer:{
        width: '97%', flexDirection: 'row-reverse',
         alignItems: 'center', justifyContent: 'flex-start' 
    },
    location:{
        textAlign: 'left',
         textAlignVertical: 'center',
          paddingHorizontal: 8,fontFamily: 'HacenMaghrebBd',
           fontSize: moderateScale(14), color: '#233B5D' 
    }
})


export default style;