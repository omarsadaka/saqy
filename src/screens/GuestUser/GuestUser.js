/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../utils/moderateScale';
import SaqyLogoSmall from '../../../assets/saqy_logo_small';

const {width, height} = Dimensions.get('window');

export default function GuestUser({navigation}) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <LinearGradient
        end={{x: 0.0, y: 1.0}}
        start={{x: 1.0, y: 0.0}}
        colors={['#42B5D0', '#3EB0CE', '#1579BB']}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={{margin: 8, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#FFFFFF',
              textAlign: 'center',
              textAlignVertical: 'center',
              paddingHorizontal: 10,
              fontFamily: 'HacenMaghrebBd',
            }}>
            تسجيل الدخول
          </Text>
          <SaqyLogoSmall />
        </TouchableOpacity>
      </LinearGradient>
      <View
        style={{
          width: '100%',
          height: '40%',
          marginTop: '5%',
          justifyContent: 'space-around',
          alignItems: 'center',
          fontFamily: 'HacenMaghrebBd',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/ForwardIcon.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: moderateScale(15),
              textAlign: 'right',
              textAlignVertical: 'center',
              fontFamily: 'HacenMaghrebBd',
            }}>
            الرئيسية
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}
          onPress={() => navigation.navigate('HelpAndSupport')}>
          <Image source={require('../../../assets/ForwardIcon.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: moderateScale(15),
              textAlign: 'right',
              textAlignVertical: 'center',
              fontFamily: 'HacenMaghrebBd',
            }}>
            الدعم والمساعدة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ContactUs')}
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}>
          <Image source={require('../../../assets/ForwardIcon.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: moderateScale(15),
              textAlign: 'right',
              textAlignVertical: 'center',
              fontFamily: 'HacenMaghrebBd',
            }}>
            تواصل معنا
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AboutUs')}
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}>
          <Image source={require('../../../assets/ForwardIcon.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: moderateScale(15),
              textAlign: 'right',
              textAlignVertical: 'center',
              fontFamily: 'HacenMaghrebBd',
            }}>
            من نحن
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsAndConditions')}
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}>
          <Image source={require('../../../assets/ForwardIcon.png')} />
          <Text
            style={{
              color: '#000000',
              fontSize: moderateScale(15),
              textAlign: 'right',
              textAlignVertical: 'center',
              fontFamily: 'HacenMaghrebBd',
            }}>
            الشروط و الاحكام
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '80%',
          height: '40%',
          alignItems: 'flex-end',
          zIndex: 1,
        }}>
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
