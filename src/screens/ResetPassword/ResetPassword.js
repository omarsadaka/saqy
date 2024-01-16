import React, { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import style from './ResetPasswordStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';
import PhoneIcon from '../../../assets/phone_icon';
import ShowPasswordIcon from '../../../assets/show_password_icon';
import { ChangePasswordAction } from '../../redux/ChangePassword/Actions';


const { width, height } = Dimensions.get('window');


export default function ResetPassword({ navigation, route }) {
    const { number } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const onChangePasswordPressed = () => {
        if (!password || !confirmPassword) {
            showMessage({ message: 'برجاء إدخال كلمة المرور', backgroundColor: '#FF6F61' })
            return
        }
        if (password !== confirmPassword) {
            showMessage({ message: 'برجاء التأكد من كلمة المرور', backgroundColor: '#FF6F61' })
            return
        }
        if (password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0) {
            showMessage({ message: 'كلمه المرور غير صالحة يجب ألا تحتوى على مسافات', backgroundColor: '#FF6F61' })
            return
        }
        dispatch(ChangePasswordAction(password.trim(), confirmPassword.trim(), number, navigation))
    }

    const { ChangePasswordLoading } = useSelector(state => state.changePassword);

    return (
        <View style={style.container}>
            <View style={style.logoContainer}>
                <Image source={require('../../../assets/logo.png')} />
                <Text style={style.textStyle}>إعادة تعين كلمة المرور</Text>
            </View>
            <View style={style.textInputContainer}>
                <CustomTextInput HeadLine={"كلمة المرور الجديدة"} onChangeText={value => setPassword(value)} secureTextEntry={true} icon={<ShowPasswordIcon />} clickable={true} />
                <CustomTextInput HeadLine={"إعادة إدخال كلمة المرور"} onChangeText={value => setConfirmPassword(value)} secureTextEntry={true} icon={<ShowPasswordIcon />} clickable={true} />
            </View>
            <View style={style.btnContainer}>
                <CustomButton Loading={ChangePasswordLoading} onPress={() => onChangePasswordPressed()} BtnTitle="دخول" borderRadius={Math.round(width / 2 + height / 2)} LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']} />
            </View>
            <View style={style.backgroundPic}>
                <Image source={require('../../../assets/watermark.png')} style={{ height: height / 2 }} resizeMethod="resize" resizeMode="contain" />
            </View>
        </View>
    )
}