import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    serviceProviderInfoContainerStyle: {
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
    },
    serviceProviderInfoTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    companyInfoContainer: {
        width: '90%',
        height: height * 0.15,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#233B5D',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: { height: 1, width: 1 },
    },
    companyInfoContentContainer: {
        width: '100%',
        justifyContent: 'space-around',
        height: '75%',
    },
    companyNameTextContainerStyle: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    companyNameTextStyle: {
        textAlign: 'right',
        textAlignVertical: 'center',
        paddingHorizontal: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        width: '85%',
        fontFamily: 'HacenMaghrebLt',
    },
    descriptionTextContainerStyle: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    descriptionTextStyle: {
        textAlign: 'right',
        textAlignVertical: 'center',
        paddingHorizontal: 8,
        fontSize: moderateScale(12),
        color: '#000000',
        width: '85%',
        fontFamily: 'HacenMaghrebLt',
    },
    orderInfoTextContainerStyle: {
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
    productsServicesTextContainerStyle: {
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    productsServicesTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    priceContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    totalPriceTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    totalPriceTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    priceTextContainer: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    priceTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    tanksCapacityAndNumberContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tanksCapacityTextContainer: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    tanksCapacityTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    tanksNumberTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    tanksNumberTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    orderTimeAndDateContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    orderTimeTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    orderTimeTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    orderDateTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    orderDateTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    arrivalTimeAndOrderStatusContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    arrivalTimeTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    arrivalTimeTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    orderStatusTextContainerStyle: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    orderStatusTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 8,
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebLt',
    },
    rateContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    rateTextContainerStyle: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8,
    },
    rateTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    rateStarsContainer: {
        width: '90%', 
        height: height * 0.15, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        margin: 8, 
        elevation: 5, 
        shadowColor: '#233B5D', 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        shadowOffset: { height: 1, width: 1 }
    },
    imageContainer:{ 
        alignItems: 'center',justifyContent:'center',
        width: '25%',
        elevation:2,backgroundColor:'#fff',
        borderRadius:5,
        marginHorizontal: width*0.02
    },
    rateContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    rate:{
        textAlign: 'left',
         textAlignVertical: 'center', 
         paddingHorizontal: 5,
        fontSize: moderateScale(15), color: '#363636'
    },
})


export default style;