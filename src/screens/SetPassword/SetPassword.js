import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import style from './SetPasswordStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';
import PhoneIcon from '../../../assets/phone_icon';
import ShowPasswordIcon from '../../../assets/show_password_icon';
import {SetPasswordAction} from '../../redux/SetPassword/Actions';

const {width, height} = Dimensions.get('window');

export default function SetPassword({navigation, route}) {
  const {number} = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const onSetPasswordPressed = () => {
    if (!password || !confirmPassword) {
      showMessage({
        message: 'برجاء إدخال كلمة المرور',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: 'برجاء التأكد من كلمة المرور',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    if (password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0) {
      showMessage({
        message: 'كلمه المرور غير صالحة يجب ألا تحتوى على مسافات',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    dispatch(
      SetPasswordAction(
        password.trim(),
        confirmPassword.trim(),
        number,
        navigation,
      ),
    );
  };

  const {SetPasswordLoading, PasswordConfirmed} = useSelector(
    state => state.setPassword,
  );

  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image source={require('../../../assets/logo.png')} />
        <Text style={style.textStyle}>تسجيل حساب</Text>
      </View>
      <View style={style.textInputContainer}>
        <CustomTextInput
          HeadLine={'كلمة المرور الجديدة'}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
        <CustomTextInput
          HeadLine={'إعادة إدخال كلمة المرور'}
          onChangeText={value => setConfirmPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
      </View>
      <View style={style.btnContainer}>
        <CustomButton
          Loading={SetPasswordLoading}
          onPress={() => onSetPasswordPressed()}
          BtnTitle="دخول"
          borderRadius={Math.round(width / 2 + height / 2)}
          LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
        />
      </View>
      <View style={style.backgroundPic}>
        <Image
          source={require('../../../assets/watermark.png')}
          style={{height: height / 2}}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
