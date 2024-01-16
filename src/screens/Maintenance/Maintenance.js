import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {interpolate} from 'react-native-reanimated';
import Header from '../../components/Header/Header';
import {moderateScale} from '../../utils/moderateScale';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCompaniesAction} from '../../redux/Category/Actions';
import Loading from '../../components/Loading/Loading';
import SearchFilterIcon from '../../../assets/search_filter_icon';
import NestleLogo from '../../../assets/nestle_logo';
import LocationIcon from '../../../assets/location_icon';
import RateStar from '../../../assets/rate_star';
import CityIcon from '../../../assets/city_icon';

const {width, height} = Dimensions.get('window');

export default function Maintenance({navigation, route}) {
  const {categoryId} = route.params;

  const dispatch = useDispatch();

  const {allCompaniesLoading, allCompanies, allCompaniesFail} = useSelector(
    state => state.category,
  );

  useEffect(() => {
    dispatch(getAllCompaniesAction(categoryId));
  }, []);

  var fall = new Animated.Value(1);

  const bottomSheetRef = useRef();

  const renderShadow = () => {
    const animatedShadowOpacity = interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
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
    );
  };

  const RenderItem = ({data: {name, rating}}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MaintenanceDetails')}
      style={{
        width: '100%',
        height: height * 0.18,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row-reverse'}}>
        <View style={{alignItems: 'flex-start', width: '40%'}}>
          <NestleLogo />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            height: '75%',
          }}>
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              width: '97%',
            }}>
            <Text
              style={{
                textAlign: 'left',
                textAlignVertical: 'center',
                fontSize: moderateScale(16),
                color: '#000000',
              }}>
              {name}
            </Text>
            {rating ? (
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    paddingHorizontal: 8,
                    fontSize: moderateScale(15),
                    color: '#363636',
                  }}>{`(5) ${rate}`}</Text>
                <RateStar />
              </View>
            ) : null}
          </View>
          <View
            style={{
              width: '97%',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <LocationIcon />
            <Text
              style={{
                textAlign: 'left',
                textAlignVertical: 'center',
                paddingHorizontal: 8,
                fontSize: moderateScale(14),
                color: '#233B5D',
              }}>
              4
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <View style={{width: '100%', height: '25%', alignItems: 'center'}}>
        <Header
          height={height / 15}
          top={height / 15}
          showBackBtn={true}
          onBackButtonPressed={() => navigation.goBack()}
          headerTitle="قسم الصيانه"
        />
      </View>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
      {allCompaniesLoading ? (
        <Loading />
      ) : (
        <View style={{width: '90%', height: '65%'}}>
          <FlatList
            data={allCompanies.data}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    width: '100%',
                    fontSize: moderateScale(18),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  لا يوجد بيانات فى الوقت الحالى
                </Text>
              </View>
            )}
            renderItem={({item}) => <RenderItem data={item} />}
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
              <View
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
              </View>
              <View
                style={{
                  borderBottomColor: '#EEEEEE',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  width: '90%',
                }}
              />
              <View
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
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
