import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: '95%', 
        height: height * 0.18, 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 8, 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF',
    },
    productInfoContainer: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    productNameAndPriceContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '75%',
    },
    priceTextStyle: {
        textAlign: 'left', 
        textAlignVertical: 'center', 
        width: '50%', 
        fontSize: moderateScale(16), 
        color: '#000000',
    },
    currencyTextStyle: {
        fontSize: moderateScale(12), 
        color: '#000000',
    },
    productNameTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(14), 
        color: '#233B5D',
    },
    deliveredAndCounterContainer: {
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        flexDirection: 'row',
    },
    checkBoxContainer: {
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        width: '40%',
    },
    compositionTextStyle: {
        textAlign: 'left', 
        textAlignVertical: 'center', 
        height: '100%',
    },
    counterContainer: {
        width: '35%', 
        height: '100%', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'row-reverse', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    counterControllersStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        width: '25%', 
        fontSize: moderateScale(14),
    },
});