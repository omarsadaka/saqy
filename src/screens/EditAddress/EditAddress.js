import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
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

export default function EditAddress({navigation, route}) {
  const {ID} = route.params;
  const [address, setAddress] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityID, setCityID] = useState(null);
  const [currentLat, setCurretLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading_btn, setLoading_btn] = useState(false);
  const [active, setActive] = useState(true);
  useEffect(() => {
    loadData();
    getCities();
    getCurrentLocation();
  }, []);

  const loadData = () => {
    setLoading(true);
    User.getAdressByID(ID)
      .then(res => {
        console.log('getAdressByID', JSON.stringify(res));
        setLoading(false);
        if (res.data) {
          setCityID(res.data.city.id);
          setAddress(res.data.address);
          setCurretLat(res.data.lat);
          setCurrentLon(res.data.lng);
          setActive(res.data.default == 1 ? true : false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err', JSON.stringify(err));
      });
  };

  const sendData = async () => {
    if (!address) {
      showMessage({message: 'أدخل العنوان.', backgroundColor: 'red'});
      return;
    }
    const values = {
      city_id: cityID,
      address: address,
      lat: currentLat,
      lng: currentLon,
      default: active ? 1 : 0,
    };
    setLoading_btn(true);
    User.updateAddress(values, ID)
      .then(res => {
        setLoading_btn(false);
        console.log('addAddress', JSON.stringify(res));
        if (res.status) {
          showMessage({
            message: 'تم تعديل العنوان بنجاح',
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
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        console.log('setCurretLat', position.coords.latitude);
        console.log('setCurrentLon', position.coords.longitude);
        setCurretLat(position.coords.latitude);
        setCurrentLon(position.coords.longitude);
      },
      error => {
        Alert.alert(error.message.toString());
        console.log('asd', error.message);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Header
        height={height / 8}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'تعديل العنوان'}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.view}>
            <Text style={styles.title}> إختر المدينة</Text>
            <CustomPicker
              // placeholder={cityID}
              additionalStyle={{
                height: Platform.OS === 'ios' ? '20%' : '17%',
                justifyContent: 'center',
                marginTop: -height * 0.05,
              }}
              PickerData={cities}
              onValueChange={value => setCityID(value)}
              selectedValue={cityID}
            />
            <Text style={styles.title}> أدخل العنوان</Text>
            <CustomTextInput2
              onChangeText={value => setAddress(value)}
              addtionalContainerStyle={{
                width: '95%',
                marginTop: height * 0.02,
              }}
              value={address}
            />

            <View style={styles.defaultView}>
              <Switch
                trackColor={{false: 'gray', true: 'green'}}
                thumbColor={active ? 'green' : 'gray'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={active}
              />
              <Text style={styles.default}> عنوان رئيسي</Text>
            </View>
            <View style={{width: width, height: '60%', alignItems: 'center'}}>
              <MapView
                zoomControlEnabled
                zoomEnabled
                zoomTapEnabled
                style={{
                  width: '95%',
                  height: '100%',
                  flex: 1,
                  marginVertical: height * 0.03,
                }}
                onRegionChange={e => {
                  console.log('region change: ', e);
                  setCurretLat(e.latitude);
                  setCurrentLon(e.longitude);
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: Number(currentLat)
                    ? Number(currentLat)
                    : 27.819490000000002,
                  longitude: Number(currentLon) ? Number(currentLon) : 34.59872,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {/* <Marker
                                coordinate={{
                                    latitude: Number(currentLat)? Number(currentLat) : 27.819490000000002,
                                    longitude: Number(currentLon)? Number(currentLon) : 34.59872,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }} tracksViewChanges={false}>
                            </Marker> */}
              </MapView>
              <Image
                source={require('../../../assets/pin.png')}
                style={styles.pin}
              />
            </View>
            <CustomButton
              BtnTitle="تعديل"
              borderRadius={Math.round(width / 2 + height / 2)}
              LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
              Loading={loading_btn}
              onPress={() => sendData()}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  view: {
    width: width,
    height: height,
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  title: {
    width: '95%',
    textAlign: 'right',
    fontSize: moderateScale(16),
    fontFamily: 'HacenMaghrebBd',
  },
  default: {
    flex: 1,
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
  pin: {
    width: height * 0.06,
    height: height * 0.06,
    position: 'absolute',
    top: height * 0.26,
  },
});
