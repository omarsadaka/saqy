import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    contentContainer: {
        width: '100%',
        height: '40%',
        marginTop: '5%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    optionsContainerStyle: {
        flexDirection: 'row', 
        width: '90%', 
        justifyContent: 'space-between',
    },
    optionsTextStyle: {
        color: '#000000', 
        fontSize: moderateScale(15), 
        textAlign: 'right', 
        textAlignVertical: 'center',
    }
})


export default style;