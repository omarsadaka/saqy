import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import style from './VerificationStyle';
import AppLogo from '../../../assets/app_logo';
import CodeInput from '../../components/CodeInput/CodeInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import BackgroundIcon from '../../../assets/background_icon';
import {
  VerificationAction,
  ResendCodeAction,
  VerificationEditMobileAction,
} from '../../redux/Verification/Actions';
import {generateCodeAction} from '../../redux/SMS/Actions';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export default function Verification({navigation, route}) {
  const {number, type} = route.params;

  const [codeValue, setCodeValue] = useState('');
  const [attempts, setAttempts] = useState(0);

  const dispatch = useDispatch();

  const onVerificationPressed = () => {
    console.log('token', number);
    if (!codeValue) {
      showMessage({
        message: 'برجاء إدخال كود التفعيل',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    if (type == 'Edit')
      dispatch(VerificationEditMobileAction(codeValue, number, navigation));
    else dispatch(VerificationAction(codeValue, number, navigation, type));
  };

  // const { attempts } = useSelector(state => state.sms);

  const onResendSMSPressed = () => {
    setAttempts(attempts + 1);
    if (attempts === 3) {
      showMessage({
        message: 'لقد تخطيت الحد الاقصى من إعادة إرسال كود التفعيل',
        backgroundColor: '#FF6F61',
      });
      return;
    }
    dispatch(ResendCodeAction(number));
  };

  const {VerificationLoading, ResendCodeLoading, Verified, VerificationFail} =
    useSelector(state => state.verification);

  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image source={require('../../../assets/logo.png')} />
        <Text style={style.textStyle}>تسجيل حساب</Text>
      </View>
      <View
        style={{
          width: '80%',
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CodeInput
          value={codeValue}
          setValue={setCodeValue}
          onChangeText={value => setCodeValue(value)}
        />
      </View>
      <View
        style={{width: '65%', height: '100%', alignItems: 'center', zIndex: 2}}>
        <CustomButton
          Loading={VerificationLoading}
          onPress={() => {
            onVerificationPressed();
          }}
          BtnTitle="تفعيل"
          borderRadius={23}
          LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
        />

        <TouchableOpacity
          style={{width: '100%', alignItems: 'center', marginTop: '10%'}}
          onPress={() => onResendSMSPressed()}>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#42B5D0',
              fontSize: 20,
            }}>{`إعادة إرسال ${attempts}-3`}</Text>
        </TouchableOpacity>
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
