import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    imagesContainer: {
        width: '90%', 
        height: height * 0.18, 
        alignItems: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        margin: 8,
    },
    orderPriceDetailsContainer: {
        width: '90%', 
        height: height / 3, 
        alignItems: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        margin: 8,
    },
    orderPriceDetailsSubContainer: {
        width: '90%', 
        height: '100%', 
        justifyContent: 'space-around',
    },
    priceTextContainerStyle: {
        width: '90%', 
        flexDirection: 'row', 
        alignItems: 'flex-start',
    },
    priceTextStyle: {
        color: '#363636', 
        fontSize: moderateScale(18)
    },
    priceCurrencyTextStyle: {
        fontSize: moderateScale(12), 
        color: '#363636',
    },
    priceDetailsTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '90%', 
        color: '#363636', 
        fontSize: moderateScale(14),
    },
    totalPriceTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '90%', 
        color: '#000000', 
        fontSize: moderateScale(18),
    },
    paymentTypeTextStyle: {
        textAlignVertical: 'center', 
        textAlign: 'right', 
        color: '#000000', 
        fontSize: moderateScale(18),
    },
    paymentTypeContainer: {
        width: '95%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    paymentOptionsContainer: {
        width: '45%', 
        height: height * 0.18, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        margin: 8,
    },
    paymentOptionsTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: '#363636', 
        fontSize: moderateScale(16),
    },
    clickedMethod:{
        width: width*0.35, height: height * 0.15,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 5, borderColor:'red', borderWidth:1,
        backgroundColor: '#FFFFFF', margin: 8 
    },
    unClickedMethod:{
        width: width*0.35, height: height * 0.15,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 5, borderColor:'#FFFFFF', borderWidth:1,
        backgroundColor: '#FFFFFF', margin: 8 
    },
    clickedAddress:{
        width: width*0.88, height: height * 0.1,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 5, borderColor:'red', borderWidth:1,
        backgroundColor: '#FFFFFF', margin: 8 
    },
    unClickedAddress:{
        width: width*0.88, height: height * 0.1,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 5, borderColor:'#FFFFFF', borderWidth:1,
        backgroundColor: '#FFFFFF', margin: 8 
    }
})


export default style;