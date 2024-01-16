import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import Share from 'react-native-share';
import {moderateScale} from '../../../utils/moderateScale';
import Loading from '../../../components/Loading/Loading';
import CustomPicker from '../../../components/CustomPicker/CustomPicker';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ShareIcon from '../../../../assets/share_icon';
import LoveIcon from '../../../../assets/love_icon';
import LikedIcon from '../../../../assets/liked_icon';
import CheckBox from '@react-native-community/checkbox';
import {
  getTanksProductsAction,
  ResetTanksProductsData,
} from '../../../redux/CompanyDetails/Actions';
import {addTanksToCartAction} from '../../../redux/Cart/Actions';
import {
  addItemToFavoritesAction,
  removeItemToFavoritesAction,
} from '../../../redux/Favorites/Actions';
import {User} from '../../../components/api/UserUtilities';

const {width, height} = Dimensions.get('window');

export default function TankProducts({companyId, guest}) {
  const [selectedCapacity, setSelectedCapacity] = useState({});
  const [costIndex, setCostIndex] = useState({});
  const [likedItem, setLikedItem] = useState({});
  const [capacities, setCapacities] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState({});

  let dataI = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
  ];

  const dispatch = useDispatch();

  const {tanksProductsLoading, tanksProducts, tanksProductsFail} = useSelector(
    state => state.companyInfo,
  );
  const {addTanksToCartLoading} = useSelector(state => state.Cart);

  useEffect(() => {
    dispatch(getTanksProductsAction(companyId, guest));
    // guest ? null : dispatch(getCartDataAction())
    getTankCapcities();

    return () => dispatch(ResetTanksProductsData());
  }, []);

  useEffect(() => {
    var uniqueIndex =
      tanksProducts.length &&
      Object.assign({}, ...tanksProducts.map(item => ({[`${item.id}`]: -1})));
    var uniqueLikedItem =
      tanksProducts.length &&
      Object.assign(
        {},
        ...tanksProducts.map(item => ({[`${item.id}`]: item.favoriteFlag})),
      );
    setCostIndex(prevState => ({...prevState, ...uniqueIndex}));
    setSelectedCapacity(prevState => ({...prevState, ...uniqueIndex}));
    setLikedItem(prevState => ({...prevState, ...uniqueLikedItem}));
  }, [tanksProducts.length]);

  console.log('tanksProducts: ', tanksProducts);
  console.log('costIndex: ', costIndex);

  console.log('likedItem: ', likedItem);

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

  const likeAndDislikeProduct = (productedLiked, id, favoriteItemId) => {
    console.log('productedLiked: ', productedLiked);
    console.log('iddddd: ', id);
    //console.log("alreadyLiked: ", alreadyLiked)

    if (productedLiked) {
      // remove from favorites
      console.log('favorite id inside remove: ', favoriteItemId);
      dispatch(removeItemToFavoritesAction(id));
      setLikedItem(prevState => ({...prevState, [`${id}`]: false}));
    } else {
      // add to favorites
      console.log('id inside add: ', id);
      dispatch(addItemToFavoritesAction(id));
      setLikedItem(prevState => ({...prevState, [`${id}`]: true}));
    }
  };

  const getTankCapcities = () => {
    User.capacities()
      .then(res => {
        console.log('capacities', JSON.stringify(res));
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              name: arr[index].name,
              unit: arr[index].unit?.name,
            };
            data.push(obj);
          }
          setCapacities(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const RenderItem = ({
    data: {
      name,
      description,
      price,
      offer_price,
      id,
      capacity,
      photo,
      provide_installation,
      installation_price,
    },
  }) => (
    <View
      style={{
        width: '95%',
        height: Platform.OS == 'ios' ? height * 0.5 : height * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        margin: 8,
      }}>
      <View
        style={{width: '100%', alignItems: 'flex-start', flexDirection: 'row'}}>
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
          source={{uri: photo}}
          style={{width: width * 0.3, height: height * 0.13}}
        />
      </View>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebBd',
          }}
          numberOfLines={1}>
          {name}
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
          {description}
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
        {offer_price ? (
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
              {offer_price}{' '}
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
              {price}{' '}
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
              {price}{' '}
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
            {capacity?.name}{' '}
            <Text style={{fontSize: moderateScale(15), color: '#363636'}}>
              {capacity?.unit?.name}
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
        {provide_installation == 1 ? (
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
        {provide_installation == 1 ? (
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
              {installation_price}
            </Text>
          </Text>
        ) : null}
      </View>

      <View
        style={{
          width: '95%',
          marginBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          onPress={() =>
            guest
              ? showMessage({
                  message: 'ليس لديك الصلاحية كزائر',
                  backgroundColor: '#FF6F61',
                })
              : dispatch(
                  addTanksToCartAction(id, 1, toggleCheckBox[`${id}`] ? 1 : 0),
                )
          }
          BtnTitle="أضف الى السلة"
          borderRadius={Math.round(width / 2 + height / 2)}
          fontColor="#000000"
          additionalStyle={{
            width: '100%',
            height: Platform.OS == 'ios' ? '80%' : '100%',
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
      {tanksProductsLoading ? (
        <Loading />
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{justifyContent: 'center'}}
            data={tanksProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderItem data={item} />}
            contentContainerStyle={[
              {flexGrow: 1},
              tanksProducts ? null : {justifyContent: 'center'},
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
                  لا توجد اى منتجات
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={tanksProductsLoading}
                onRefresh={() => {
                  dispatch(getTanksProductsAction(companyId, guest));
                  getTankCapcities();
                }}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
