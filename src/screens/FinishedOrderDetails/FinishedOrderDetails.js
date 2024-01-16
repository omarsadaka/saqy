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
import {Rating, AirbnbRating} from 'react-native-ratings';
import Header from '../../components/Header/Header';
import {moderateScale} from '../../utils/moderateScale';
import NestleLogo from '../../../assets/nestle_logo';
import {
  getOrderDetailsAction,
  getServiceDetailsAction,
} from '../../redux/Orders/Actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './FinishedOrderDetailsStyle';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import moment from 'moment';
import {User} from '../../components/api/UserUtilities';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');
import Loading from '../../components/Loading/Loading';
import RateStar from '../../../assets/rate_star';

export default function FinishedOrderDetails({navigation, route}) {
  const [rate, setRate] = useState(0);
  const {OrderID, Type} = route.params;
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const dispatch = useDispatch();
  const {orderDetailsLoading, orderDetails, orderDetailsFail} = useSelector(
    state => state.orders,
  );

  useEffect(() => {
    if (Type == 'Order') dispatch(getOrderDetailsAction(OrderID));
    else dispatch(getServiceDetailsAction(OrderID));
    setLoading2(false);
  }, []);

  console.log('orderDetails', orderDetails);

  const sendRate = async () => {
    const values = {
      provider_id: orderDetails?.data.provider.id,
      rate: rate,
      comment: comment,
    };
    setLoading(true);
    User.sendRate(values)
      .then(res => {
        setLoading(false);
        console.log('contact_us', JSON.stringify(res));
        if (res.status) {
          showMessage({message: res.message, backgroundColor: 'green'});
          setComment('');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err', JSON.stringify(err));
      });
  };
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
        headerTitle={'المنتهى'}
      />
      {orderDetailsLoading || loading2 ? (
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
              {/* {moment
                .utc(orderDetails?.data?.expected_delivery_date)
                .format('YYYY-MM-DD  HH:MM')} */}
              {orderDetails?.data?.expected_delivery_date
                ? (orderDetails?.data?.expected_delivery_date)
                    .split('.')[0]
                    .replace('T', '  ')
                : ''}
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
                  fontFamily: 'HacenMaghrebLt',
                }}>
                {'منتهى'}
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

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
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
                تقييم
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: height * 0.4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              margin: 8,
              elevation: 5,
              shadowColor: '#233B5D',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {height: 1, width: 1},
            }}>
            <AirbnbRating
              showRating={false}
              ratingCount={5}
              defaultRating={orderDetails?.data?.provider.reviews}
              onFinishRating={value => setRate(value)}
              ratingBackgroundColor="#FFFFFF"
              size={25}
              // isDisabled={}
            />
            <CustomTextInput
              placeholder={'أكتب تعليق'}
              onChangeText={value => setComment(value)}
              value={comment}
              textAlignVertical="top"
              additionalStyle={{height: height * 0.15}}
            />
            <CustomButton
              BtnTitle="إرسال"
              borderRadius={Math.round(width / 2 + height / 2)}
              additionalStyle={{marginTop: height * 0.01}}
              LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
              Loading={loading}
              onPress={() => sendRate()}
            />
          </View>
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
