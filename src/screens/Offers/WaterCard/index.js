/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import RateStarSmall from '../../../../assets/rate_star_small';
import ShareIconSmall from '../../../../assets/share_icon_small';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {addToCartAction} from '../../../redux/Cart/Actions';
import {moderateScale} from '../../../utils/moderateScale';

const WaterCard = ({data, onSharePressed}) => {
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  return (
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
          <TouchableOpacity onPress={() => onSharePressed(data.product)}>
            <ShareIconSmall />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: data.product.photo}}
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
          {data.product.name}
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
            {data.product.size}
          </Text>
        </Text>
        {/* <Text style={{ fontSize: moderateScale(16), color: '#363636', fontFamily: 'HacenMaghrebBd' }}>{price} <Text style={{ fontSize: moderateScale(12), color: '#363636' }}>ر.س</Text></Text> */}
        {data?.price ? (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#363636',
                fontFamily: 'HacenMaghrebBd',
                textDecorationLine: 'line-through',
              }}>
              {data.product.price}
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
              {data.price}
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
            {data.product.price}
            <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
              ر.س
            </Text>
          </Text>
        )}
      </View>

      <View
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton
          onPress={() => dispatch(addToCartAction(data.product.id, 1))}
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
};

export default WaterCard;
