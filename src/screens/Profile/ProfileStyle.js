import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';
const { width, height } = Dimensions.get('window');


const style = StyleSheet.create({
    profilePasswordContainer: {
        margin: 8,
        width: '95%',
        height: height * 0.18,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    profileOptionsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
    },
    profileOptionsTextStyle: {
        color: '#000000',
        fontSize: moderateScale(15),
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    profileSectionsContainer: {
        width: '95%',
        height: height * 0.50,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        margin: 8,
    },
    logoutContainer: {
        flexDirection: 'row', 
        width: '95%', 
        justifyContent: 'flex-end',
    },
    logoutTextStyle: {
        fontSize: moderateScale(15), 
        color: '#1579BB', 
        paddingHorizontal: 10, 
        textAlign: 'center', 
        textAlignVertical: 'center',
    },
    textInputContainer: {
        width: '100%',
        height: '45%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height*0.01
    },
    btnContainer: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: "center",
        zIndex: 2,
        marginTop: height*0.1
    },
})


export default style;