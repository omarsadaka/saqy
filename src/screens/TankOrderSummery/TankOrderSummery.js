import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {moderateScale} from '../../utils/moderateScale';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import {User} from '../../components/api/UserUtilities';
import style from './TankOrderSummeryStyle';
import {Icon} from 'react-native-elements';
import {
  getCartDataAction,
  getCartTotalAction,
  createOrderAction,
} from '../../redux/Cart/Actions';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');
var totalPrice = 0;
var installPrice = 0;
export default function TanksOrderSummery({navigation}) {
  const dispatch = useDispatch();
  const [methods, setMethods] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [methodId, setMethodId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState({});
  const {
    cartDataLoading,
    cartData,
    tanksCartReceiptLoading,
    cartTotalLoading,
    cartTotal,
    createOrderLoading,
  } = useSelector(state => state.cart);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getCartDataAction());
      dispatch(getCartTotalAction());
      // price()
      getPaymentMethod();
      getAllAddress();
      getDefaultAddress();
    });
    return unsubscribe;
  }, []);

  console.log('tanksCartReceipt: ', cartData);

  const price = () => {
    cartData.forEach(element => {
      if (element.available != 0) {
        totalPrice = totalPrice + Number(element.price * element.qty);
        installPrice = installPrice + Number(element.installation_price);
      }
    });
  };

  const getPaymentMethod = () => {
    User.allPaymetMethods()
      .then(res => {
        console.log('allPaymetMethods', JSON.stringify(res));
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              name: arr[index].name,
              photo: arr[index].logo,
            };
            data.push(obj);
          }
          setMethods(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getAllAddress = () => {
    User.getAllAdress()
      .then(res => {
        console.log('allPaymetMethods', JSON.stringify(res));
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            if (arr[index].city) {
              const obj = {
                id: arr[index].id,
                city: arr[index].city.name,
                address: arr[index].address,
                region: arr[index].city.region.name,
                country: arr[index].city.region.country.name,
              };
              data.push(obj);
            }
          }
          setAddresses(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDefaultAddress = () => {
    User.getDefaultAdress()
      .then(res => {
        console.log('getDefaultAdress', JSON.stringify(res));
        if (res.status) {
          setDefaultAddress(res.data);
          setAddressId(res.data.id);
        } else {
          setDefaultAddress(null);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderPayItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          methodId == item.id ? style.clickedMethod : style.unClickedMethod,
        ]}
        onPress={() => setMethodId(item.id)}>
        <Image
          source={{uri: item.photo}}
          style={{width: width * 0.2, height: height * 0.08, marginVertical: 3}}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebLt',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAddressItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          addressId == item.id ? style.clickedAddress : style.unClickedAddress,
        ]}
        onPress={() => setAddressId(item.id)}>
        <View
          style={{width: '90%', alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            name="edit"
            type="feather"
            size={20}
            color="#000000"
            onPress={() => navigation.navigate('EditAddress', {ID: item.id})}
          />
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              textAlignVertical: 'center',
              color: '#363636',
              fontSize: moderateScale(16),
              fontFamily: 'HacenMaghrebLt',
            }}
            numberOfLines={2}>
            {' '}
            {item.address} {','} {item.city}
          </Text>
        </View>
        <Text
          style={{
            width: '90%',
            textAlign: 'right',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebLt',
          }}>
          {item.region} {','} {item.country}
        </Text>
        <Icon
          name="edit"
          type="feather"
          size={20}
          color="#000000"
          style={{left: width * 0.02, top: height * 0.01, position: 'absolute'}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 7}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'ملخص'}
      />
      {cartDataLoading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              paddingVertical: height * 0.02,
            }}>
            <FlatList
              data={cartData}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity style={{margin: width * 0.01}}>
                  {item.available != 0 ? (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={{uri: item.product.photo}}
                        style={{
                          width: width * 0.25,
                          height: height * 0.12,
                          borderRadius: width * 0.02,
                        }}
                      />
                      <Text
                        style={{
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          color: '#363636',
                          fontSize: moderateScale(14),
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        السعر: {item.product.price}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          color: '#363636',
                          fontSize: moderateScale(14),
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        الكمية: {item.qty}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          color: '#363636',
                          fontSize: moderateScale(14),
                          fontFamily: 'HacenMaghrebLt',
                        }}>
                        الحجم: {item.product.size}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: '#363636',
                        fontSize: moderateScale(14),
                        fontFamily: 'HacenMaghrebLt',
                      }}>
                      {' '}
                      عنصر غير متاح
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: height / 4,
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              margin: 8,
            }}>
            <View
              style={{
                width: '90%',
                height: '100%',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: moderateScale(18),
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {Math.round(cartTotal.total_products)}{' '}
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: '#363636',
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    ر.س
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    color: '#363636',
                    fontSize: moderateScale(14),
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  سعر المنتجات
                </Text>
              </View>

              {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={{ color: '#363636', fontSize: moderateScale(18) }}>{`0`} <Text style={{ fontSize: moderateScale(12), color: '#363636' }}>ر.س</Text></Text>
                            <Text style={{ textAlign: 'right', textAlignVertical: 'center', color: '#363636', fontSize: moderateScale(14) }}>سعر التوصيل</Text>
                        </View> */}

              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: moderateScale(18),
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  {cartTotal.total_installation}{' '}
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      color: '#363636',
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    ر.س
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    color: '#363636',
                    fontSize: moderateScale(14),
                    fontFamily: 'HacenMaghrebLt',
                  }}>
                  سعر التركيب
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <Text style={{color: '#000000', fontSize: moderateScale(18)}}>
                  {Math.round(cartTotal.total)}{' '}
                  <Text style={{fontSize: moderateScale(12), color: '#000000'}}>
                    ر.س
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    color: '#000000',
                    fontSize: moderateScale(18),
                  }}>
                  السعر الأجمالى
                </Text>
              </View>
            </View>
          </View>

          <View style={{width: '90%', alignItems: 'flex-end'}}>
            <Text
              style={{
                textAlignVertical: 'center',
                textAlign: 'right',
                color: '#000000',
                fontSize: moderateScale(20),
                fontFamily: 'HacenMaghrebLt',
              }}>
              طريقة الدفع
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <FlatList
              data={methods}
              horizontal
              keyExtractor={item => item.id}
              renderItem={renderPayItem}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      width: '100%',
                      color: '#000000',
                      fontSize: moderateScale(15),
                      fontFamily: 'HacenMaghrebBd',
                    }}>
                    لا توجد طرق دفع فى الوقت الحالى
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{width: '90%', alignItems: 'flex-end'}}>
            <Text
              style={{
                textAlignVertical: 'center',
                textAlign: 'right',
                color: '#000000',
                fontSize: moderateScale(20),
                fontFamily: 'HacenMaghrebLt',
              }}>
              العنوان
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {defaultAddress ? (
              defaultAddress.address ? (
                <TouchableOpacity style={style.unClickedAddress}>
                  <View
                    style={{
                      width: '90%',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="edit"
                      type="feather"
                      size={20}
                      color="#000000"
                      onPress={() => setDefaultAddress(null)}
                    />
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        color: '#363636',
                        fontSize: moderateScale(16),
                        fontFamily: 'HacenMaghrebLt',
                      }}>
                      {defaultAddress.address} {defaultAddress?.city?.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: '90%',
                      textAlign: 'right',
                      textAlignVertical: 'center',
                      color: '#363636',
                      fontSize: moderateScale(16),
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    {defaultAddress?.city?.region?.name}{' '}
                    {defaultAddress?.city?.region?.country?.name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddAddress')}>
                  <Text
                    style={{
                      width: '90%',
                      textAlign: 'right',
                      textAlignVertical: 'center',
                      color: '#363636',
                      fontSize: moderateScale(16),
                      fontFamily: 'HacenMaghrebLt',
                    }}>
                    {'لا يوجد عناوين مضافه إضغط لإضافة عنوان'}
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <FlatList
                data={addresses}
                keyExtractor={item => item.id}
                renderItem={renderAddressItem}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        width: '100%',
                        color: '#000000',
                        fontSize: moderateScale(18),
                        fontFamily: 'HacenMaghrebBd',
                        fontFamily: 'HacenMaghrebLt',
                      }}>
                      لا توجد طرق دفع فى الوقت الحالى
                    </Text>
                  </View>
                )}
              />
            )}
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 8,
            }}>
            <CustomButton
              Loading={createOrderLoading}
              onPress={() => {
                if (methodId) {
                  if (addressId) {
                    dispatch(
                      createOrderAction(methodId, addressId, navigation),
                    );
                  } else {
                    showMessage({
                      message: 'إختر عنوان التوصيل ',
                      backgroundColor: '#FF6F61',
                    });
                  }
                } else {
                  showMessage({
                    message: 'إختر طريقة الدفع',
                    backgroundColor: '#FF6F61',
                  });
                }
              }}
              BtnTitle="سداد"
              borderRadius={Math.round(width / 2 + height / 2)}
              LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
