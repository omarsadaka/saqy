import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { moderateScale } from '../../utils/moderateScale';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import { User } from '../../components/api/UserUtilities';
const { width, height } = Dimensions.get('window');
import style from './ServiceRequestSummeryStyle';
import { createOrderRequestPaymentAction } from '../../redux/Cart/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
export default function ServiceRequestSummery({ navigation,route }) {
    const dispatch = useDispatch();
    const { order_cache_id, capacity, total, unit } = route.params;
    const [ methods, setMethods]= useState([])
    const [ methodId, setMethodId]= useState(null)
    const { createOrderLoading } = useSelector(state => state.cart);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPaymentMethod()
        });
        return unsubscribe;
    }, [])
    const getPaymentMethod=()=>{
        User.allPaymetMethods().then(res=>{
            console.log('allPaymetMethods', JSON.stringify(res))
            if(res.data){
              const data =[]
              var arr = res.data
             for (let index = 0; index < arr.length; index++) {
               const obj = {
                 id: arr[index].id,
                 name: arr[index].name,
                 photo: arr[index].logo,
                }
               data.push(obj)
              }
              setMethods(data);
            }
           }).catch(err=>{
             console.log(err)
           })
    }

    const renderPayItem=({item})=>{
        return(
                <TouchableOpacity style={[methodId==item.id ? style.clickedMethod:  style.unClickedMethod]}
                onPress={()=> setMethodId(item.id)}>
                    <Image source={{uri: item.photo}} style={{width: width*0.2, height:height*0.08,marginVertical:3}} resizeMode='contain' />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#363636', fontSize: moderateScale(16) }}>{item.name}</Text>
                </TouchableOpacity>
        )
    }
    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <Header height={height / 7} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle={"ملخص"} />
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', margin: 8 }}>
                    <Image source={require('../../../assets/9.png')} />
                </View>
                <View style={{ width: '95%', height: height / 4, alignItems: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', margin: 8 }}>
                    <View style={{ width: '90%', height: '100%', justifyContent: 'space-around' }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{color: '#363636', fontSize: moderateScale(18) }}>{capacity} {unit}</Text>
                            <Text style={{flex:1, textAlign: 'right', textAlignVertical: 'center',color: '#363636', fontSize: moderateScale(14), fontFamily: 'HacenMaghrebBd' }}>عدد اللترات المراد تحليتها</Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#363636', fontSize: moderateScale(18) }}>{total} <Text style={{ fontSize: moderateScale(12), color: '#363636', fontFamily: 'HacenMaghrebBd' }}>ر.س</Text></Text>
                            <Text style={{flex:1, textAlign: 'right', textAlignVertical: 'center',color: '#363636', fontSize: moderateScale(14), fontFamily: 'HacenMaghrebBd' }}>سعر الخدمة</Text>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#000000', fontSize: moderateScale(18) }}>{total} <Text style={{ fontSize: moderateScale(12), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>ر.س</Text></Text>
                            <Text style={{flex:1, textAlign: 'right', textAlignVertical: 'center', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>السعر الأجمالى</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <View style={{ width: '90%', alignItems: 'flex-end' }}>
                        <Text style={{ textAlignVertical: 'center', textAlign: 'right', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>طريقة الدفع</Text>
                    </View>
                    <View style={{ width: '90%', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <FlatList
                      data={methods}
                      horizontal
                      keyExtractor={item => item.id}
                      renderItem={renderPayItem}
                      ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا توجد طرق دفع فى الوقت الحالى</Text>
                        </View>
                    )}
                />
                </View>

                    {/* <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: '45%', height: height * 0.18, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', margin: 8 }}>
                            <Image source={require('../../../assets/credit_payment.png')} style={{ margin: '10%' }} />
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#363636', fontSize: moderateScale(16), fontFamily: 'HacenMaghrebBd' }}>اون لاين</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '45%', height: height * 0.18, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', margin: 8 }}>
                            <Image source={require('../../../assets/cash_payment.png')} style={{ margin: '10%' }} />
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#363636', fontSize: moderateScale(16), fontFamily: 'HacenMaghrebBd' }}>نقدى</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                    <CustomButton onPress={() => {
                        if(methodId) dispatch(createOrderRequestPaymentAction(methodId,order_cache_id ,navigation, total,))
                        else showMessage({ message: 'إختر طريقة الدفع أولا', backgroundColor: '#FF6F61' })
                        }} 
                        BtnTitle="سداد" borderRadius={Math.round(width / 2 + height / 2)} LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']} Loading={createOrderLoading} />
                </View>
            </ScrollView>
        </View>
    )
}