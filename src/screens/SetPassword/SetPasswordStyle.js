import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');


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
        fontSize: moderateScale(18)
    },
    textInputContainer: {
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnContainer: {
        width: '100%',
       // height: '15%',
        justifyContent: 'space-around',
        alignItems: "center",
        zIndex: 2,
        margin: 8
    },
    backgroundPic: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '80%',
        height: '40%',
        alignItems: 'flex-end',
        //opacity: 0.1,
        zIndex: 1
    }
})


export default style