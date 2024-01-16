import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';
import {showMessage} from 'react-native-flash-message';
import {moderateScale} from '../../../utils/moderateScale';
import Loading from '../../../components/Loading/Loading';
import CustomButton from '../../../components/CustomButton/CustomButton';
import RateStarSmall from '../../../../assets/rate_star_small';
import ShareIconSmall from '../../../../assets/share_icon_small';
import LoveIconSmall from '../../../../assets/love_icon_small';
import LikedIconSmall from '../../../../assets/liked_icon_small';
import {getCompanyProductsAction} from '../../../redux/CompanyDetails/Actions';
import {addToCartAction, getCartDataAction} from '../../../redux/Cart/Actions';
import {addItemToFavoritesAction} from '../../../redux/Favorites/Actions';

const {width, height} = Dimensions.get('window');

export default function Products({companyId, guest}) {
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState({});

  const {companyProductsLoading, companyProducts, companyProductsFail} =
    useSelector(state => state.companyInfo);
  const {addToCartLoading} = useSelector(state => state.cart);
  const {
    addToFavoriteLoading,
    addedToFavroites,
    addedToFavroitesFail,
    itemLiked,
  } = useSelector(state => state.favroites);

  useEffect(() => {
    dispatch(getCompanyProductsAction(companyId));
    guest ? null : dispatch(getCartDataAction());
  }, []);

  const onSharePressed = async productName => {
    const shareOptions = {
      message: `Check this product on Saqi app: ${productName} 
            Download the app now:
            App Store: www.google.com
            Google Play: www.google.com`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('share error: ', error);
    }
  };

  const RenderItem = ({data: {name, price, size, offer_price, id, photo}}) => (
    <View
      style={{
        width: width / 2.25,
        margin: 5,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
      }}>
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row-reverse',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'left',
              textAlignVertical: 'center',
              paddingHorizontal: 8,
              fontSize: moderateScale(13),
              color: '#363636',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {Math.floor(3)}
          </Text>
          <RateStarSmall />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => onSharePressed(name)}>
            <ShareIconSmall />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => guest ? showMessage({ message: 'ليس لديك الصلاحية كزائر', backgroundColor: '#FF6F61' }) : dispatch(addItemToFavoritesAction(id))}>
                        {Object.keys(itemLiked).length && itemLiked[`${id}`] ? <LikedIconSmall /> : <LoveIconSmall />}
                    </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: photo}}
          style={{width: width * 0.3, height: height * 0.13}}
        />
      </View>
      <View
        style={{
          width: '100%',
          margin: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: '#363636',
            fontFamily: 'HacenMaghrebBd',
          }}
          numberOfLines={2}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: '#363636',
            fontFamily: 'HacenMaghrebBd',
          }}>
          {'الحجم'}{' '}
          <Text
            style={{
              fontSize: moderateScale(12),
              color: '#363636',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {size}
          </Text>
        </Text>
        {offer_price ? (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#363636',
                fontFamily: 'HacenMaghrebBd',
                textDecorationLine: 'line-through',
              }}>
              {price}{' '}
              <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
                ر.س
              </Text>
            </Text>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: 'red',
                fontFamily: 'HacenMaghrebBd',
              }}>
              {offer_price}{' '}
              <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
                ر.س
              </Text>
            </Text>
          </View>
        ) : (
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#363636',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {price}{' '}
            <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
              ر.س
            </Text>
          </Text>
        )}
      </View>
      {/* <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row-reverse' }}>
                <Text style={{ fontSize: moderateScale(14), color: '#363636' }}>الكمية </Text>
                <Text style={{ fontSize: moderateScale(16), color: '#363636' }}>{quantity}</Text>
            </View> */}
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton
          onPress={() =>
            guest
              ? showMessage({
                  message: 'ليس لديك الصلاحية كزائر',
                  backgroundColor: '#FF6F61',
                })
              : dispatch(addToCartAction(id, 1))
          }
          borderRadius={23}
          fontColor="#233B5D"
          BtnTitle="أضف الى السلة"
          additionalStyle={{
            width: '90%',
            height: '75%',
            backgroundColor: 'transparent',
            borderColor: '#233B5D',
            borderWidth: 1,
          }}
          Loading={false}
        />
      </View>
    </View>
  );
  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      {companyProductsLoading ? (
        <Loading />
      ) : (
        <View style={{width: '95%', height: '100%', alignItems: 'flex-end'}}>
          <FlatList
            numColumns={2}
            contentContainerStyle={{justifyContent: 'center'}}
            data={companyProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderItem data={item} />}
            contentContainerStyle={[
              {flexGrow: 1},
              companyProducts ? null : {justifyContent: 'center'},
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
                  لا توجد منتجات فى الوقت الحالى
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={companyProductsLoading}
                onRefresh={() => {
                  dispatch(getCompanyProductsAction(companyId));
                  guest ? null : dispatch(getCartDataAction());
                }}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
