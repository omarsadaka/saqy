import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Header from '../../components/Header/Header';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomTextInput2 from '../../components/CustomTextInput2/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {moderateScale} from '../../utils/moderateScale';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');
import {User} from '../../components/api/UserUtilities';
import {use} from 'i18next';
import Loading from '../../components/Loading/Loading';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import {PERMISSIONS, request} from 'react-native-permissions';
import Animated, {interpolate, set} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {Icon} from 'react-native-elements';
import Geocoder from 'react-native-geocoder';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  IOS_GOOGLE_API_KEY,
  ANDROID_GOOGLE_API_KEY,
} from '../../utils/Constants';
import {baseURL} from '../../utils/BaseURL';
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
export default function AddAddress({navigation}) {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState({
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [cities, setCities] = useState([]);
  const [cityID, setCityID] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapIsMove, setMapIsMove] = useState(false);
  const [loading_btn, setLoading_btn] = useState(false);
  const [active, setActive] = useState(true);
  const [visible, setVisible] = useState(false);
  const [bottomSheet_height, setBottomSheet_height] = useState(height * 0.2);

  const [countryName, setCoutryName] = useState('');
  const [addressDetails, setAddressDetails] = useState('');

  const currentLat = position?.latitude;
  const currentLon = position?.longitude;

  var fall = new Animated.Value(1);
  const bottomSheetRef = useRef();
  useEffect(() => {
    // getCities();
    getCities2();
    _requestPermission();
    // getCurrentLocation();
    // bottomSheetRef.current.snapTo(1);
  }, []);

  const sendData = async () => {
    if (!cityID) {
      showMessage({message: 'إختر  المدينة.', backgroundColor: 'red'});
      return;
    }
    if (!(address || addressDetails)) {
      showMessage({message: 'أدخل تفاصيل العنوان.', backgroundColor: 'red'});
      return;
    }
    const values = {
      city_id: cityID,
      address: address ? address : addressDetails,
      lat: currentLat,
      lng: currentLon,
      default: active ? 1 : 0,
    };
    setLoading_btn(true);
    User.addAddress(values)
      .then(res => {
        setLoading_btn(false);
        if (res.status) {
          showMessage({
            message: 'تم إضافة العنوان بنجاح',
            backgroundColor: 'green',
          });
          setAddress('');
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading_btn(false);
        console.log('err', JSON.stringify(err));
      });
  };

  const getCities = () => {
    User.cities()
      .then(res => {
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              value: arr[index].id,
              label: arr[index].name,
            };
            data.push(obj);
          }
          setCities(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  const getCities2 = async () => {
    var axios = require('axios');
    var config = {
      method: 'get',
      url: 'https://saqiest.com/api/cities',
      headers: {
        Cookie: 'saqy_session=5vl1pf1qo1H4IFcutgRty1WhPUpUxXolJeQ5wjfy',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // try {
    //   const result = await axios({
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //     url: `https://saqiest.com/api/cities`,
    //     timeout: 20000,
    //   });
    //   console.log('getCities result: ', result.data);
    //   if (result.data) {
    //     const data = [];
    //     var arr = result.data.data;
    //     for (let index = 0; index < arr.length; index++) {
    //       const obj = {
    //         value: arr[index].id,
    //         label: arr[index].name,
    //       };
    //       data.push(obj);
    //     }
    //     setCities(data);
    //   }
    //   clearTimeout(timeout);
    //   let timeout = setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);
    // } catch (error) {
    //   console.log('getCities error: ', error.response.data);
    //   setLoading(false);
    // }
  };

  const _requestPermission = () => {
    let permission =
      Platform.OS === 'ios'
        ? getCurrentLocation()
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
    request(permission).then(result => {
      console.log('result permission', result);
      if (result === 'granted') {
        getCurrentLocation();
      } else {
        // setLoading(false);
        // _requestPermission();
      }
    });
  };

  const getCurrentLocation = () => {
    if (Platform === 'ios') {
      Geolocation.requestAuthorization();
    }
    if (isLocationLoading) {
      null;
    } else {
      Geolocation.getCurrentPosition(
        position => {
          // setCurretLat(position.coords.latitude);
          // setCurrentLon(position.coords.longitude);
          setPosition(pre => ({...pre, ...position.coords}));
          const obj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          reverseGeoLocation(obj);
        },
        error => {
          Alert.alert(error.message.toString());
          console.log('asd', error.message);
          // setLoading(false);
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );
    }
  };

  const reverseGeoLocation = location => {
    setIsLocationLoading(true);
    const GeocoderOptions = {
      apiKey:
        Platform.OS === 'ios' ? IOS_GOOGLE_API_KEY : ANDROID_GOOGLE_API_KEY,
      locale: 'ar',
      fallbackToGoogle: true,
      maxResults: 1,
    };
    Geocoder.geocodePosition(location, GeocoderOptions)
      .then(res => {
        // setLoading(false);
        setCoutryName(res[0].country);
        setAddressDetails(res[0].formattedAddress + ', ' + res[0].adminArea);
        setBottomSheet_height(height * 0.2);
        setVisible(false);
        bottomSheetRef.current.snapTo(1);
        setTimeout(() => {
          setIsLocationLoading(false);
        }, 500);
      })
      .catch(err => {
        // setLoading(false);
        console.log('error address from map', err);
        setTimeout(() => {
          setIsLocationLoading(false);
        }, 500);
      });
  };

  const handleChangeLoction = e => {
    console.log('e=====>', e);
    if (mapIsMove || isLocationLoading) {
      null;
    } else {
      setPosition(prev => ({
        ...prev,
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      }));
      const obj = {
        lat: e.latitude,
        lng: e.longitude,
      };
      reverseGeoLocation(obj);
      // bottomSheetRef.current.snapTo(1);
    }
  };

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  const renderShadow = () => {
    const animatedShadowOpacity = interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={'height'} enable={true}>
        <View style={styles.header}>
          <Header
            height={height / 8}
            hideBackgroundImage={true}
            showBackBtn={true}
            onBackButtonPressed={() => navigation.goBack()}
            headerTitle={'إضافة عنوان'}
          />
        </View>
        {!loading ? (
          <View style={styles.container}>
            {/* <Header
              height={height / 8}
              hideBackgroundImage={true}
              showBackBtn={true}
              onBackButtonPressed={() => navigation.goBack()}
              headerTitle={'إضافة عنوان'}
            /> */}
            {currentLat && currentLon ? (
              <View style={styles.view}>
                <Pressable
                  style={styles.myLocationIconWrapper}
                  disabled={isLocationLoading}
                  onPress={() => getCurrentLocation()}>
                  <Image
                    source={require('../../../assets/pin.png')}
                    style={styles.myLocationIcon}
                  />
                </Pressable>

                <MapView
                  zoomControlEnabled
                  zoomEnabled
                  zoomTapEnabled
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  style={{
                    width: '100%',
                    flex: 1,
                  }}
                  onRegionChangeComplete={e =>
                    isLocationLoading ? null : handleChangeLoction(e)
                  }
                  provider={PROVIDER_GOOGLE}
                  scrollEnabled={mapIsMove || isLocationLoading ? false : true}
                  region={{
                    latitude: currentLat,
                    longitude: currentLon,
                    latitudeDelta: position.latitudeDelta,
                    longitudeDelta: position.longitudeDelta,
                  }}>
                  {/* <Marker
                    coordinate={{
                      latitude: currentLat,
                      longitude: currentLon,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.5,
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    tracksViewChanges={true}></Marker> */}
                </MapView>
                <Image
                  source={require('../../../assets/pin.png')}
                  style={styles.pin}
                />
              </View>
            ) : null}
            {renderShadow()}
            <BottomSheet
              ref={bottomSheetRef}
              enabledGestureInteraction={true}
              enabledContentGestureInteraction={true}
              callbackNode={fall}
              snapPoints={[0, bottomSheet_height, 0]}
              initialSnap={0}
              renderContent={() => (
                <View>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#FFFFFF',
                      alignItems: 'center',
                      borderTopRightRadius: width * 0.05,
                      borderTopLeftRadius: width * 0.05,
                      paddingVertical: height * 0.01,
                      elevation: 5,
                      shadowOpacity: 0.3,
                    }}>
                    {loading ? (
                      <Loading />
                    ) : (
                      <View style={{width: '100%', alignItems: 'center'}}>
                        <View
                          style={{
                            width: width * 0.07,
                            height: 3,
                            backgroundColor: 'gray',
                          }}
                        />
                        <View style={{width: '100%', alignItems: 'center'}}>
                          <Text
                            style={{
                              width: '95%',
                              textAlign: 'right',
                              fontSize: moderateScale(15),
                              color: 'gray',
                              fontFamily: 'HacenMaghrebBd',
                            }}>
                            عنوان التوصيل:
                          </Text>
                          <Text
                            style={{
                              width: '95%',
                              textAlign: 'right',
                              fontSize: moderateScale(15),
                              color: '#000000',
                              fontFamily: 'HacenMaghrebBd',
                            }}>
                            {countryName}
                          </Text>
                          <Text
                            style={{
                              width: '95%',
                              textAlign: 'right',
                              fontSize: moderateScale(15),
                              color: 'gray',
                              fontFamily: 'HacenMaghrebBd',
                            }}>
                            {addressDetails}
                          </Text>
                          {visible ? (
                            <View
                              style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: height * 0.02,
                              }}>
                              <Text
                                style={{
                                  width: '95%',
                                  textAlign: 'right',
                                  fontSize: moderateScale(15),
                                  color: '#000000',
                                  fontFamily: 'HacenMaghrebBd',
                                }}>
                                إختر المدينة:
                              </Text>

                              <ModalDropdown
                                options={cities}
                                style={styles.spinner}
                                textStyle={styles.text_style}
                                defaultValue={'إختر المدينة'}
                                dropdownStyle={styles.dropdown_style}
                                dropdownTextStyle={styles.label_style}
                                dropdownTextHighlightStyle={styles.label_style}
                                adjustFrame={() => {
                                  return {
                                    width: width * 0.8,
                                    height: height * 0.3,
                                    backgroundColor: 'gray',
                                    position: 'absolute',
                                    right: width * 0.1,
                                    bottom: 0,
                                  };
                                }}
                                renderRow={(option, index, isSelected) => {
                                  return (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        // backgroundColor:
                                        //   Platform.OS == 'android' ? '#FFFFFF' : null,
                                      }}>
                                      <Text style={styles.spiner_label}>
                                        {option.label}
                                      </Text>
                                      {isSelected ? (
                                        <Icon
                                          style={{margin: 12}}
                                          name="check"
                                          size={24}
                                          color="#49A0E3"
                                        />
                                      ) : null}
                                    </View>
                                  );
                                }}
                                renderButtonText={rowData => rowData.label} // ba3d ma t5tar
                                onSelect={(index, value) =>
                                  setCityID(value.value)
                                }
                              />
                              <Text
                                style={{
                                  width: '95%',
                                  textAlign: 'right',
                                  fontSize: moderateScale(15),
                                  color: '#000000',
                                  fontFamily: 'HacenMaghrebBd',
                                }}>
                                تفاصيل العنوان:
                              </Text>
                              <Text
                                style={{
                                  width: '95%',
                                  textAlign: 'right',
                                  fontSize: moderateScale(15),
                                  color: 'gray',
                                  fontFamily: 'HacenMaghrebBd',
                                }}>
                                تفاصيل العنوان ستساعدنا فى التوصيل
                              </Text>
                              <CustomTextInput2
                                placeholder={
                                  'مثال: رقم البناية, رقم الفيلا, رقم الشقة'
                                }
                                onChangeText={value => setAddress(value)}
                                addtionalContainerStyle={{
                                  width: '95%',
                                  marginTop: height * 0.01,
                                }}
                              />
                            </View>
                          ) : null}
                          <View
                            style={{
                              width: '90%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: 8,
                              // marginTop: visible ? -height * 0.043 : null,
                            }}>
                            <CustomButton
                              onPress={() => {
                                if (visible) {
                                  sendData();
                                } else {
                                  setVisible(true);
                                  setBottomSheet_height(height * 0.45);
                                }
                              }}
                              borderRadius={5}
                              fontColor="#000000"
                              BtnTitle={
                                visible ? 'الحفظ والمتابعة' : 'تأكيد الموقع'
                              }
                              additionalStyle={{
                                width: '100%',
                                height: '80%',
                                backgroundColor: '#F2CB28',
                              }}
                              Loading={loading_btn}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <Loading />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    width: width,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  view: {
    width: width,
    height: '100%',
    alignItems: 'center',
  },
  title: {
    width: '95%',
    textAlign: 'right',
    fontSize: moderateScale(16),
    fontFamily: 'HacenMaghrebBd',
  },
  defaultView: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: height * 0.02,
  },
  label_style: {
    fontSize: moderateScale(18),
    fontFamily: 'HacenMaghrebLt',
    height: height * 0.07,
  },
  text_style: {
    width: '97%',
    height: height * 0.05,
    textAlignVertical: 'center',
    textAlign: 'right',
    fontFamily: 'HacenMaghrebLt',
    fontSize: moderateScale(15),
    color: '#000000',
  },
  dropdown_style: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingBottom: height * 0.01,
    overflow: 'hidden',
    borderRadius: width * 0.02,
  },
  spiner_label: {
    flex: 1,
    margin: height * 0.017,
    fontSize: 16,
    fontFamily: 'HacenMaghrebLt',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  spinner: {
    alignItems: 'center',
    width: '95%',
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: width * 0.02,
    borderColor: 'gray',
  },
  pin: {
    width: height * 0.06,
    height: height * 0.06,
    position: 'absolute',
    top: height * 0.35,
    alignSelf: 'center',
  },
  myLocationIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    shadowColor: '#233B5D',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1, width: 1},
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.72,
    right: 10,
    zIndex: 1,
  },
  myLocationIcon: {
    width: 15,
    height: 15,
  },
});
