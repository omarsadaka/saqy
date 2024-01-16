import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Header from '../../components/Header/Header';
import CustomTextInput2 from '../../components/CustomTextInput2/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {moderateScale} from '../../utils/moderateScale';
const {width, height} = Dimensions.get('window');
import {User} from '../../components/api/UserUtilities';
import Loading from '../../components/Loading/Loading';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  EditProfiledataAction,
  GetProfileDataAction,
} from '../../redux/Profile/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import ProfilePic from '../../../assets/profile_pic';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditProfile({navigation, route}) {
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [currentLat, setCurretLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [logo, setLogo] = useState(null);

  const {
    profileDataLoading,
    editProfileDataLoading,
    profileData,
    editProfileDataFail,
  } = useSelector(state => state.Profile);

  useEffect(() => {
    dispatch(GetProfileDataAction());
    getCurrentLocation();
    setData();
  }, []);

  console.log('profileData', profileData);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('setCurretLat', position.coords.latitude);
        console.log('setCurrentLon', position.coords.longitude);
        setCurretLat(position.coords.latitude);
        setCurrentLon(position.coords.longitude);
      },
      error => {
        // Alert.alert(error.message.toString());
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

  const setData = () => {
    setName(profileData?.data?.name);
    setMobile(profileData?.data?.mobile);
    setEmail(profileData?.data?.email);
    setAddress(profileData?.data?.address);
    setLogo(profileData?.data?.photo);
    setLat(profileData?.data?.lat);
    setLon(profileData?.data?.lng);
  };
  const createAlertImage = () => {
    Alert.alert('', 'إختر النوع', [
      {text: 'الكاميرا', onPress: () => uploadImgCamera()},
      {text: 'الاستوديو', onPress: () => uploadImgGallery()},
      {
        text: 'إلغاء',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  const uploadImgCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setLogo(image.path);
    });
  };

  const uploadImgGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setLogo(image.path);
    });
  };
  const renderUploadImg = () => {
    return (
      <View style={{}}>
        <TouchableOpacity
          style={styles.view_upload}
          onPress={() => {
            createAlertImage();
          }}>
          {logo ? (
            <Image
              source={{uri: logo}}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <ProfilePic />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        height={height / 8}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'تعديل البروفايل'}
      />
      {profileDataLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.view}>
            {renderUploadImg()}
            <Text style={styles.title}> إسم المستخدم*</Text>
            <CustomTextInput2
              onChangeText={value => setName(value)}
              addtionalContainerStyle={{width: '95%'}}
              value={name}
            />
            <Text style={styles.title}> البريد الإلكترونى*</Text>
            <CustomTextInput2
              onChangeText={value => setEmail(value)}
              addtionalContainerStyle={{width: '95%'}}
              value={email}
            />
            <Text style={styles.title}> رقم الجوال*</Text>
            <CustomTextInput2
              onChangeText={value => setMobile(value)}
              addtionalContainerStyle={{width: '95%'}}
              value={mobile}
            />
            <Text style={styles.title}> العنوان*</Text>
            <CustomTextInput2
              onChangeText={value => setAddress(value)}
              addtionalContainerStyle={{width: '95%'}}
              value={address}
            />

            <MapView
              zoomControlEnabled
              zoomEnabled
              zoomTapEnabled
              // minZoomLevel={2}  // default => 0
              // maxZoomLevel={15} // default => 20
              style={{
                width: '95%',
                height: height * 0.45,
                marginVertical: height * 0.03,
              }}
              onPress={e => {
                console.log('region change: ', e);
                setLat(e.latitude);
                setLon(e.longitude);
              }}
              onRegionChange={e => {
                console.log('region change: ', e);
                setLat(e.latitude);
                setLon(e.longitude);
              }}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: Number(lat)
                  ? Number(lat)
                  : Number(currentLat)
                  ? Number(currentLat)
                  : 23.633885564886913,
                longitude: Number(lon)
                  ? Number(lon)
                  : Number(currentLon)
                  ? Number(currentLon)
                  : 45.34767865297745,
                latitudeDelta: 0.1,
                longitudeDelta: 0.5,
              }}>
              <Marker
                coordinate={{
                  latitude: Number(lat)
                    ? Number(lat)
                    : Number(currentLat)
                    ? Number(currentLat)
                    : 23.633885564886913,
                  longitude: Number(lon)
                    ? Number(lon)
                    : Number(currentLon)
                    ? Number(currentLon)
                    : 45.34767865297745,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.5,
                }}
                tracksViewChanges={false}></Marker>
            </MapView>

            <CustomButton
              BtnTitle="تعديل"
              borderRadius={Math.round(width / 2 + height / 2)}
              LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
              Loading={editProfileDataLoading}
              onPress={() => {
                if (name && email && mobile && address) {
                  console.log('mobile:', mobile);
                  dispatch(
                    EditProfiledataAction(
                      name,
                      email,
                      mobile,
                      address,
                      lat ? lat : currentLat,
                      lon ? lon : currentLon,
                      logo,
                      navigation,
                    ),
                  );
                } else {
                  showMessage({
                    message: 'جميع البيانات مطلوبة',
                    backgroundColor: 'red',
                  });
                }
              }}
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
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.03,
    alignItems: 'center',
  },
  view_upload: {
    width: width * 0.25,
    height: width * 0.25,
    // borderRadius: width*0.25/2,
    padding: 8,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  logo: {
    width: width * 0.23,
    height: width * 0.23,
    // borderRadius: width*0.23 / 2,
  },
  title: {
    width: '95%',
    textAlign: 'right',
    marginTop: height * 0.025,
    marginBottom: height * 0.01,
    fontSize: moderateScale(16),
    fontFamily: 'HacenMaghrebBd',
  },
});
