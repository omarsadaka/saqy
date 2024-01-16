import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {interpolate} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomButton from '../../components/CustomButton/CustomButton';
import AllItems from './AllItems/AllItems';
import Cartons from './Cartons/Cartons';
import Cartons2 from './Cartons2/Cartons';
import Desalination from './Desalination/Desalination';
import LocationIcon from '../../../assets/location_icon';
import CityIcon from '../../../assets/city_icon';
import {getCitiesAction} from '../../redux/Region/Actions';
import {getAllCompaniesAction} from '../../redux/Category/Actions';
import {getAllFilterCompaniesByCityAction1} from '../../redux/WaterProvidersBySubCat1/Actions';
import {getAllFilterCompaniesByCityAction2} from '../../redux/WaterProvidersBySubCat2/Actions';
import {getAllCompaniesAction as NearestProviders1} from '../../redux/WaterProvidersBySubCat1/Actions';
import {getAllCompaniesAction as NearestProviders2} from '../../redux/WaterProvidersBySubCat2/Actions';
import {getAllFilterCompaniesByCityAction} from '../../redux/Category/Actions';
import {User} from '../../components/api/UserUtilities';
import {CheckActiveUserAction} from '../../redux/Location/Actions';
import axios from 'axios';
import {baseURL} from '../../utils/BaseURL';
const {width, height} = Dimensions.get('window');

function Water({navigation, route}) {
  const {categoryId, guest, title} = route.params;
  console.log({
    categoryId,
    guest,
    title,
  });
  const dispatch = useDispatch();

  const [index, setIndex] = useState(2);
  const [isLoadingSubCategory, setIsLoadingSubCategory] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(0);
  var fall = new Animated.Value(1);
  const bottomSheetRef = useRef();
  const Routes = [
    {id: 2, title: 'تحلية مياه', key: 'تحلية مياه'},
    {id: 1, title: 'كراتين مياه', key: 'كراتين مياه'},
    {id: 0, key: 'AllItems', title: 'الكل'},
  ];
  console.log('routes=====>', routes);
  useEffect(() => {
    // loadSubSection();
    loadSubSection2();
    dispatch(getCitiesAction());
    if (!guest) dispatch(CheckActiveUserAction(navigation));
  }, []);

  console.log('route indexxxx: ', index);

  const {cities} = useSelector(state => state.region);

  const loadSubSection = () => {
    setIsLoadingSubCategory(true);
    User.subSections(categoryId)
      .then(res => {
        console.log('subSections', JSON.stringify(res));
        if (res.data) {
          const _routes = [{id: 0, key: 'AllItems', title: 'الكل'}];
          let arr = res?.data;

          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              title: arr[index].name,
              key: arr[index].name,
            };
            if (!_routes.includes(obj)) {
              _routes.unshift(obj);
            }
          }

          setRoutes(_routes);

          setIsLoadingSubCategory(false);
          console.log('routes', _routes);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoadingSubCategory(false);
      });
  };

  const loadSubSection2 = async () => {
    setIsLoadingSubCategory(true);
    try {
      const result = await axios({
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   Accept: 'application/json',
        // },
        headers: {
          Accept: 'application/json',
        },
        url: `https://saqiest.com/api/sub_section/${categoryId}`,
        timeout: 20000,
      });
      console.log('loadSubSection2 result: ', result.data);
      if (result.data) {
        const _routes = [{id: 0, key: 'AllItems', title: 'الكل'}];
        let arr = result.data.data;
        for (let index = 0; index < arr.length; index++) {
          const obj = {
            id: arr[index].id,
            title: arr[index].name,
            key: arr[index].name,
          };
          // if (!_routes.includes(obj)) {
          _routes.unshift(obj);
          // }
        }
        if (_routes.length > 1) setRoutes(_routes);
        else setRoutes(Routes);
      }
      setIsLoadingSubCategory(false);
    } catch (error) {
      console.log('loadSubSection2 error: ', error.response.data);
      setIsLoadingSubCategory(false);
    }
  };

  const renderShadow = () => {
    const animatedShadowOpacity = interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
      // <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#233B5D',
            opacity: animatedShadowOpacity,
          },
        ]}
      />
      // </View>
    );
  };

  const renderScene = ({route}) => {
    switch (route.id) {
      case 0:
        return (
          <AllItems
            navigation={navigation}
            fall={fall}
            bottomSheetRef={bottomSheetRef}
            categoryId={categoryId}
            guest={guest}
            title={title}
          />
        );
      case 1:
        return (
          <Cartons
            navigation={navigation}
            fall={fall}
            bottomSheetRef={bottomSheetRef}
            subCat={route.id}
            guest={guest}
            title={title}
          />
        );
      case 2:
        return (
          <Desalination
            navigation={navigation}
            fall={fall}
            bottomSheetRef={bottomSheetRef}
            subCat={route.id}
            guest={guest}
            title={title}
          />
        );
      default:
        return null;
    }
  };

  const onFilterByNearest = () => {
    if (index == 0) {
      dispatch(NearestProviders2(routes[0].id));
      bottomSheetRef.current.snapTo(0);
      return;
    }
    if (index == 1) {
      dispatch(NearestProviders1(routes[1].id));
      bottomSheetRef.current.snapTo(0);
      return;
    }
    if (index == 2) {
      dispatch(getAllCompaniesAction(categoryId));
      bottomSheetRef.current.snapTo(0);
      return;
    }
  };

  const onFilterPressed = () => {
    if (!selectedCity) {
      showMessage({message: 'يجب اختيار المدينة', backgroundColor: '#FF6F61'});
      return;
    }
    if (index == 0) {
      dispatch(getAllFilterCompaniesByCityAction2(selectedCity, routes[0].id));
      setFilterModal(false);
      return;
    }
    if (index == 1) {
      dispatch(
        getAllFilterCompaniesByCityAction1(
          selectedCity,
          categoryId,
          routes[1].id,
        ),
      );
      setFilterModal(false);
      return;
    }
    if (index == 2) {
      dispatch(getAllFilterCompaniesByCityAction(selectedCity, categoryId, ''));
      setFilterModal(false);
      return;
    }
  };

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 4.5}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.pop()}
        headerTitle={title}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: '77%',
          flexDirection: 'row',
        }}>
        {isLoadingSubCategory && routes.length < 1 ? (
          <View style={styles.ViewTapBarLoading}>
            <ActivityIndicator color={'#42B5D0'} />
          </View>
        ) : (
          <TabView
            navigationState={{index, routes}}
            swipeEnabled={false}
            renderTabBar={props => {
              return (
                <TabBar
                  {...props}
                  renderLabel={({focused, route}) => {
                    console.log('Data Of Tab Bar====', route);
                    return (
                      <Text
                        style={{
                          color: focused ? '#FFFFFF' : '#233B5D',
                          fontWeight: '500',
                          fontSize: moderateScale(17),
                          fontFamily: 'HacenMaghrebBd',
                        }}>
                        {route.title}
                      </Text>
                    );
                  }}
                  indicatorStyle={{backgroundColor: '#42B5D0', height: '100%'}}
                  style={{
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                    width: '90%',
                    elevation: 0,
                    borderRadius: 5,
                  }}
                />
              );
            }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            initialLayout={{width: width}}
          />
        )}
      </View>
      {renderShadow()}
      <BottomSheet
        ref={bottomSheetRef}
        enabledGestureInteraction={true}
        enabledContentGestureInteraction={true}
        callbackNode={fall}
        snapPoints={[0, '35%', 0]}
        renderContent={() => (
          <View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                height: height / 2.8,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: moderateScale(17),
                    color: '#000000',
                    margin: 8,
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  فلتر
                </Text>
                <View
                  style={{
                    borderBottomColor: '#EEEEEE',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    width: '90%',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => onFilterByNearest()}
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: '#363636',
                    paddingHorizontal: 8,
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  بالأقرب
                </Text>
                <LocationIcon />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  width: '90%',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current.snapTo(0);
                  setFilterModal(true);
                }}
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: '#363636',
                    paddingHorizontal: 8,
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  بالمدينة
                </Text>
                <CityIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        style={{flex: 1}}
        isVisible={filterModal}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View
          style={{
            height: height / 2,
            width: '100%',
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {/* <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomPicker
                                additionalStyle={{ width: '100%', height: '60%', justifyContent: 'center' }}
                                additionalPickerStyle={{ width: '100%' }}
                                PickerData={[{ label: 'المنطقة', value: -1 }].concat(regions.map(item => ({ label: item.name, value: item.id })))}
                                placeholder="المنطقة"
                                onValueChange={(value, index) => {
                                    console.log("region value: ", value)
                                    dispatch(getCitiesAction(value))
                                    setSelectedRegion(value)
                                }}
                                selectedValue={selectedRegion} />
                        </View> */}
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomPicker
                additionalStyle={{
                  width: '100%',
                  height: '60%',
                  justifyContent: 'center',
                }}
                additionalPickerStyle={{width: '100%'}}
                PickerData={[{label: 'المدينة', value: -1}].concat(
                  cities.map(item => ({label: item.name, value: item.id})),
                )}
                placeholder="المدينة"
                onValueChange={(value, index) => {
                  console.log('indexxxx: ', index);
                  setSelectedCity(value);
                }}
                selectedValue={selectedCity}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 8,
              }}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 8,
                }}>
                <CustomButton
                  onPress={() => onFilterPressed()}
                  borderRadius={5}
                  fontColor="#FFFFFF"
                  BtnTitle="تطبيق"
                  additionalStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#5ABD8C',
                  }}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 8,
                }}>
                <CustomButton
                  onPress={() => setFilterModal(false)}
                  borderRadius={5}
                  fontColor="#000000"
                  BtnTitle="الغاء"
                  additionalStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Water;
const styles = StyleSheet.create({
  ViewTapBarLoading: {
    width: '90%',
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,

    position: 'absolute',
    top: 0,
    left: width * 0.05,
  },
});
