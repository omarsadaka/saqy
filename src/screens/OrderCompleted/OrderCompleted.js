import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from '../../utils/moderateScale';
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveDimensions';
import CustomButton from '../../components/CustomButton/CustomButton';
import OrderCompleteIcon from '../../../assets/order_complete_icon';
import { getCartDataAction } from '../../redux/Cart/Actions';

const { width, height } = Dimensions.get('window');

export default function OrderCompleted({ navigation }) {

    const dispatch = useDispatch();

    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', height: responsiveHeight(80), alignItems: 'center', justifyContent: 'space-around' }}>
                <OrderCompleteIcon />
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>تم ارسال الطلب إلى مزود الخدمة</Text>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>وسيصلك <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#1558A2', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>إشعار</Text> بحالة الطلب</Text>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomButton onPress={() => {
                        //dispatch(getCartDataAction())
                        navigation.replace("BottomNavigator", { guest: false })
                    }} borderRadius={23} fontColor="#233B5D" BtnTitle="العودة" additionalStyle={{ width: '90%', height: '100%', backgroundColor: 'transparent', borderColor: "#233B5D", borderWidth: 1 }} />
                </View>
            </View>
        </View>
    )
}