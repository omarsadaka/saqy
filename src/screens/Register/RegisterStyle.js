import { StyleSheet } from 'react-native';


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
        height: '40%', 
    },
    textStyle: {
        textAlign: 'center', 
        textAlignVertical: 'center', 
        marginTop: '5%', 
        fontSize: 18
    },
    textInputContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2
    },
    btnContainer: {
        width: '100%', 
        height: '15%', 
        justifyContent: 'center', 
        alignItems: "center", 
        zIndex: 2
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