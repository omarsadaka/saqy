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
import style from './AllItemsStyle';
import {User} from '../../../components/api/UserUtilities';
const {width, height} = Dimensions.get('window');

export default function AllItems({
  navigation,
  fall,
  bottomSheetRef,
  categoryId,
  guest,
  title,
}) {
  const dispatch = useDispatch();

  const {allCompaniesLoading, allCompanies} = useSelector(
    state => state.category,
  );

  useEffect(() => {
    dispatch(getAllCompaniesAction(categoryId));
  }, [categoryId, dispatch]);

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
            keyExtractor={item => item.id}
            renderItem={RenderItem}
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
                    width: '100%',
                    color: '#000000',
                    fontSize: moderateScale(18),
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  لا يوجد بيانات فى الوقت الحالى
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={allCompaniesLoading}
                onRefresh={() => dispatch(getAllCompaniesAction(categoryId))}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
