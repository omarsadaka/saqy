import { StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';


const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
    },
    textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: '5%',
        fontSize: moderateScale(18),
        fontFamily: 'HacenMaghrebBd'
    },
    textInputContainer: {
        width: '100%',
        height: '32%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-around',
        alignItems: "center",
        zIndex: 2,
        margin: 8
    },
})


export default style