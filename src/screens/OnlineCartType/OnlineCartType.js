import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { moderateScale } from '../../utils/moderateScale';
import CustomButton from '../../components/CustomButton/CustomButton';
const { width, height } = Dimensions.get('window');
import { finishOrderAction } from '../../redux/Cart/Actions';
import { useDispatch, useSelector } from 'react-redux';

export default function OnlineCartType({ navigation, route }) {
    const { Data } = route.params;
    const [ methodId, setMethodId]= useState(null)
    const dispatch = useDispatch();

    const { finishOrderLoading } = useSelector(state => state.cart);

    useEffect(() => {
    }, [])

   

   

    const RenderItem = ({ data: { PaymentMethodId,PaymentMethodAr,ImageUrl } }) => (
        <TouchableOpacity onPress={() => setMethodId(PaymentMethodId)} style={{ width: '95%', height: height * 0.1, margin: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth:1, backgroundColor: '#FFFFFF',borderColor: methodId==PaymentMethodId?'red':'#FFFFFF' }}>
            <View style={{ width: '100%', flexDirection: 'row-reverse', alignItems: 'center' }}>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center',marginHorizontal: width*0.02 }}>
                    <Image source={{uri: ImageUrl}} style={{ height: '100%', width: '100%', }} resizeMethod="resize" resizeMode="contain" />
                </View>
                <View style={{ width: '75%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={{ textAlign: 'right', textAlignVertical: 'center', width: '95%', fontSize: moderateScale(14), color: '#000000' }}>{PaymentMethodAr}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <Header height={height / 7} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle={"الدفع الإلكترونى"} />
            <View style={{ width: '100%', flex:1, alignItems: 'center' }}>
                <FlatList
                    data={Data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا توجد منتجات فى الوقت الحالى</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <CustomButton Loading={null} onPress={() => {
                        dispatch(finishOrderAction(methodId,navigation))
                        }} BtnTitle="سداد" borderRadius={Math.round(width / 2 + height / 2)} LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']} Loading={finishOrderLoading} />
                </View>
        </View>
    )
}