import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {interpolate} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCompaniesAction} from '../../../redux/Category/Actions';
import {moderateScale} from '../../../utils/moderateScale';
import Loading from '../../../components/Loading/Loading';
import SearchFilterIcon from '../../../../assets/search_filter_icon';
import NestleLogo from '../../../../assets/nestle_logo';
import LocationIcon from '../../../../assets/location_icon';
import RateStar from '../../../../assets/rate_star';
import CityIcon from '../../../../assets/city_icon';
import style from './TankAllItemsStyle';

const {width, height} = Dimensions.get('window');

export default function TankAllItems({
  navigation,
  fall,
  bottomSheetRef,
  categoryId,
  title,
  guest,
}) {
  const dispatch = useDispatch();

  const {allCompaniesLoading, allCompanies, allCompaniesFail} = useSelector(
    state => state.category,
  );

  useEffect(() => {
    dispatch(getAllCompaniesAction(categoryId));
  }, [categoryId]);

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

  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TankDetails', {
          companyId: item.id,
          guest: guest,
          title: title,
        })
      }
      style={style.itemContainer}>
      <View style={style.viewContaier}>
        <View style={style.imageContainer}>
          {/* <NestleLogo /> */}
          <Image
            source={{uri: item.logo}}
            style={{width: '100%', height: height * 0.09}}
            resizeMode="contain"
          />
        </View>
        <View style={style.infoContainer}>
          <View style={style.infoContainer2}>
            <Text style={style.name} numberOfLines={2}>
              {item.user.name}
            </Text>
            <View style={style.rateContainer}>
              <Text style={style.rate}>{`(${item.total_provider_rates})`}</Text>
              <Text style={style.rate}>{item.reviews}</Text>
              <RateStar />
            </View>
          </View>
          <View style={style.locationContainer}>
            <LocationIcon />
            <Text style={style.location}>{`تبعد ${
              item.distance ? item.distance : '?'
            } كم`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '3%',
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
        <View style={{width: '90%', height: '85%'}}>
          <FlatList
            data={allCompanies.data}
            //data={[{ id: 1, name: 'شركة نسللى', distance: 'تبعد (10) كم', rate: 4.4 }, { id: 2, name: 'شركة نسللى', distance: 'تبعد (10) كم', rate: 4.4 }, { id: 3, name: 'شركة نسللى', distance: 'تبعد (10) كم', rate: 4.4 }]}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              {flexGrow: 1},
              allCompanies?.data ? null : {justifyContent: 'center'},
            ]}
            ListEmptyComponent={() => (
              <View
                style={{width: '100%', height: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: moderateScale(18),
                    color: '#000000',
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  لا يوجد بيانات فى الوقت الحالى
                </Text>
              </View>
            )}
            renderItem={RenderItem}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={allCompaniesLoading}
                onRefresh={() =>
                  dispatch(getAllCompaniesAction(categoryId, guest))
                }
              />
            }
          />
        </View>
      )}
    </View>
  );
}
