import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, RefreshControl } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import CustomButton from '../../components/CustomButton/CustomButton';
import LogoutIcon from '../../../assets/logout_icon';
import { moderateScale } from '../../utils/moderateScale';
import { ResetUserData } from '../../redux/Login/Actions';
import { CheckActiveUserAction } from '../../redux/Location/Actions';
const { width, height } = Dimensions.get('window');

export default function Profile({ navigation }) {

    const dispatch = useDispatch();
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(CheckActiveUserAction(navigation));
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(CheckActiveUserAction(navigation));
          });
          return unsubscribe;
    }, []);

    const onLogoutPress = async () => {
        await AsyncStorage.removeItem('user_token').then((value) => {
            AsyncStorage.getItem('user_token')
                .then((val) => {
                    if(!val){
                        setLogoutModalVisible(false);
                        dispatch(ResetUserData());
                        AsyncStorage.clear();
                        navigation.replace("Login");
                        
                    }
            })
        })

    }

   const renderLogOutModel=()=>{
    return(
        <Modal
                style={{ flex: 1 }}
                isVisible={logoutModalVisible}
                // animationIn="zoomInDown"
                // animationOut="zoomOutUp"
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}>
                <KeyboardAvoidingView enabled style={{ height: height / 3, backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 5 }}>
                    <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                        <View style={{ width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: '#494949', fontSize: moderateScale(20), fontFamily: 'HacenMaghrebLt' }}>تسجيل خروج</Text>
                        </View>
                        <View style={{ width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: '#494949', fontSize: moderateScale(20), fontFamily: 'HacenMaghrebLt' }}>هل ترغب في الخروج من التطبيق ؟</Text>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '45%', alignItems: 'center', justifyContent: 'center', margin: 8 }}>
                                <CustomButton onPress={() => setLogoutModalVisible(false)} borderRadius={5} fontColor="#000000" BtnTitle="رجوع" additionalStyle={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }} />
                            </View>
                            <View style={{ width: '45%', alignItems: 'center', justifyContent: 'center', margin: 8 }}>
                                <CustomButton onPress={() => onLogoutPress()} borderRadius={5} fontColor="#FFFFFF" BtnTitle="تأكيد" additionalStyle={{ width: '100%', height: '100%', backgroundColor: '#5ABD8C' }} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
    )
}
   
    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <Header height={height / 4} onBackButtonPressed={() => navigation.goBack()} headerTitle=""  onEditProfilePressed={()=> navigation.navigate('EditProfile')}/>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl
                  colors={['blue','gray']}
                  refreshing={loading}
                  onRefresh={()=> console.log('aaa')} />
                }>
                <View style={{ margin: 8, width: '95%', height: height * 0.15, alignItems: 'center', justifyContent: 'space-around', borderRadius: 5, backgroundColor: '#FFFFFF', }}>
                    <TouchableOpacity onPress={()=> {navigation.navigate('ChangePassword')}} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>تغيير كلمة المرور</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center' }}>تغيير رقم الجوال </Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ width: '95%', height: height * 0.50, alignItems: 'center', justifyContent: 'space-around', borderRadius: 5, backgroundColor: '#FFFFFF', margin: 8, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center' ,fontFamily: 'HacenMaghrebBd'}}>المفضلة</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('AddAddress')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center' }}>إضافة عنوان</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.navigate('MyAddress')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>عناوينى</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ContactUs")} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>تواصل معنا</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>من نحن</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>الشروط و الأحكام</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HelpAndSupport')} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                        <Image source={require('../../../assets/ForwardIcon.png')} />
                        <Text style={{ color: '#000000', fontSize: moderateScale(15), textAlign: 'right', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>الدعم والمساعدة</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', backgroundColor: '#EEEEEE', height: 1 }} />
                    <TouchableOpacity onPress={() => setLogoutModalVisible(true)} style={{ flexDirection: 'row', width: '95%', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: moderateScale(15), color: '#1579BB', paddingHorizontal: 10, textAlign: 'center', textAlignVertical: 'center',fontFamily: 'HacenMaghrebBd' }}>تسجيل الخروج</Text>
                        <LogoutIcon />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {renderLogOutModel()}
        </View>
    )
}