import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import CheckBox from '@react-native-community/checkbox';
import {moderateScale} from '../../utils/moderateScale';
import Loading from '../../components/Loading/Loading';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import SwipleLoveIcon from '../../../assets/swiple_love_icon';
import DeleteIcon from '../../../assets/delete_icon';
import {
  getCartDataAction,
  deleteItemFromCartAction,
  ResetDeletedItems,
  updateCartItemQuantityAction,
} from '../../redux/Cart/Actions';

import {showMessage} from 'react-native-flash-message';
import {User} from '../../components/api/UserUtilities';
const {width, height} = Dimensions.get('window');

export default function TanksCart({navigation}) {
  const dispatch = useDispatch();

  const [itemQuantity, setQuantity] = useState({});
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState({});
  const [updatedQuantity, setUpdatedQuantity] = useState({});
  const [itemId, setItemId] = useState(0);
  const [enable, setEnable] = useState(true);

  const {cartDataLoading, cartData, removedItem, updatedItemsLoading} =
    useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartDataAction());
    return () => dispatch(ResetDeletedItems());
  }, []);

  useEffect(() => {
    if (Object.keys(removedItem).length == 0) {
      var uniqueQuantity =
        cartData.length &&
        Object.assign(
          {},
          ...cartData.map(item => ({[`${item.id}`]: item.qty})),
        );
      var uniqueCheckBox =
        cartData.length &&
        Object.assign(
          {},
          ...cartData.map(item => ({[`${item.id}`]: item.hasSetupCost})),
        );
      setQuantity(prevState => ({...prevState, ...uniqueQuantity}));
      setToggleCheckBox(prevState => ({...prevState, ...uniqueCheckBox}));
    }
  }, [cartData.length]);

  const loadData = () => {
    setEnable(true);
    dispatch(getCartDataAction());
    User.userCart()
      .then(res => {
        console.log('omar res', res);
        const data = res.data;
        if (res.data) {
          data.forEach(element => {
            if (element.available == 0) {
              setEnable(false);
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateItemQuantity = () => {
    // dispatch(updateCartItemQuantityAction(Object.values(updatedQuantity).map(value => value), true, navigation))
    console.log(
      'values: ',
      Object.values(updatedQuantity).map(value => value),
    );
    if (Object.values(updatedQuantity).map(value => value).length > 0) {
      dispatch(
        updateCartItemQuantityAction(
          Object.values(updatedQuantity).map(value => value),
          true,
          navigation,
        ),
      );
    } else {
      navigation.navigate('TanksOrderSummery');
    }
  };

  console.log('cartDataLength: ', cartData.length);

  var rightBtns = [
    {
      component: (
        // <TouchableOpacity style={{ flex: 1, margin: 8, alignItems: 'center', backgroundColor: '#6882FD' }}>
        //     <SwipleLoveIcon />
        //     <DeleteIcon />
        // </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteItemFromCartAction(itemId))}
          style={{
            flex: 1,
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FF6F61',
          }}>
          <DeleteIcon />
        </TouchableOpacity>
      ),
      backgroundColor: 'transparent',
    },
  ];

  var leftBtns = [
    {
      component: (
        <TouchableOpacity
          onPress={() => dispatch(deleteItemFromCartAction(itemId))}
          style={{
            flex: 1,
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FF6F61',
          }}>
          <DeleteIcon />
        </TouchableOpacity>
      ),
      backgroundColor: 'transparent',
    },
  ];

  const RenderItem = ({item}) => (
    <Swipeout
      backgroundColor="transparent"
      buttonWidth={width / 3.5}
      onOpen={() => setItemId(item.id)}
      left={leftBtns}
      right={rightBtns}>
      {item.available == 0 ? (
        <View
          style={{
            width: '95%',
            height: height * 0.18,
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row-reverse',
          }}>
          <Text
            style={{
              textAlign: 'right',
              textAlignVertical: 'center',
              width: '90%',
              fontSize: moderateScale(14),
              color: '#233B5D',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'عذراً، هذا المنتج غير متاح حالياً'}
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: '95%',
            height: height * 0.22,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: '98%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  width: '45%',
                  fontSize: moderateScale(16),
                  color: '#000000',
                  fontFamily: 'HacenMaghrebBd',
                }}>
                {parseFloat(item.price * itemQuantity[`${item.id}`]).toFixed(2)}{' '}
                <Text style={{fontSize: moderateScale(12), color: '#000000'}}>
                  ر.س
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: moderateScale(14),
                  color: '#233B5D',
                  flex: 1,
                  fontFamily: 'HacenMaghrebBd',
                }}
                numberOfLines={3}>
                {item.product.name}
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <Image
                source={{uri: item.product.photo}}
                style={{height: height * 0.1, width: width * 0.2}}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
          </View>

          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '35%',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#EEEEEE',
              }}>
              <Text
                onPress={() => {
                  setQuantity(prevState => ({
                    ...prevState,
                    [`${item.id}`]: prevState[`${item.id}`] + 1,
                  }));
                  setUpdatedQuantity(prevState => ({
                    ...prevState,
                    [`${item.id}`]: {
                      id: item.id,
                      qty: itemQuantity[`${item.id}`] + 1,
                      hasSetupCost: toggleCheckBox[`${item.id}`],
                    },
                  }));
                }}
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: '25%',
                  fontSize: moderateScale(14),
                }}>
                +
              </Text>
              <View
                style={{
                  backgroundColor: '#EEEEEE',
                  alignItems: 'center',
                  height: '100%',
                  width: 1,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: '25%',
                  fontSize: moderateScale(14),
                }}>
                {itemQuantity[`${item.id}`]}
              </Text>
              <View
                style={{
                  backgroundColor: '#EEEEEE',
                  alignItems: 'center',
                  height: '100%',
                  width: 1,
                }}
              />
              <Text
                onPress={() => {
                  itemQuantity[`${item.id}`] == 1
                    ? null
                    : setQuantity(prevState => ({
                        ...prevState,
                        [`${item.id}`]: prevState[`${item.id}`] - 1,
                      }));
                  itemQuantity[`${item.id}`] == 1
                    ? null
                    : setUpdatedQuantity(prevState => ({
                        ...prevState,
                        [`${item.id}`]: {
                          id: item.id,
                          qty: itemQuantity[`${item.id}`] - 1,
                          hasSetupCost: toggleCheckBox[`${item.id}`],
                        },
                      }));
                }}
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: '25%',
                  fontSize: moderateScale(14),
                }}>
                -
              </Text>
            </View>
          </View>
          {item.enable_installation == 1 ? (
            <Text
              style={{
                textAlign: 'right',
                textAlignVertical: 'center',
                width: '90%',
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
                {item.product.installation_price * itemQuantity[`${item.id}`]}
              </Text>
            </Text>
          ) : null}
          {/* {item.product.size? */}
          <Text
            style={{
              textAlign: 'right',
              textAlignVertical: 'center',
              width: '90%',
              fontSize: moderateScale(16),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {'الحجم'}{' '}
            <Text style={{fontSize: moderateScale(12), color: '#000000'}}>
              {item.product.size ? item.product.size : 'غير معروف'}
            </Text>
          </Text>
          {/* :null} */}
        </View>
      )}
    </Swipeout>
  );
  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 6.5}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'سلة المنتجات'}
      />
      {cartDataLoading ? (
        <Loading />
      ) : (
        <View style={{width: '100%', height: '82%'}}>
          <FlatList
            data={cartData}
            keyExtractor={item => item.id}
            renderItem={RenderItem}
            contentContainerStyle={[
              {flexGrow: 1},
              cartData ? null : {justifyContent: 'center'},
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
                  السلة فارغة
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={cartDataLoading}
                onRefresh={() => loadData()}
              />
            }
          />
          {cartData.length ? (
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 8,
              }}>
              <CustomButton
                Loading={updatedItemsLoading}
                onPress={() => {
                  if (enable) updateItemQuantity();
                  else
                    showMessage({
                      message:
                        'عذرا يوجد منتجات غير متاحه قم بحذفها أولا من السلة',
                      backgroundColor: 'red',
                    });
                }}
                BtnTitle="متابعة"
                borderRadius={Math.round(width / 2 + height / 2)}
                LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
              />
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}
