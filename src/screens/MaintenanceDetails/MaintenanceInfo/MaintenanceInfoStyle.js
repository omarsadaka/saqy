import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    companyInfoContainer: {
        width: '90%', 
        height: height * 0.18, 
        alignItems: 'center', 
        borderRadius: 5, 
        backgroundColor: '#FFFFFF', 
        elevation: 5, 
        shadowColor: '#233B5D', 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        shadowOffset: { height: 1, width: 1 },
    },
    descriptionContainer: {
        width: '100%', 
        justifyContent: 'space-around', 
        height: '75%',
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
        fontSize: moderateScale(15), 
        color: '#000000', 
        width: '85%',
    },
    mapViewContainer: {
        width: '90%', 
        height: '75%', 
        borderRadius: 10, 
        overflow: 'hidden', 
        alignItems: 'center', 
        marginTop: '5%',
    },
    calloutContainer: {
        width: width / 1.5, 
        height: height / 5, 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10, 
        opacity: 0.88,
    },
    calloutContentStyle: {
        width: '90%', 
        height: '100%', 
        alignItems: 'center', 
        flexDirection: 'row',
    }
})