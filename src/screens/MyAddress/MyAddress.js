import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import {Icon} from 'react-native-elements';
import {User} from '../../components/api/UserUtilities';
import style from './MyAddressStyle';
import {getHomeUserAddresses} from '../../redux/Notification/Actions';
const {width, height} = Dimensions.get('window');
export default function MyAddress({navigation}) {
  const dispatch = useDispatch();
  const {homeUserAddresses, homeUserAddressesLoading} = useSelector(
    state => state.Notification,
  );
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllAddress();
      // dispatch(getHomeUserAddresses());
    });
    return unsubscribe;
  }, []);

  const getAllAddress = () => {
    setLoading(true);
    User.getAllAdress()
      .then(res => {
        console.log('getAllAddress', JSON.stringify(res));
        setLoading(false);
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              id: arr[index].id,
              city: arr[index].city?.name,
              address: arr[index].address,
              region: arr[index].city?.region?.name,
              country: arr[index].city?.region?.country?.name,
            };
            data.push(obj);
          }
          setAddresses(data);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const renderAddressItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          addressId == item.id ? style.clickedAddress : style.unClickedAddress,
        ]}
        onPress={() => setAddressId(item.id)}>
        <View
          style={{width: '90%', alignItems: 'center', flexDirection: 'row'}}>
          <Icon
            name="edit"
            type="feather"
            size={20}
            color="#000000"
            onPress={() => navigation.navigate('EditAddress', {ID: item.id})}
          />
          <Text
            style={{
              flex: 1,
              textAlign: 'right',
              textAlignVertical: 'center',
              color: '#363636',
              fontSize: moderateScale(16),
              fontFamily: 'HacenMaghrebBd',
            }}>
            {item.address} {item.city}
          </Text>
        </View>
        <Text
          style={{
            width: '90%',
            textAlign: 'right',
            textAlignVertical: 'center',
            color: '#363636',
            fontSize: moderateScale(16),
            fontFamily: 'HacenMaghrebBd',
          }}>
          {item.region} {item.country}
        </Text>
      </TouchableOpacity>
    );
  };

  const addBtn = () => {
    return (
      <TouchableOpacity
        style={style.addBtn}
        onPress={() => navigation.navigate('AddAddress')}>
        <Text style={style.add}>إضافه</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 7}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'عناوينى'}
      />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={addresses}
              keyExtractor={item => item.id}
              renderItem={renderAddressItem}
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
                    لا يوجد عناوين شحن
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
      {addBtn()}
    </View>
  );
}
