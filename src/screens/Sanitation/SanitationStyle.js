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
    contentContainer: {
        width: '100%', 
        justifyContent: 'space-around', 
        height: '75%',
    },
    companyNameAndRateContainer: {
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between', 
        width: '97%',
    },
    companyNameTextStyle: {
        textAlign: 'left', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(16), 
        color: '#000000',
    },
    rateContentContainer: {
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
    distanceContainer: {
        width: '97%', 
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    distanceTextStyle: {
        textAlign: 'left', 
        textAlignVertical: 'center', 
        paddingHorizontal: 8, 
        fontSize: moderateScale(14), 
        color: '#233B5D',
    },
    searchContainer: {
        width: '90%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    searchFilterResultTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(16), 
        color: '#233B5D', 
        fontFamily: 'HacenMaghrebBd',
    },
    bottomSheetContainer: {
        width: '100%', 
        backgroundColor: '#FFFFFF', 
        height: height / 2.8, 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        borderTopRightRadius: 8, 
        borderTopLeftRadius: 8,
    },
    filterTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: moderateScale(17), 
        color: '#000000', 
        margin: 8,
    },
    commonContainer: {
        width: '95%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
    },
    filterCommonTextStyle: {
        fontSize: moderateScale(16), 
        color: '#363636', 
        paddingHorizontal: 8,
    }
})


export default style;