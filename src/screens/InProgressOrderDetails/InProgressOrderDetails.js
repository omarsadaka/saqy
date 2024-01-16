import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header/Header';
import {moderateScale} from '../../utils/moderateScale';
import {
  getOrderDetailsAction,
  getServiceDetailsAction,
  ConfirmOrderAction,
  ConfirmServiceAction,
} from '../../redux/Orders/Actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import CustomButton from '../../components/CustomButton/CustomButton';
const {width, height} = Dimensions.get('window');

export default function InProgressOrderDetails({navigation, route}) {
  const {OrderID, Type} = route.params;
  const [loading, setLoading] = useState(true);
  const [loading_yes, setLoading_yes] = useState(false);
  const [loading_no, setLoading_no] = useState(false);
  const dispatch = useDispatch();
  const {orderDetailsLoading, orderDetails} = useSelector(
    state => state.orders,
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (Type == 'Order') dispatch(getOrderDetailsAction(OrderID));
    else dispatch(getServiceDetailsAction(OrderID));
    setLoading(false);
  };
  console.log('orderDetails', orderDetails);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}>
      <Header
        height={height / 8}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={
          orderDetails?.data?.status
            ? orderDetails?.data?.status
            : 'قيد التنفيذ'
        }
      />
      {orderDetailsLoading || loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={
            <RefreshControl
              colors={['blue', 'gray']}
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                if (Type == 'Order') dispatch(getOrderDetailsAction(OrderID));
                else dispatch(getServiceDetailsAction(OrderID));
                setLoading(false);
              }}
            />
          }>
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 8,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: moderateScale(16),
                color: '#000000',
                fontFamily: 'HacenMaghrebLt',
              }}>
              بيانات الطلب
            </Text>
          </View>
          {Type == 'Order' ? (
            <View
              style={{
                width: '90%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                margin: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#EEEEEE',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  margin: 8,
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                المنتجات / الخدمات
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: '90%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                margin: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#EEEEEE',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  margin: 8,
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {orderDetails?.data?.provider_service?.capacity?.name}{' '}
                {orderDetails?.data?.provider_service?.capacity?.unit.name}
              </Text>
            </View>
          )}
          <Text
            style={{
              width: '90%',
              textAlign: 'right',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'سعر التوصيل'}
          </Text>
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 8,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                margin: 8,
                fontSize: moderateScale(16),
                color: '#000000',
                fontFamily: 'HacenMaghrebLt',
              }}>
              {orderDetails?.data?.delivery_fees}
            </Text>
          </View>
          <Text
            style={{
              width: '90%',
              textAlign: 'right',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'الإجمالى'}
          </Text>
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 8,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                margin: 8,
                fontSize: moderateScale(16),
                color: '#000000',
                fontFamily: 'HacenMaghrebLt',
              }}>
              {orderDetails?.data?.total}
            </Text>
          </View>
          {/* <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>عدد الخزانات</Text>
                </View>
                <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>سعة الخزانات</Text>
                </View> */}
          {Type == 'Order' ? (
            <View style={{alignItems: 'center', width: '90%'}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'التاريخ'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    margin: 8,
                    fontSize: moderateScale(16),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {moment
                    .utc(orderDetails?.data?.created_at)
                    .format('YYYY-MM-DD')}
                </Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'الوقت'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    margin: 8,
                    fontSize: moderateScale(16),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {moment.utc(orderDetails?.data?.created_at).format('h:MM:ss')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center', width: '90%'}}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'تاريخ الخدمة'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    margin: 8,
                    fontSize: moderateScale(16),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {orderDetails?.data?.delivery_date}
                </Text>
              </View>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'وقت الخدمة'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    margin: 8,
                    fontSize: moderateScale(16),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {orderDetails?.data?.delivery_time}
                </Text>
              </View>
            </View>
          )}
          {orderDetails?.data?.expected_delivery_date ? (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '90%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'وقت الوصول المتوقع'}
              </Text>
              <View
                style={{
                  width: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    margin: 8,
                    fontSize: moderateScale(16),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  {/* {orderDetails?.data?.expected_delivery_date?moment.utc(orderDetails?.data?.expected_delivery_date).format("YYYY-MM-DD  HH:MM:SS"):''} */}
                  {(orderDetails?.data?.expected_delivery_date)
                    .split('.')[0]
                    .replace('T', '  ')}
                </Text>
              </View>
            </View>
          ) : null}
          <Text
            style={{
              width: '90%',
              textAlign: 'right',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'الحالة'}
          </Text>
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 8,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                margin: 8,
                fontSize: moderateScale(16),
                color: '#000000',
                fontFamily: 'HacenMaghrebLt',
              }}>
              {orderDetails?.data?.status}
            </Text>
          </View>
          {/* <View style={{ width: '90%', alignItems: 'flex-end', justifyContent: 'center', margin: 8, borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', margin: 8, fontSize: moderateScale(16), color: '#000000', fontFamily: 'HacenMaghrebLt' }}>{orderDetails?.data?.address?.address}</Text>
                </View> */}
          <Text
            style={{
              width: '90%',
              textAlign: 'right',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'العنوان'}
          </Text>
          <View
            style={{
              width: '90%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              margin: 8,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                margin: 8,
                fontSize: moderateScale(16),
                color: '#000000',
                fontFamily: 'HacenMaghrebBd',
              }}>
              {orderDetails?.data?.address?.address}
            </Text>
          </View>

          {orderDetails?.data?.status_id == 5 ? (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'تأكيد الوصول'}
              </Text>
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: height * 0.02,
                }}>
                <View style={{width: width * 0.4}}>
                  <CustomButton
                    BtnTitle="لا"
                    borderRadius={Math.round(width / 2 + height / 2)}
                    LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
                    Loading={loading_no}
                    onPress={() => {
                      setLoading_no(true);
                      if (Type == 'Order')
                        dispatch(ConfirmOrderAction(OrderID, 0));
                      else dispatch(ConfirmServiceAction(OrderID, 0));
                      setLoading_no(false);
                      clearTimeout(timeout);
                      let timeout = setTimeout(() => {
                        navigation.goBack();
                      }, 800);
                    }}
                  />
                </View>
                <View style={{width: width * 0.4}}>
                  <CustomButton
                    BtnTitle="نعم"
                    borderRadius={Math.round(width / 2 + height / 2)}
                    LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
                    Loading={loading_yes}
                    onPress={() => {
                      setLoading_yes(true);
                      if (Type == 'Order')
                        dispatch(ConfirmOrderAction(OrderID, 1));
                      else dispatch(ConfirmServiceAction(OrderID, 1));
                      setLoading_yes(false);
                      clearTimeout(timeout);
                      let timeout = setTimeout(() => {
                        navigation.goBack();
                      }, 800);
                    }}
                  />
                </View>
              </View>
            </View>
          ) : null}

          {orderDetails?.data?.status_history ? (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {orderDetails?.data?.status_history.map(item => {
                return (
                  <View
                    style={{
                      width: '95%',
                      marginVertical: 5,
                      alignItems: 'flex-end',
                    }}>
                    <View style={{flexDirection: 'row-reverse'}}>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: moderateScale(16),
                          color: '#000000',
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        {'تم تغير حالة الطلب إلي'}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: moderateScale(16),
                          color: 'red',
                          fontFamily: 'HacenMaghrebLt',
                          marginHorizontal: width * 0.02,
                        }}>
                        {item.status}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: moderateScale(16),
                          color: '#000000',
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        {'بواسطة'}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: moderateScale(16),
                          color: 'red',
                          fontFamily: 'HacenMaghrebLt',
                          marginHorizontal: width * 0.02,
                        }}>
                        {item.updated_by}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row-reverse'}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: moderateScale(16),
                          color: '#000000',
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        {'بتاريخ'}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: moderateScale(16),
                          color: 'red',
                          fontFamily: 'HacenMaghrebLt',
                          marginHorizontal: width * 0.02,
                        }}>
                        {item.created_at.split('.')[0].replace('T', '  ')}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}
