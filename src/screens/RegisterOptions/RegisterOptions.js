import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import style from './RegisterOptionsStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';

const { width, height } = Dimensions.get('window');

export default function RegisterOptions({ navigation }) {
    return (
        <View style={style.container}>
            <View style={style.logoContainer}>
                <Image source={require('../../../assets/logo.png')} />
                <Text style={style.textStyle}>تسجيل حساب</Text>
            </View>
            <View style={style.btnContainer}>
                <CustomButton BtnTitle="طالب خدمة" onPress={() => navigation.navigate("Register")} additionalStyle={{ height: height * 0.11 }} borderRadius={5} LinearGradientColors={['#1558A2', '#1579BB', '#1579BB']} />
                <CustomButton BtnTitle="مقدم خدمة" onPress={() => navigation.navigate("Register")} additionalStyle={{ height: height * 0.11 }} borderRadius={5} LinearGradientColors={['#42B5D0', '#42B5D0']} />
            </View>
            <View style={style.backgroundPic}>
                <Image source={require('../../../assets/watermark.png')} style={{ height: height / 2 }} resizeMethod="resize" resizeMode="contain" />
            </View>
        </View>
    )
}