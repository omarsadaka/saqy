/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
  BackHandler,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import Searchbar from '../../components/Searchbar/Searchbar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSwiper from '../../components/CustomSwiper/DefaultSwiper';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/responsiveDimensions';
import {
  SendFcmAction,
  CheckActiveUserAction,
} from '../../redux/Location/Actions';
import {
  getUnReadNotificationAction,
  getHomeSections,
  getHomeAds,
  getHomeUserAddresses,
} from '../../redux/Notification/Actions';
import AsyncStorage from '@react-native-community/async-storage';
// import WaterSection from '../../../assets/water_section';
// import TanksSection from '../../../assets/tanks_section';
// import SanitationSection from '../../../assets/sanitation_section';
// import MaintenanceSection from '../../../assets/maintenance_section';
import {showMessage} from 'react-native-flash-message';
import {User} from '../../components/api/UserUtilities';
import Loading from '../../components/Loading/Loading';
import messaging from '@react-native-firebase/messaging';
import ModalDropdown from 'react-native-modal-dropdown';
import {Icon} from 'react-native-elements';
import {moderateScale} from '../../utils/moderateScale';
import HeaderBackground from '../../../assets/header_background';
const {width, height} = Dimensions.get('window');
import style from './HomeStyle';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {interpolate} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Geocoder from 'react-native-geocoder';
import {useCurrentLocation} from '../../utils/useCurrentLocation';
import {baseURL} from '../../utils/BaseURL';
import axios from 'axios';

export default function Home({navigation, route}) {
  const dispatch = useDispatch();
  const {guest} = route.params;
  const {homeSectionLoading, homeSections, homeAds, homeUserAddresses} =
    useSelector(state => state.Notification);
  const [isloading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const [data, setData] = useState([]);
  const [ads, setAds] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [defaultAddressID, setDefaultAddressID] = useState('');
  const [bottomSheet_height, setBottomSheet_height] = useState(height * 0.4);
  const [addressDetails, setAddressDetails] = useState('');
  const {loading, error, location} = useCurrentLocation(guest, reFetch);
  const [token, setToken] = useState('');
  const reFetch = () => {
    requestLocationPermission({
      lat: location?.latitude,
      lng: location?.longitude,
    });
  };
  var fall = new Animated.Value(1);
  const bottomSheetRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // dispatch(getHomeSections());
      // dispatch(getHomeAds());
      loadData();
      loadAds();

      if (!guest) {
        getToken();
        SubscribeNotifications();
        sendToken();
        dispatch(getUnReadNotificationAction());
        dispatch(CheckActiveUserAction(navigation));
        // getAllAddress();
        getAllAddress2();
      }
      if (!loading && location?.latitude) {
        requestLocationPermission({
          lat: location?.latitude,
          lng: location?.longitude,
        });
      }
    });
    // exitApp();
    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('user_token');
    setToken(token);
  };
  useEffect(() => {
    // dispatch(getHomeUserAddresses());

    if (!loading && location?.latitude) {
      requestLocationPermission({
        lat: location?.latitude,
        lng: location?.longitude,
      });
    }
    if (addresses.length > 0) {
      setBottomSheet_height(height * 0.5);
    }
  }, [loading, location]);

  useEffect(() => {
    bottomSheetRef.current.snapTo(0);
  }, []);

  const exitApp = () => {
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        BackHandler.exitApp(),
      );
    };
  };

  const requestLocationPermission = ({lat, lng}) => {
    if (!lat && !lng) {
      null;
    } else {
      const obj = {
        lat,
        lng,
      };
      reverseGeoLocation(obj);
    }
  };

  const sendToken = async () => {
    await AsyncStorage.getItem('fcmToken').then(fcmToken => {
      if (fcmToken !== null) {
        console.log('fcmToken home', fcmToken);
        dispatch(SendFcmAction(fcmToken));
      }
    });
  };
  const loadData = () => {
    setIsLoading(true);
    User.sections()
      .then(res => {
        console.log('sections', JSON.stringify(res));
        if (res?.data) {
          const _data = [];
          let arr = res?.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              name: arr[index].name,
              photo: arr[index].photo,
              active: arr[index].active,
            };
            _data.push(obj);
          }
          setData(_data);

          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err', err);
      });
  };
  const loadAds = () => {
    User.getAds()
      .then(res => {
        // console.log('getAds', JSON.stringify(res))
        if (res?.data) {
          let arr = res?.data;
          setAds(arr);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const StatusNavigation = status => {
    switch (status) {
      case '6':
        return 'FinishedOrderDetails';
      case '4':
        return 'InProgressOrderDetails';
      case '5':
        return 'InProgressOrderDetails';
      case '2':
        return 'InProgressOrderDetails';
      case '1':
        return 'NewOrderDetails';
      case '7':
        return 'CancelOrderDetails';
      case '3':
        return 'InProgressOrderDetails';
    }
  };
  const SubscribeNotifications = async () => {
    try {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('messageListenerHome:', remoteMessage.data);
        const {id, type, status_id, sub_section} = remoteMessage.data;
        if (id) {
          if (type == 'order' || type == 'service') {
            navigation.navigate(StatusNavigation(status_id), {
              OrderID: id,
              Type: type == 'order' ? 'Order' : 'Service',
            });
          } else if (type == 'offer') {
            navigation.navigate('Offers', {
              Type: sub_section,
            });
          }
        }
      });
    } catch (e) {}
  };
  const getAllAddress = () => {
    User.getAllAdress()
      .then(res => {
        console.log('getAllAddress', JSON.stringify(res));
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              name: arr[index].address,
            };
            data.push(obj);
          }
          setAddresses(data);
          getDefaultAddress();
          if (data.length > 0) {
            setBottomSheet_height(height * 0.5);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllAddress2 = async () => {
    try {
      const result = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        url: `http://saqiest.com/api/shipping_address`,
        timeout: 20000,
      });
      console.log('getAllAddress2 result: ', result.data);
      if (result.data) {
        const data = [];
        var arr = result.data.data;
        for (let index = 0; index < arr.length; index++) {
          const obj = {
            id: arr[index].id,
            name: arr[index].address,
          };
          data.push(obj);
        }
        setAddresses(data);
        getDefaultAddress();
        if (data.length > 0) {
          setBottomSheet_height(height * 0.5);
        }
      }
    } catch (error) {
      console.log('getAllAddress2 error: ', error.response.data);
    }
  };

  const getDefaultAddress = address => {
    setIsLocationLoading(true);
    User.getDefaultAdress()
      .then(res => {
        // console.log('getDefaultAdress', JSON.stringify(res));
        if (res.status) {
          setDefaultAddress(res.data.address);

          setDefaultAddressID(res.data.id);
          setIsLocationLoading(false);
        } else {
          setDefaultAddress(address);
          setIsLocationLoading(false);
        }
      })
      .catch(err => {
        setIsLocationLoading(false);

        console.log(err);
      });
  };

  const setDefault = async id => {
    User.updateToDefault(id)
      .then(res => {
        // console.log('addAddress', JSON.stringify(res));
        if (res.status) {
          showMessage({message: res.data, backgroundColor: 'green'});
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err));
      });
  };

  const reverseGeoLocation = location => {
    Geocoder.geocodePosition(location)
      .then(res => {
        // console.log('address from map', res);
        console.log(
          'address details',
          res[0].formattedAddress + ', ' + res[0].adminArea,
        );
        setAddressDetails(res[0].formattedAddress + ', ' + res[0].adminArea);
        getDefaultAddress(res[0].formattedAddress + ', ' + res[0].adminArea);
      })
      .catch(err => console.log('error address from map', err));
  };

  const renderShadow = () => {
    const animatedShadowOpacity = interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });
  };

  console.log(';home section', homeSections);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4B5582',
      }}>
      <Header height={height / 12} headerTitle={' '} />
      {!guest ? (
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            flexDirection: 'row',
            marginTop: -height * 0.05,
          }}>
          <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              disabled={isLocationLoading}
              style={[
                style.spinner,
                {flexDirection: 'row', marginBottom: height * 0.01},
              ]}
              onPress={() => {
                if (!loading) {
                  bottomSheetRef.current.snapTo(1);
                }
              }}>
              <Icon
                name="chevron-down"
                type="feather"
                size={15}
                color={'#000000'}
              />
              {isLocationLoading ? (
                <ActivityIndicator
                  color={'#4B5582'}
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#000000',
                    fontSize: moderateScale(14),
                    fontFamily: 'HacenMaghrebLt',
                  }}
                  numberOfLines={1}>
                  {defaultAddress}
                </Text>
              )}
            </TouchableOpacity>
            <Text
              style={{
                height: height * 0.04,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: '#FFFFFF',
                fontSize: moderateScale(16),
                fontFamily: 'HacenMaghrebLt',
              }}>
              التوصيل ل
            </Text>
          </View>
          <Image
            source={require('../../../assets/logo.png')}
            style={{
              flex: 0.7,
              height: height * 0.1,
              marginBottom: height * 0.01,
            }}
            resizeMode="contain"
          />
        </View>
      ) : null}
      {/* </ImageBackground> */}
      {isloading ? (
        <Loading />
      ) : (
        <View style={{alignItems: 'center'}}>
          <ScrollView
            style={{width: '100%', height: '100%'}}
            contentContainerStyle={{alignItems: 'center', width: '100%'}}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={false}
                onRefresh={() => {
                  if (!guest) {
                    SubscribeNotifications();
                    sendToken();
                    dispatch(getUnReadNotificationAction());
                    dispatch(CheckActiveUserAction(navigation));
                    // dispatch(getHomeUserAddresses());
                    // getAllAddress();
                    getAllAddress2();
                  }
                  requestLocationPermission({
                    lat: location?.latitude,
                    lng: location?.longitude,
                  });
                  dispatch(getHomeSections());
                  dispatch(getHomeAds());
                }}
              />
            }>
            <CustomSwiper images={homeAds} />
            {data?.length > 0 && (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/WaterSection.png')}
                  style={{
                    width: responsiveWidth(110),
                    height: height * 0.33,
                    marginTop: -height * 0.13,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignSelf: 'center',
                    position: 'absolute',
                    width: '70%',
                    height: '100%',
                    right: 0,
                    zIndex: 1,
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <CustomButton
                    onPress={() =>
                      navigation.navigate('Water', {
                        categoryId: data[0]?.id ? data[0]?.id : 1,
                        guest: guest,
                        title: data[0]?.name ? data[0]?.name : 'مياة',
                      })
                    }
                    borderRadius={6}
                    fontColor="#EDC496"
                    BtnTitle={data[0]?.name ? data[0]?.name : 'مياة'}
                    additionalStyle={{
                      width: '65%',
                      height: height * 0.07,
                      backgroundColor: 'transparent',
                      borderColor: '#EDC496',
                      borderWidth: 1,
                      zIndex: 5,
                    }}
                  />
                </View>
              </View>
            )}
            {data?.length > 0 && (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/Tanks_Section.png')}
                  style={{
                    width: responsiveWidth(110),
                    height: height * 0.33,
                    marginTop: -height * 0.13,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '70%',
                    right: 0,
                    zIndex: 1,
                  }}>
                  <CustomButton
                    onPress={() =>
                      navigation.navigate('Tanks', {
                        categoryId: data[1]?.id ? data[1]?.id : 2,
                        guest: guest,
                        title: data[1]?.name ? data[1]?.name : 'خزانات',
                      })
                    }
                    borderRadius={6}
                    fontColor="#0EDBFC"
                    BtnTitle={data[1]?.name ? data[1]?.name : 'خزانات'}
                    additionalStyle={{
                      width: '65%',
                      height: height * 0.07,

                      backgroundColor: 'transparent',
                      borderColor: '#0EDBFC',
                      borderWidth: 1,
                      zIndex: 5,
                    }}
                  />
                </View>
              </View>
            )}
          </ScrollView>

          {renderShadow()}
          <BottomSheet
            ref={bottomSheetRef}
            enabledGestureInteraction={true}
            enabledContentGestureInteraction={false}
            enabledInnerScrolling={true}
            callbackNode={fall}
            snapPoints={[0, bottomSheet_height, 0]}
            renderContent={() => (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopRightRadius: height * 0.03,
                  borderTopLeftRadius: height * 0.03,
                  paddingVertical: height * 0.02,
                  backgroundColor: '#FFFFFF',
                  zIndex: 2,
                }}>
                <View
                  style={{
                    flex: 1,

                    // alignItems: 'center',
                    // borderTopRightRadius: height * 0.03,
                    // borderTopLeftRadius: height * 0.03,
                    // paddingVertical: height * 0.02,
                  }}>
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: width * 0.07,
                        height: 3,
                        backgroundColor: 'gray',
                      }}
                    />
                    <View style={styles.rowViewStyle}>
                      <Text
                        onPress={() => bottomSheetRef.current.snapTo(0)}
                        style={styles.closeBottomSheetText}>
                        اغلاق
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: moderateScale(17),
                          color: '#000000',
                          // fontFamily: 'HacenMaghrebBd',
                        }}>
                        التوصيل لى
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: '90%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'gray',
                        flexDirection: 'row',
                        paddingVertical: height * 0.013,
                        marginTop: height * 0.01,
                      }}
                      onPress={() => navigation.navigate('AddAddress')}>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: moderateScale(14),
                          color: '#000000',
                          // fontFamily: 'HacenMaghrebBd',
                          marginHorizontal: width * 0.015,
                        }}>
                        أضف موقع جديد
                      </Text>
                      <Icon
                        name="plus-circle"
                        type="feather"
                        size={15}
                        color={'#000000'}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={addresses}
                    contentContainerStyle={{
                      paddingBottom: '30%',
                    }}
                    keyExtractor={item => `${item?.id}`}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: 35,
                            paddingHorizontal: '10%',
                          }}
                          onPress={() => {
                            setDefaultAddress(item.name);
                            setDefaultAddressID(item.id);
                            setDefault(item.id);
                          }}>
                          <Text
                            style={{
                              textAlign: 'right',
                              fontSize: moderateScale(14),
                              color: '#000000',
                              // fontFamily: 'HacenMaghrebBd',
                              marginHorizontal: width * 0.015,
                            }}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}>
                            {defaultAddressID === item.id ? (
                              <Icon
                                name="check-circle"
                                type="feather"
                                size={15}
                                color={'green'}
                              />
                            ) : null}
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  closeBottomSheetText: {
    fontSize: 15,
    color: 'red',
    fontWeight: '500',
    fontFamily: 'HacenMaghrebBd',
  },
  rowViewStyle: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
});
