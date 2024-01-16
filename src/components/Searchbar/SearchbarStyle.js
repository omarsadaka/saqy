import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    container: {
        width: '100%', 
        height: height / 9, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    childContainer: {
        width: '95%', 
        height: '75%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputStyle: {
        width: '100%',
        height: Platform.OS === 'ios' ? "75%" : undefined,
        borderBottomColor: '#FFFFFF', 
        borderBottomWidth: 1, 
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingHorizontal: '15%',
        fontFamily: 'HacenMaghrebLt',
    },
    searchIconContainer: {
        justifyContent: 'center', 
        // left: 0, 
        top: 0, 
        right: 0,
        bottom: 0, 
        width: '15%', 
        alignSelf: 'center', 
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    filterIconContainer: {
        justifyContent: 'center', 
        left: 0, 
        top: 0, 
        // right: 0,
        bottom: 0, 
        width: '15%', 
        alignSelf: 'center', 
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
})


export default style;