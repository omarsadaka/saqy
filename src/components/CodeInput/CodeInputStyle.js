import { StyleSheet, Platform, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    root: { width: '95%', height: '100%' },
    title: { textAlign: 'center', fontSize: moderateScale(30) },
    codeFieldRoot: { height: '65%' },
    cell: {
        width: '15%',
        height: '100%',
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#888888',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5,
    },
    // focusCell: {
    //     borderColor: '#F5F5F5',
    // },
});

export default style;