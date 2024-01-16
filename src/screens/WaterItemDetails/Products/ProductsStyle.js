import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    renderItemContainer: {
        width: width / 2.25, 
        margin: 5, 
        height: height * 0.40, 
        alignItems: 'center', 
        borderRadius: 8, 
        backgroundColor: '#FFFFFF', 
        marginTop: '5%',
    },
    contentContainer: {
        width: '50%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row-reverse',
    },
    ratesContainer: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    ratesTextStyle: {
        textAlign: 'left', 
        textAlignVertical: 'center', 
        paddingHorizontal: 8, 
        fontSize: moderateScale(13), 
        color: '#363636',
    },
    shareAndLikeContainer: {
        width: '100%', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    productInfoContainer: {
        width: '100%', 
        height: '25%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
})


export default style;