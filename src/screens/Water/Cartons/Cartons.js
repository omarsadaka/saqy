import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
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
import {
  getAllCategoriesAction,
  getAllProductProvidersAction,
} from '../../../redux/Category/Actions';
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
  const [selectedCat, setSelectedCat] = useState(1);
  const {allCategoriesLoading, allCategories, allCategoriesFail} = useSelector(
    state => state.category,
  );
  const {allProductCompaniesLoading, allProductCompanies} = useSelector(
    state => state.category,
  );

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllProductProvidersAction(1));
  }, [navigation]);

  console.log('allProductCompanies: ', allProductCompanies);

  const RenderItem2 = ({item}) => (
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
          <Text style={style.rate}>{item.provider.reviews}</Text>
          <RateStar />
        </View>
      </View>
    </TouchableOpacity>
  );
  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedCat(item.id);
        dispatch(getAllProductProvidersAction(item.id));
      }}
      style={{
        height: width * 0.07,
        margin: 5,
        paddingHorizontal: width * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.01,
        borderWidth: 1,
        borderColor: selectedCat == item.id ? 'red' : 'gray',
      }}>
      <Text
        style={{
          fontSize: moderateScale(15),
          color: '#000000',
          fontFamily: 'HacenMaghrebBd',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      {allCategoriesLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            width: '90%',
            height: height * 0.06,
            marginTop: height * 0.01,
          }}>
          <FlatList
            data={allCategories.data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              {flexGrow: 1},
              allCategories?.data ? null : {justifyContent: 'center'},
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
                  لا يوجد فئات فى الوقت الحالى
                </Text>
              </View>
            )}
            renderItem={RenderItem}
          />
        </View>
      )}
      {allProductCompaniesLoading ? (
        <Loading />
      ) : (
        <View style={{width: '90%', flex: 1, marginTop: height * 0.01}}>
          <FlatList
            data={allProductCompanies.data}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              {flexGrow: 1},
              allProductCompanies?.data ? null : {justifyContent: 'center'},
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
            renderItem={RenderItem2}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={allProductCompaniesLoading}
                onRefresh={() =>
                  dispatch(getAllProductProvidersAction(selectedCat))
                }
              />
            }
          />
        </View>
      )}
    </View>
  );
}
