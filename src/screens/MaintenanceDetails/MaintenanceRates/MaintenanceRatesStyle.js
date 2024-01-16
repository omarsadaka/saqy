import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

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
        elevation: 5, 
        shadowColor: '#233B5D', 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        shadowOffset: { height: 1, width: 1 },
    },
    avatarContainer: {
        alignItems: 'flex-start', 
        height: '60%', 
        justifyContent: 'center', 
        width: '30%',
    },
    commonContainerStyle: {
        width: '98%', 
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    nameTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        paddingHorizontal: 8, 
        fontSize: moderateScale(15), 
        color: '#000000', 
        width: '85%',
    },
    commentTextStyle: {
        textAlign: 'right', 
        textAlignVertical: 'center', 
        paddingHorizontal: 8, 
        fontSize: moderateScale(15), 
        color: '#000000', 
        width: '90%',
    },
    mainRateNumberTextContainerStyle: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '5%',
    },
    mainRateNumberTextStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: '#233B5D', 
        fontSize: moderateScale(25),
    },
    mainRateStarsContainer: {
        width: '100%', 
        height: '10%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
})


export default style;