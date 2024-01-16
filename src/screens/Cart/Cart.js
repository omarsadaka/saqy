import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import Swipeout from 'react-native-swipeout';
import {useDispatch, useSelector} from 'react-redux';
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

export default function Cart({navigation}) {
  const dispatch = useDispatch();

  var [itemQuantity, setItemQuantity] = useState({});
  const [itemId, setItemId] = useState(0);
  const [enable, setEnable] = useState(true);
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState({});

  // const [increaseQuantity, setIncreaseQuantity] = useState([])
  // const [decreaseQuantity, setDecreaseQuantity] = useState([])

  const {cartDataLoading, cartData, removedItem} = useSelector(
    state => state.cart,
  );
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
      setItemQuantity(prevState => ({...prevState, ...uniqueQuantity}));
    }
  }, [cartData.length]);

  console.log('cartData', cartData);

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

  var rightBtns = [
    {
      component: (
        // <TouchableOpacity style={{ flex: 1, margin: 8, alignItems: 'center', backgroundColor: '#6882FD' }}>
        //     <SwipleLoveIcon />
        // </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(deleteItemFromCartAction(itemId));
            cartData.forEach(element => {
              if (element.available == 0) {
                setEnable(false);
              }
            });
          }}
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
          onPress={() => {
            dispatch(deleteItemFromCartAction(itemId));
            cartData.forEach(element => {
              if (element.available == 0) {
                setEnable(false);
              }
            });
          }}
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

  const updateItemQuantity = () => {
    console.log(
      'values: ',
      Object.values(updatedQuantity).map(value => value),
    );
    if (Object.values(updatedQuantity).map(value => value).length > 0) {
      dispatch(
        updateCartItemQuantityAction(
          Object.values(updatedQuantity).map(value => value),
          false,
          navigation,
        ),
      );
    } else {
      navigation.navigate('OrderSummery');
    }
  };

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
            height: height * 0.18,
            margin: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row-reverse',
          }}>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              source={{uri: item.product.photo}}
              style={{height: '100%', width: '90%'}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                textAlign: 'right',
                textAlignVertical: 'center',
                width: '90%',
                fontSize: moderateScale(14),
                color: '#233B5D',
                fontFamily: 'HacenMaghrebBd',
              }}
              numberOfLines={2}>
              {item.product.name}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                textAlignVertical: 'center',
                width: '90%',
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
            {item.enable_installation != 0 ? (
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
                  {item.installation_price * itemQuantity[`${item.id}`]}
                </Text>
              </Text>
            ) : null}
          </View>
          <View
            style={{
              width: '35%',
              height: '30%',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#EEEEEE',
            }}>
            <Text
              onPress={() => {
                setItemQuantity(prevState => ({
                  ...prevState,
                  [`${item.id}`]: prevState[`${item.id}`] + 1,
                }));
                setUpdatedQuantity(prevState => ({
                  ...prevState,
                  [`${item.id}`]: {
                    id: item.id,
                    qty: itemQuantity[`${item.id}`] + 1,
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
                  : setItemQuantity(prevState => ({
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
        <View style={{width: '100%', height: '82%', alignItems: 'center'}}>
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
                onRefresh={() => {
                  loadData();
                }}
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
