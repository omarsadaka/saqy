import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    orderDetailsTextContainerStyle: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8,
    },
    orderDetailsTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    productsTextContainerStyle: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    productTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        margin: 8, 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    totalPriceContainer: {
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
    priceTextContainerStyle: {
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
    tanksNumberAndCapacityContainerStyle: {
        width: '95%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    tankCapacityTextContainerStyle: {
        width: '45%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    tankCapacityTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        margin: 8, 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebLt',
    },
    tankNumberTextContainerStyle: {
        width: '45%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    tankNumberTextStyle: {
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
    arrivalTimeAndOrderStatus: {
        width: '95%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    arrivalTextContainerStyle: {
        width: '45%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    arrivalTextStyle: {
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
    }
})

export default style;