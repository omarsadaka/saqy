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
import {moderateScale} from '../../utils/moderateScale';
import ShareIconSmall from '../../../assets/share_icon_small';
import RateStarSmall from '../../../assets/rate_star_small';
import ShareIcon from '../../../assets/share_icon';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/CustomButton/CustomButton';
import {getAllTanksOfferProductAction} from '../../redux/Category/Actions';
import {addTanksToCartAction} from '../../redux/Cart/Actions';
const {width, height} = Dimensions.get('window');
import moment from 'moment';

export default function Tanks({navigation}) {
  const dispatch = useDispatch();
  const {allOfferTankProductLoading, allOfferTankProduct} = useSelector(
    state => state.category,
  );
  const [toggleCheckBox, setToggleCheckBox] = useState({});

  useEffect(() => {
    dispatch(getAllTanksOfferProductAction('3'));
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAllTanksOfferProductAction('3'));
    });
    return unsubscribe;
  }, []);

  const RenderItem = ({
    data: {price, id, product, start_date, expire_date},
  }) => (
    <View
      style={{
        width: '95%',
        height: height * 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        margin: 8,
        marginTop: height * 0.03,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => onSharePressed(name)}>
          <ShareIcon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: height * 0.2,
        }}>
        <Image
          source={{uri: product.photo}}
          style={{width: width * 0.3, height: height * 0.13}}
        />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebBd',
          }}
          numberOfLines={1}>
          {product.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(14),
            fontFamily: 'HacenMaghrebBd',
          }}
          numberOfLines={2}>
          {product.description}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: '1%',
        }}>
        {/* <View style={{ width: '45%',paddingVertical:'2%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#EEEEEE' }}>
                    <Text style={{ fontSize: moderateScale(16), color: '#363636' }}>{price} <Text style={{ fontSize: moderateScale(12), color: '#363636' }}>ر.س</Text></Text>
                </View> */}
        {product.offer_price ? (
          <View
            style={{
              width: '45%',
              paddingVertical: '2%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: 'red',
                marginHorizontal: width * 0.03,
              }}>
              {product.offer_price}{' '}
              <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
                ر.س
              </Text>
            </Text>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#363636',
                textDecorationLine: 'line-through',
              }}>
              {product.price}{' '}
              <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
                ر.س
              </Text>
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: '45%',
              paddingVertical: '2%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text style={{fontSize: moderateScale(16), color: '#363636'}}>
              {product.price}{' '}
              <Text style={{fontSize: moderateScale(12), color: '#363636'}}>
                ر.س
              </Text>
            </Text>
          </View>
        )}
        <View
          style={{
            width: '45%',
            paddingVertical: '2%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#EEEEEE',
          }}>
          <Text style={{fontSize: moderateScale(16), color: '#363636'}}>
            {product?.capacity?.name}{' '}
            <Text style={{fontSize: moderateScale(15), color: '#363636'}}>
              {product?.capacity?.unit?.name}
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {product.provide_installation == 1 ? (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '40%',
            }}>
            <CheckBox
              style={{alignItems: 'center', justifyContent: 'center'}}
              value={toggleCheckBox[`${id}`]}
              onValueChange={value => {
                setToggleCheckBox(prevState => ({
                  ...prevState,
                  [`${id}`]: value,
                }));
              }}
            />
            <Text
              style={{
                textAlign: 'left',
                textAlignVertical: 'center',
                height: '100%',
                marginRight: Platform.OS === 'ios' ? 8 : 0,
                fontFamily: 'HacenMaghrebBd',
              }}>
              التركيب
            </Text>
          </View>
        ) : null}
        {product.provide_installation == 1 ? (
          <Text
            style={{
              textAlign: 'right',
              textAlignVertical: 'center',
              width: '40%',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'سعر التركيب'}{' '}
            <Text
              style={{
                fontSize: moderateScale(12),
                color: '#000000',
                fontFamily: 'HacenMaghrebBd',
              }}>
              {product.installation_price}
            </Text>
          </Text>
        ) : null}
      </View>

      <View
        style={{
          width: '90%',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
          marginVertical: height * 0.01,
        }}>
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
          width: '95%',
          marginBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          onPress={() => {
            dispatch(
              addTanksToCartAction(
                product.id,
                1,
                toggleCheckBox[`${id}`] ? 1 : 0,
              ),
            );
          }}
          BtnTitle="أضف الى السلة"
          borderRadius={Math.round(width / 2 + height / 2)}
          fontColor="#000000"
          additionalStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            borderColor: '#888888',
            borderWidth: 1,
          }}
          Loading={false}
        />
      </View>
    </View>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      {allOfferTankProductLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            width: '100%',
            marginBottom: height * 0.01,
            alignItems: 'center',
          }}>
          <FlatList
            numColumns={1}
            data={allOfferTankProduct.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderItem data={item} />}
            contentContainerStyle={[
              {flexGrow: 1},
              allOfferTankProduct ? null : {justifyContent: 'center'},
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
                refreshing={allOfferTankProductLoading}
                onRefresh={() => dispatch(getAllTanksOfferProductAction('3'))}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
