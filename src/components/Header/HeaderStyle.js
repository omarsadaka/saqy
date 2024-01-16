import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    mainHeaderContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextContainerStyle: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //position
    },
    mainHeaderTextStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        //height: Platform.OS === 'ios' ? undefined : '100%',
        color: '#FFFFFF',
        fontSize: 20,
    },
});


export default style