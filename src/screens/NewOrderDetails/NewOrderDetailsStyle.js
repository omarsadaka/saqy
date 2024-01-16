import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    serviceProviderInfoContainer: {
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 8,
    },
    serviceProviderTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: moderateScale(16),
        color: '#000000',
        fontFamily: 'HacenMaghrebBd',
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
        shadowOffset: { height: 1, width: 1 }
    },
    infoCommonTextContainer: {
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
    companyDescriptionTextStyle: {
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
        fontFamily: 'HacenMaghrebBd',
    },
    productsAndServicesContainer: {
        width: '90%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    commonTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        margin: 8, 
        fontSize: moderateScale(16), 
        color: '#000000', 
        fontFamily: 'HacenMaghrebBd',
    },
    commonContainer: {
        width: '95%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    commonTextContainer: {
        width: '45%', 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        margin: 8, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#EEEEEE',
    },
    buttonsContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    btnView: {
        width: '45%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 8,
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