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
import Modal from 'react-native-modal';
import Header from '../../components/Header/Header';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {moderateScale} from '../../utils/moderateScale';
import NestleLogo from '../../../assets/nestle_logo';
import {
  getOrderDetailsAction,
  CancelOrderAction,
  CancelServiceAction,
  getServiceDetailsAction,
} from '../../redux/Orders/Actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './NewOrderDetailsStyle';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');
import Loading from '../../components/Loading/Loading';
import RateStar from '../../../assets/rate_star';

export default function NewOrderDetails({navigation, route}) {
  const {OrderID, Type} = route.params;
  const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState('');
  const dispatch = useDispatch();
  const {
    orderDetailsLoading,
    orderDetails,
    orderDetailsFail,
    cancelOrderLoading,
    cancelOrder,
  } = useSelector(state => state.orders);

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
        headerTitle={'طلب جديد'}
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
                loadData();
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
                fontFamily: 'HacenMaghrebBd',
              }}>
              بيانات مقدم الخدمة
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              elevation: 5,
              shadowColor: '#233B5D',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {height: 1, width: 1},
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row-reverse',
                paddingVertical: height * 0.02,
              }}>
              <View style={style.imageContainer}>
                <Image
                  source={{uri: orderDetails?.data?.provider.logo}}
                  style={{width: '100%', height: height * 0.1}}
                  resizeMode="contain"
                />
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      textAlignVertical: 'center',
                      paddingHorizontal: 8,
                      fontSize: moderateScale(16),
                      color: '#000000',
                      width: '100%',
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    {orderDetails?.data?.provider.user.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      textAlignVertical: 'center',
                      paddingHorizontal: 8,
                      fontSize: moderateScale(12),
                      color: '#000000',
                      width: '100%',
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    {orderDetails?.data?.provider?.user.address}
                  </Text>
                </View>
              </View>
              <View style={style.rateContainer}>
                <Text style={style.rate}>
                  {orderDetails?.data?.provider.reviews}
                </Text>
                <RateStar />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  paddingHorizontal: 8,
                  fontSize: moderateScale(12),
                  color: '#000000',
                  width: '100%',
                  fontFamily: 'HacenMaghrebLt',
                }}>
                {orderDetails?.data?.provider.bio}
              </Text>
            </View>
          </View>
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
                fontFamily: 'HacenMaghrebBd',
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
          <View
            style={{
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{width: '45%', alignItems: 'center', margin: 8}}>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'الإجمالى'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
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
                  {orderDetails?.data?.total}
                </Text>
              </View>
            </View>
            <View style={{width: '45%', alignItems: 'center', margin: 8}}>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'right',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {'سعر التوصيل'}
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
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
                  {orderDetails?.data?.delivery_fees}
                </Text>
              </View>
            </View>
          </View>
          {Type == 'Order' ? (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '45%', alignItems: 'center', margin: 8}}>
                <Text
                  style={{
                    width: '95%',
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
                      .format('h:MM:ss')}
                  </Text>
                </View>
              </View>
              <View style={{width: '45%', alignItems: 'center', margin: 8}}>
                <Text
                  style={{
                    width: '95%',
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
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#EEEEEE',
                  }}>
                  {/* `${monthNames[new Date(orderDetails?.data?.created_at).getMonth()] */}
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
              </View>
            </View>
          ) : (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '45%', alignItems: 'center', margin: 8}}>
                <Text
                  style={{
                    width: '95%',
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
              </View>
              <View style={{width: '45%', alignItems: 'center', margin: 8}}>
                <Text
                  style={{
                    width: '95%',
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
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '95%',
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
                {'طلب جديد'}
              </Text>
            </View>
          </View>
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

          {showBtn && orderDetails?.data?.payment_method?.id == 1 && (
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 8,
              }}>
              <CustomButton
                onPress={() => setCancelReasonModal(true)}
                borderRadius={Math.round(width / 2 + height / 2)}
                fontColor="#233B5D"
                BtnTitle="إلغاء الطلب"
                additionalStyle={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  borderColor: '#233B5D',
                  borderWidth: 1,
                }}
              />
            </View>
          )}
        </ScrollView>
      )}
      <Modal
        style={{flex: 1}}
        isVisible={cancelReasonModal}
        // animationIn="zoomInDown"
        // animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <KeyboardAvoidingView
          enabled
          style={{
            height: height / 2.5,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: '100%',
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#494949',
                  fontSize: moderateScale(20),
                  fontFamily: 'HacenMaghrebLt',
                }}>
                إلغاء الطلب
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                height: height / 6,
              }}>
              <CustomTextInput
                placeholder={'سبب إلغاء الطلب'}
                value={cancelReason}
                onChangeText={value => setCancelReason(value)}
                additionalStyle={{
                  paddingTop: '5%',
                  height: height / 6,
                  fontFamily: 'HacenMaghrebLt',
                }}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={3}
                blurOnSubmit={true}
                returnKeyLabel="done"
                returnKeyType="done"
              />
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 8,
                }}>
                <CustomButton
                  onPress={() => setCancelReasonModal(false)}
                  borderRadius={5}
                  fontColor="#000000"
                  BtnTitle="رجوع"
                  additionalStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </View>
              <View
                style={{
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 8,
                }}>
                <CustomButton
                  onPress={() => {
                    if (cancelReason) {
                      if (cancelReason.length >= 3) {
                        if (Type == 'Order')
                          dispatch(CancelOrderAction(OrderID, cancelReason));
                        else
                          dispatch(CancelServiceAction(OrderID, cancelReason));

                        clearTimeout(timeout);
                        let timeout = setTimeout(() => {
                          if (!cancelOrder) {
                            setCancelReason(null);
                            setCancelReasonModal(false);
                            setShowBtn(false);
                            navigation.goBack();
                          }
                        }, 1000);
                      } else
                        showMessage({
                          message: 'السبب يجب ألا يقل عن ٣ حروف',
                          backgroundColor: '#FF6F61',
                        });
                    } else
                      showMessage({
                        message: 'أدخل سبب إلغاء الطلب',
                        backgroundColor: '#FF6F61',
                      });
                  }}
                  borderRadius={5}
                  fontColor="#FFFFFF"
                  BtnTitle="تأكيد"
                  additionalStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#5ABD8C',
                  }}
                  Loading={cancelOrderLoading}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
