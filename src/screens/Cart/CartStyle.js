import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: '95%', 
        height: height * 0.18, 
        margin: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF',
    },
    renderItemSubContainer: {
        width: '100%', 
        flexDirection: 'row-reverse', 
        alignItems: 'center',
    },
    imageContainerStyle: {
        width: '25%', 
        justifyContent: 'center', 
        alignItems: 'flex-end',
    },
    productInfoContainer: {
        width: '35%', 
        justifyContent: 'space-between', 
        height: '50%', 
        alignItems: 'flex-start',
    },
    productNameTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '90%', 
        fontSize: moderateScale(14), 
        color: '#233B5D',
    },
    productPriceTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        width: '90%', 
        fontSize: moderateScale(16), 
        color: '#000000',
    },
    counterContainer: {
        width: '35%', 
        height: '40%', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'row-reverse', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    }
})

export default style;