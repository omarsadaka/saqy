import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  Platform,
} from 'react-native';
import {Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import style from './HeaderStyle';
import HeaderBackground from '../../../assets/header_background';
import BackBtn from '../../../assets/back_btn';
import CartIcon from '../../../assets/cart_icon';
import ProfilePic from '../../../assets/profile_pic';
import EditProfileIcon from '../../../assets/edit_profile_icon';
import {moderateScale} from '../../utils/moderateScale';
import {GetProfileDataAction} from '../../redux/Profile/Actions';
const {width, height} = Dimensions.get('window');
import {Icon} from 'react-native-elements';

export default function Header({
  height,
  hideBackgroundImage,
  onBackButtonPressed,
  showBackBtn,
  headerTitle,
  showCartIcon,
  onCartIconPressed,
  top,
  onEditProfilePressed,
  close,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProfileDataAction());
  }, []);
  const {cartCount} = useSelector(state => state.cart);
  const {profileData} = useSelector(state => state.Profile);

  return (
    <View style={[style.mainHeaderContainer, {height: height}]}>
      {hideBackgroundImage ? null : <HeaderBackground resizeMode="contain" />}
      <View
        style={{
          width: '90%',
          height: '100%',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          position: 'absolute',
          top: top,
        }}>
        {showBackBtn ? (
          <TouchableOpacity
            onPress={onBackButtonPressed}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {close ? (
              <Icon name={'x'} type="feather" size={25} color={'#ffffff'} />
            ) : (
              <BackBtn fill={hideBackgroundImage ? '#000000' : '#fafafa'} />
            )}
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{
            width: '90%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onEditProfilePressed}>
          {headerTitle ? (
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                width: '95%',
                height: Platform.OS == 'android' ? '100%' : '25%',
                color: hideBackgroundImage ? '#000000' : '#FFFFFF',
                fontSize: moderateScale(20),
                fontFamily: 'HacenMaghrebLt',
              }}>
              {headerTitle}
            </Text>
          ) : (
            <View style={{margin: 8}}>
              {profileData?.data?.photo ? (
                <Image
                  source={{uri: profileData.data.photo}}
                  style={{width: width * 0.25, height: width * 0.25}}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: width * 0.25, height: width * 0.25}}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity
                style={{position: 'absolute', bottom: 0, right: 0}}
                onPress={onEditProfilePressed}>
                <EditProfileIcon />
              </TouchableOpacity>
            </View>
          )}
          {headerTitle ? null : (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: moderateScale(20),
                  color: '#FAFAFA',
                  fontFamily: 'HacenMaghrebBd',
                }}
                numberOfLines={2}>
                هلا {profileData?.data?.name}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {showCartIcon ? (
          <TouchableOpacity
            onPress={onCartIconPressed}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: height * 0.07,
              right: 0,
              zIndex: 1,
            }}>
            <View>
              <CartIcon />
              <Badge
                badgeStyle={{backgroundColor: '#FC9E22'}}
                value={cartCount}
                containerStyle={{position: 'absolute', top: -6, right: -10}}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
