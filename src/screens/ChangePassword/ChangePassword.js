import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import style from './ChangePasswordStyle';
import CustomTextInput3 from '../../components/CustomTextInput3/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AppLogo from '../../../assets/app_logo';
import BackgroundIcon from '../../../assets/background_icon';
import PhoneIcon from '../../../assets/phone_icon';
import ShowPasswordIcon from '../../../assets/show_password_icon';
import {ChangePasswordAction2} from '../../redux/ChangePassword/Actions';
import Header from '../../components/Header/Header';

const {width, height} = Dimensions.get('window');

export default function ChangePassword({navigation}) {
  const [currentPassword, setCurretPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const onChangePasswordPressed = () => {
    if (!password || !confirmPassword || !currentPassword) {
      showMessage({
        message: 'برجاء إدخال كلمة المرور',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: 'كلمة المرور وتأكيد كلمه المرور يجب أن تكون متطابقة',
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
      ChangePasswordAction2(
        currentPassword,
        password,
        confirmPassword,
        navigation,
      ),
    );
  };

  const {ChangePasswordLoading} = useSelector(state => state.changePassword);

  return (
    <View style={style.container}>
      <Header
        height={height / 4.5}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.pop()}
        headerTitle={'تغيير كلمة المرور'}
      />
      <View style={style.textInputContainer}>
        <CustomTextInput3
          HeadLine={'كلمة المرور الحالية'}
          onChangeText={value => setCurretPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
        <CustomTextInput3
          HeadLine={'كلمة المرور الجديدة'}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
        <CustomTextInput3
          HeadLine={'إعادة إدخال كلمة المرور'}
          onChangeText={value => setConfirmPassword(value)}
          secureTextEntry={true}
          icon={<ShowPasswordIcon />}
          clickable={true}
        />
      </View>
      <View style={style.btnContainer}>
        <CustomButton
          Loading={ChangePasswordLoading}
          onPress={() => onChangePasswordPressed()}
          BtnTitle="حفظ"
          borderRadius={Math.round(width / 2 + height / 2)}
          LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
        />
      </View>
      {/* <View style={style.backgroundPic}>
                <Image source={require('../../../assets/watermark.png')} style={{ height: height / 2 }} resizeMethod="resize" resizeMode="contain" />
            </View> */}
    </View>
  );
}
