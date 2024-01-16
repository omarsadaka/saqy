import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import {moderateScale} from '../../utils/moderateScale';
import {getAllProductProvidersAction} from '../../redux/Category/Actions';
import LocationIcon from '../../../assets/location_icon';
import RateStar from '../../../assets/rate_star';
import SearchFilterIcon from '../../../assets/search_filter_icon';
import style from './CartonsProvidersStyle';
const {width, height} = Dimensions.get('window');
import BottomSheet from 'reanimated-bottom-sheet';
import CityIcon from '../../../assets/city_icon';
import Animated, {interpolate} from 'react-native-reanimated';
import Modal from 'react-native-modal';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import {getCitiesAction} from '../../redux/Region/Actions';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function CartonsProviders({navigation, route}) {
  const {categoryId, guest, title, category} = route.params;
  const dispatch = useDispatch();
  const [filterModal, setFilterModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(0);
  const {allProductCompaniesLoading, allProductCompanies} = useSelector(
    state => state.category,
  );
  const bottomSheetRef = useRef();
  var fall = new Animated.Value(1);
  useEffect(() => {
    dispatch(getAllProductProvidersAction(categoryId));
    dispatch(getCitiesAction());
  }, []);

  const {cities} = useSelector(state => state.region);
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
  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('WaterItemDetails', {
          companyId: item.provider.id,
          title: title,
        })
      }
      style={style.itemContainer}>
      <View style={style.viewContaier}>
        <View style={style.imageContainer}>
          {/* <NestleLogo /> */}
          <Image
            source={{uri: item.provider.logo}}
            style={{width: '100%', height: height * 0.09}}
            resizeMode="contain"
          />
        </View>
        <View style={style.infoContainer}>
          <View style={style.infoContainer2}>
            <Text style={style.name}>{item.provider.user.name}</Text>
            <View style={style.rateContainer}>
              <Text style={style.rate}>{item.provider.reviews}</Text>
              <RateStar />
            </View>
          </View>
          <View style={style.locationContainer}>
            <LocationIcon />
            <Text style={style.location}>{`تبعد ${
              item.provider.distance ? item.provider.distance : '?'
            } كم`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 4.5}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.pop()}
        headerTitle={category}
      />
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10%',
        }}>
        <TouchableOpacity onPress={() => bottomSheetRef.current.snapTo(1)}>
          <SearchFilterIcon />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: moderateScale(16),
            color: '#233B5D',
            fontFamily: 'HacenMaghrebBd',
          }}>
          تصفية نتائج البحث
        </Text>
      </View>
      {allProductCompaniesLoading ? (
        <Loading />
      ) : (
        <View style={{width: '100%', height: '80%', alignItems: 'center'}}>
          <FlatList
            data={allProductCompanies.data}
            keyExtractor={item => item.id}
            renderItem={RenderItem}
            contentContainerStyle={[
              {flexGrow: 1},
              allProductCompanies ? null : {justifyContent: 'center'},
            ]}
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
                  }}>
                  لا توجد فئات فى الوقت الحالى
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={allProductCompaniesLoading}
                onRefresh={() =>
                  dispatch(getAllProductProvidersAction(categoryId))
                }
              />
            }
          />
        </View>
      )}
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
                onPress={() => {
                  bottomSheetRef.current.snapTo(0);
                  dispatch(getAllProductProvidersAction(categoryId));
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
