import React, {useRef, useEffect, useState} from 'react';
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
import Loading from '../../../components/Loading/Loading';
import {moderateScale} from '../../../utils/moderateScale';
import SearchFilterIcon from '../../../../assets/search_filter_icon';
import NestleLogo from '../../../../assets/nestle_logo';
import LocationIcon from '../../../../assets/location_icon';
import RateStar from '../../../../assets/rate_star';
import CityIcon from '../../../../assets/city_icon';
import {getAllCompaniesAction} from '../../../redux/WaterProvidersBySubCat1/Actions';
import style from './CartonsStyle';

const {width, height} = Dimensions.get('window');

export default function Cartons({
  navigation,
  fall,
  bottomSheetRef,
  subCat,
  guest,
  title,
}) {
  const dispatch = useDispatch();

  const {companiesBySubCatLoading, companiesBySubCat} = useSelector(
    state => state.WaterProviderBySubCat1,
  );

  useEffect(() => {
    dispatch(getAllCompaniesAction(subCat));
  }, []);

  console.log('cartonsData: ', companiesBySubCat);
  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('WaterItemDetails', {
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
            <Text style={style.name}>{item.user.name}</Text>
            <View style={style.rateContainer}>
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
      {companiesBySubCatLoading ? (
        <Loading />
      ) : (
        <View style={{width: '90%', height: '85%'}}>
          <FlatList
            data={companiesBySubCat.data}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              {flexGrow: 1},
              companiesBySubCat?.data ? null : {justifyContent: 'center'},
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
                refreshing={companiesBySubCatLoading}
                onRefresh={() => dispatch(getAllCompaniesAction(subCat))}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
