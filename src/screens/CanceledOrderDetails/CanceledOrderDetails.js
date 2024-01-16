import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import Header from '../../components/Header/Header';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import { moderateScale } from '../../utils/moderateScale';
import { getOrderDetailsAction, getServiceDetailsAction } from '../../redux/Orders/Actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './CanceledOrderDetailsStyle';
import moment from "moment";
const { width, height } = Dimensions.get('window');
import Loading from '../../components/Loading/Loading';


export default function CancelOrderDetails({ navigation, route }) {
    const {OrderID, Type} = route.params
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { orderDetailsLoading, orderDetails, orderDetailsFail } = useSelector(state => state.orders);
   
    useEffect(() => {
        if(Type=='Order') dispatch(getOrderDetailsAction(OrderID));
        else dispatch(getServiceDetailsAction(OrderID));
        setLoading(false)
    }, [])

    console.log('orderDetails', orderDetails)

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];
    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#FFF' }}>
            <Header height={height / 8} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle={"الملغى"} />
            {orderDetailsLoading || loading? <Loading/> :
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl
                  colors={['blue','gray']}
                  refreshing={loading}
                  onRefresh={()=> {
                    setLoading(true)
                    if(Type=='Order') dispatch(getOrderDetailsAction(OrderID));
                    else dispatch(getServiceDetailsAction(OrderID));
                    setLoading(false)
                  }} />
                }>
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8 }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>بيانات الطلب</Text>
                </View>
                {Type=='Order'?
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>المنتجات / الخدمات</Text>
                </View>
                :
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{orderDetails?.data?.provider_service?.capacity?.name} {orderDetails?.data?.provider_service?.capacity?.unit.name}</Text>
                </View>
                }
                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                    <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'الإجمالى'}</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{orderDetails?.data?.total}</Text>
                    </View>
                    </View>
                    <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                    <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'سعر التوصيل'}</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{orderDetails?.data?.delivery_fees}</Text>
                    </View>
                    </View>
                </View>
                {/* <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '45%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>سعة الخزانات</Text>
                    </View>
                    <View style={{ width: '45%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>عدد الخزانات</Text>
                    </View>
                </View> */}
                 {Type=='Order'?
                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                  <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'الوقت'}</Text>
                  <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8,fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{moment.utc(orderDetails?.data?.created_at).format("h:MM:ss")}</Text>
                  </View>
                  </View>
                  <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                  <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'التاريخ'}</Text>
                  <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{moment.utc(orderDetails?.data?.created_at).format("YYYY-MM-DD")}</Text>
                 </View>
                 </View>
               </View>
                :
                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                   <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                   <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'تاريخ الخدمة'}</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{orderDetails?.data?.delivery_date}</Text>
                    </View>
                   </View>
                    <View style={{width: '45%',alignItems:'center',margin: 8,}}>
                    <Text style={{width: '95%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'وقت الخدمة'}</Text>
                    <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{orderDetails?.data?.delivery_time}</Text>
                    </View>
                    </View>
                </View>
                }
               {orderDetails?.data?.expected_delivery_date?
               <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center',}}>
                 <Text style={{width: '90%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'وقت الوصول المتوقع'}</Text>
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>
                      {/* {moment.utc(orderDetails?.data?.expected_delivery_date).format("YYYY-MM-DD  HH:MM:SS")} */}
                      {((orderDetails?.data?.expected_delivery_date).split('.')[0].replace('T', '  '))}
                      </Text>
                </View>
               </View>:null}
               
                <Text style={{width: '90%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'الحالة'}</Text>
                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '95%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{'ملغى'}</Text>
                    </View>
                </View>
                <Text style={{width: '90%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'سبب الإلغاء'}</Text>

                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '95%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{Type=='Order'?orderDetails?.data?.cancelation?.reason:orderDetails?.data?.cancel_reason }</Text>
                    </View>
                </View>
                <Text style={{width: '90%', textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{'العنوان'}</Text>
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>{orderDetails?.data?.address?.address}</Text>
                </View>
                
                {orderDetails?.data?.status_history?
                <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center',}}>
                {
                    orderDetails?.data?.status_history.map(item => {
                     return (
                         <View style={{width: '95%', marginVertical: 5, alignItems:'flex-end'}}>
                         <View style={{flexDirection:'row-reverse'}}>
                            <Text style={{ textAlign: 'right',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{'تم تغير حالة الطلب إلي'}</Text>
                            <Text style={{ textAlign: 'center',fontSize: moderateScale(16), color: 'red', fontFamily: 'HacenMaghrebLt',marginHorizontal:width*0.02 }}>{item.status}</Text>
                            <Text style={{ textAlign: 'center',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{'بواسطة'}</Text>
                            <Text style={{ textAlign: 'center',fontSize: moderateScale(16), color: 'red', fontFamily: 'HacenMaghrebLt',marginHorizontal:width*0.02 }}>{item.updated_by}</Text>
                         </View>
                         <View style={{flexDirection:'row-reverse'}}>
                            <Text style={{ textAlign: 'center',fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{'بتاريخ'}</Text>
                            <Text style={{ textAlign: 'center',fontSize: moderateScale(16), color: 'red', fontFamily: 'HacenMaghrebLt',marginHorizontal:width*0.02 }}>{ ((item.created_at).split('.')[0].replace('T', '  '))}</Text>
                         </View>
                         </View>
                     );
                 })
                }
             </View>
                :null}
                {/* <View style={{ width: '95%', alignItems: 'center', margin: 8 }}>
                    <CustomTextInput placeholder={orderDetails?.data?.cancelation?.reason}  placeholderTextColor="#000000" additionalStyle={{ fontFamily: 'HacenMaghrebLt', height: height / 4 }} multiline={true} textAlignVertical="top" numberOfLines={3} blurOnSubmit={true} returnKeyLabel="done" returnKeyType="done" />
                </View> */}
            </ScrollView>
           }
        </View>
    )
}