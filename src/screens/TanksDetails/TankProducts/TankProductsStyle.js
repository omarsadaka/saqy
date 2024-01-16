import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: '95%', 
        height: height * 0.8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 5, 
        margin: 8,
    },
    sampleImagesContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        height: height * 0.2,
    },
    scrollViewContainer: {
        height: height * 0.20, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    productNameTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: '#363636', 
        fontSize: moderateScale(16), 
        fontFamily: 'HacenMaghrebBd',
    },
    productDescriptionTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: '#363636', 
        fontSize: moderateScale(14), 
        fontFamily: 'HacenMaghrebBd',
    },
    productPriceAndCapacityContainer: {
        width: '100%', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    productPriceTextContainerStyle: {
        width: '45%', 
        height: '30%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    productPriceTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        width: '100%', 
        fontSize: moderateScale(20), 
        color: '#1579BB', 
        fontFamily: 'HacenMaghrebBd',
    },
    capacityPickerContainer: {
        width: '45%', 
        height: '30%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
});


export default style;