import React, { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import style from './ForgetPasswordStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';
import PhoneIcon from '../../../assets/phone_icon';
import { ResetPasswordAction } from '../../redux/ResetPassword/Actions';
const { width, height } = Dimensions.get('window');

export default function ForgetPassword({ navigation }) {
    const [phoneNumberValue, setPhoneNumberValue] = useState('');

    const dispatch = useDispatch();

    const onSendPress = () => {
        if (!phoneNumberValue) {
            showMessage({ message: 'برجاء إدخال رقم الجوال', backgroundColor: '#FF6F61' })
            return
        }
        dispatch(ResetPasswordAction(phoneNumberValue, navigation));
    }


    const { ResetPasswordLoading } = useSelector(state => state.resetPassword);

    return (
        <View style={style.container}>
            <View style={style.logoContainer}>
                <Image source={require('../../../assets/logo.png')} />
                <Text style={style.textStyle}>إعادة تعين كلمة المرور</Text>
            </View>
            <View style={style.textInputContainer}>
                <CustomTextInput HeadLine={"رقم الجوال"} keyboardType="numeric" onChangeText={value => setPhoneNumberValue(value)} icon={<PhoneIcon />} />
                <CustomButton Loading={ResetPasswordLoading} BtnTitle="إرسال البيانات" onPress={() => {
                    onSendPress()
                    }} borderRadius={23} LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']} />
            </View>
            <View style={style.backgroundPic}>
                <Image source={require('../../../assets/watermark.png')} style={{ height: height / 2 }} resizeMethod="resize" resizeMode="contain" />
            </View>
        </View>
    )
}