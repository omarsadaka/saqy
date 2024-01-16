import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import style from './LoginStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loading from '../../components/Loading/Loading';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';
import PhoneIcon from '../../../assets/phone_icon';
import ShowPasswordIcon from '../../../assets/show_password_icon';
import {moderateScale} from '../../utils/moderateScale';
import {LoginAction} from '../../redux/Login/Actions';
const {width, height} = Dimensions.get('window');

export default function Login({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const dispatch = useDispatch();

  const onLoginPressed = () => {
    if (!phoneNumber || !password) {
      showMessage({
        message: 'برجاء إدخال البيانات',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    dispatch(LoginAction(phoneNumber, password.trim(), fcmToken, navigation));
  };

  const {LoginLoading, LoggedUser} = useSelector(state => state.login);

  useEffect(() => {
    setLoginLoading(true);
    AsyncStorage.getItem('user_token').then(userToken => {
      if (userToken !== null) {
        console.log('user token: ', userToken);
        navigation.replace('BottomNavigator', {guest: false});
        return;
      }
      setLoginLoading(false);
    });
    getFcmToken();
    return () => setLoginLoading(false);
  }, []);

  const getFcmToken = async () => {
    await AsyncStorage.getItem('fcmToken').then(fcmToken => {
      if (fcmToken !== null) {
        console.log('fcmToken', fcmToken);
        setFcmToken(fcmToken);
      }
    });
  };

  return loginLoading ? (
    <Loading />
  ) : (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image source={require('../../../assets/logo.png')} />
        <Text style={style.textStyle}>مرحبا بك</Text>
      </View>
      <View style={style.textInputContainer}>
        <CustomTextInput
          HeadLine={'رقم الجوال'}
          keyboardType="numeric"
          onChangeText={value => setPhoneNumber(value)}
          icon={<PhoneIcon />}
        />
        <CustomTextInput
          HeadLine={'كلمة المرور'}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
      </View>
      <TouchableOpacity
        style={{width: '95%', alignItems: 'flex-end', marginTop: 8}}
        onPress={() => navigation.navigate('ForgetPassword')}>
        <Text
          style={{
            width: '100%',
            textAlign: 'left',
            textAlignVertical: 'center',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebBd',
          }}>
          نسيت كلمة المرور؟
        </Text>
      </TouchableOpacity>
      <View style={style.btnContainer}>
        <CustomButton
          Loading={LoginLoading}
          BtnTitle="دخول"
          onPress={() => onLoginPressed()}
          borderRadius={Math.round(width / 2 + height / 2)}
          LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text
            onPress={() => navigation.replace('BottomNavigator', {guest: true})}
            style={{
              width: '100%',
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#42B5D0',
              fontSize: moderateScale(20),
              fontFamily: 'HacenMaghrebBd',
            }}>
            الدخول كزائر
          </Text>
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'center', marginTop: '3%'}}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebBd',
          }}>
          ليس لديك حساب؟{' '}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              width: '100%',
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#42B5D0',
              fontSize: moderateScale(20),
              fontFamily: 'HacenMaghrebBd',
            }}>
            التسجيل
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
}
