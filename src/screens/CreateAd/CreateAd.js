import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, Platform } from 'react-native';
import Header from '../../components/Header/Header';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { moderateScale } from '../../utils/moderateScale';


const { width, height } = Dimensions.get('window');


export default function CreateAd({ navigation }) {
    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <Header height={height / 4.5} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle="اعلانات" />
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/AdPhotoSample.png')} />
            </View>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ width: '95%', alignItems: 'flex-end', justifyContent: 'center', margin: 5 }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: moderateScale(15), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>تفاصيل الاعلان</Text>
                </View>
                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', margin: '5%' }}>
                    <CustomTextInput placeholder={"العنوان"} addtionalContainerStyle={Platform.OS === 'ios' ? { height: '100%', margin: '5%' } : undefined} placeholderTextColor="#888888" />
                    <CustomTextInput placeholder={"الوصف"} placeholderTextColor="#888888" additionalStyle={{ height: height / 6 }} multiline={true} textAlignVertical="top" numberOfLines={3} />
                    <CustomTextInput placeholder={"سعة الخزانات"} addtionalContainerStyle={Platform.OS === 'ios' ? { height: '100%', margin: '5%' } : undefined} placeholderTextColor="#888888" />
                </View>
                <View style={{ width: '50%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomButton BtnTitle="متابعة" borderRadius={Math.round(width / 2 + height / 2)} fontColor="#000000" additionalStyle={{ width: '100%', height: '100%', backgroundColor: 'transparent', borderColor: "#888888", borderWidth: 1 }} />
                </View>
            </ScrollView>
        </View>
    )
}