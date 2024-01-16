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
import Loading from '../../../components/Loading/Loading';
import {moderateScale} from '../../../utils/moderateScale';
import SearchFilterIcon from '../../../../assets/search_filter_icon';
import NestleLogo from '../../../../assets/nestle_logo';
import LocationIcon from '../../../../assets/location_icon';
import RateStar from '../../../../assets/rate_star';
import CityIcon from '../../../../assets/city_icon';
import {getAllCompaniesAction} from '../../../redux/WaterProvidersBySubCat2/Actions';
import style from './DesalinationStyle';

const {width, height} = Dimensions.get('window');

export default function Desalination({
  navigation,
  fall,
  bottomSheetRef,
  subCat,
  guest,
  title,
}) {
  const dispatch = useDispatch();

  const {companiesBySubCatLoading2, companiesBySubCat2} = useSelector(
    state => state.WaterProviderBySubCat2,
  );

  useEffect(() => {
    dispatch(getAllCompaniesAction(subCat));
  }, []);

  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DesalinationDetails', {
          companyId: item.provider.id,
          title: title,
          guest: guest,
          serviceID: item.id,
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
          <Text style={style.name} numberOfLines={2}>
            {item.provider.user.name}
          </Text>
          <Text
            style={{
              textAlign: 'right',
              marginHorizontal: width * 0.02,
              color: '#42B5D0',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {item.capacity.name}{' '}
            {item.capacity.unit ? item.capacity.unit.name : ''}
          </Text>
          <View style={style.locationContainer}>
            <LocationIcon />
            <Text style={style.location}>{`تبعد ${
              item.provider.distance ? item.provider.distance : '?'
            } كم`}</Text>
          </View>
        </View>
        <View style={style.rateContainer}>
          <Text
            style={
              style.rate
            }>{`(${item.provider.total_provider_rates})`}</Text>
          <Text style={style.rate}>
            {item.provider.reviews ? item.provider.reviews : '0'}
          </Text>
          <RateStar />
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
      {companiesBySubCatLoading2 ? (
        <Loading />
      ) : (
        <View style={{width: '90%', height: '85%'}}>
          <FlatList
            data={companiesBySubCat2.data}
            keyExtractor={item => item.id}
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
                refreshing={companiesBySubCatLoading2}
                onRefresh={() => dispatch(getAllCompaniesAction(subCat))}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
