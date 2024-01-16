import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading/Loading';
import ShareIconSmall from '../../../assets/share_icon_small';
import RateStarSmall from '../../../assets/rate_star_small';
import CustomButton from '../../components/CustomButton/CustomButton';
import {moderateScale} from '../../utils/moderateScale';
import {getAllWaterOfferProductAction} from '../../redux/Category/Actions';
import {addToCartAction} from '../../redux/Cart/Actions';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

export default function Water({navigation}) {
  const dispatch = useDispatch();
  const {allOfferWaterProductLoading, allOfferWaterProduct} = useSelector(
    state => state.category,
  );
  useEffect(() => {
    dispatch(getAllWaterOfferProductAction('1'));
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAllWaterOfferProductAction('1'));
    });
    return unsubscribe;
  }, []);

  const RenderItem = ({data: {product, start_date, expire_date}}) => (
    <View
      style={{
        width: width / 2.25,
        margin: 5,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginTop: height * 0.03,
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
        </View>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: product.photo}}
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
          {product.name}
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
            {product.size}
          </Text>
        </Text>
        {/* <Text style={{ fontSize: moderateScale(16), color: '#363636', fontFamily: 'HacenMaghrebBd' }}>{price} <Text style={{ fontSize: moderateScale(12), color: '#363636' }}>ر.س</Text></Text> */}
        {product.offer_price ? (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#363636',
                fontFamily: 'HacenMaghrebBd',
                textDecorationLine: 'line-through',
              }}>
              {product.price}{' '}
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
              {product.offer_price}{' '}
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
            {product.price}{' '}
            <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
              ر.س
            </Text>
          </Text>
        )}
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Text
          style={{
            fontSize: moderateScale(15),
            color: '#363636',
            fontFamily: 'HacenMaghrebBd',
            // textDecorationLine: 'line-through',
          }}>
          {'يبدأ :'}
          <Text style={{fontSize: moderateScale(15), color: '#363636'}}>
            {start_date}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: moderateScale(15),
            color: 'red',
            fontFamily: 'HacenMaghrebBd',
          }}>
          {'ينتهى :'}
          <Text style={{fontSize: moderateScale(15), color: 'red'}}>
            {expire_date}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: moderateScale(15),
            color: '#363636',
            fontFamily: 'HacenMaghrebBd',
          }}>
          {'المدة :'}
          <Text style={{fontSize: moderateScale(15), color: '#363636'}}>
            {moment(expire_date).diff(moment(start_date), 'days')} {'يوم'}
          </Text>
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomButton
          onPress={() => dispatch(addToCartAction(product.id, 1))}
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
      {allOfferWaterProductLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            width: '100%',
            marginBottom: height * 0.01,
            alignItems: 'center',
          }}>
          <FlatList
            numColumns={2}
            data={allOfferWaterProduct.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderItem data={item} />}
            contentContainerStyle={[
              {flexGrow: 1},
              allOfferWaterProduct ? null : {justifyContent: 'center'},
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
                  لا توجد عروضات فى الوقت الحالى
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={allOfferWaterProductLoading}
                onRefresh={() => dispatch(getAllWaterOfferProductAction('1'))}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
