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
import {
  getAllOrdersAction,
  getAllStatusAction,
  getFilterOrdersAction,
} from '../../redux/Orders/Actions';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import style from './MyOrdersStyle';

const {width, height} = Dimensions.get('window');

export default function Orders({navigation}) {
  const dispatch = useDispatch();
  const {allOrdersLoading, allOrders, allStatus, allStatusLoading} =
    useSelector(state => state.orders);
  const [selectedStatus, setSelectedStatus] = useState(null);
  useEffect(() => {
    dispatch(getAllOrdersAction());
    dispatch(getAllStatusAction());
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAllOrdersAction());
      dispatch(getAllStatusAction());
    });
    return unsubscribe;
  }, []);

  const StatusColors = status => {
    switch (status) {
      case 1:
        return '#1558A2';
      case 2:
        return '#FC9E22';
      case 6:
        return '#42B5D0';
      case 7:
        return '#FF6F61';
      case 5:
        return '#FC9E22';
      case 3:
        return 'green';
      case 4:
        return 'red';
    }
  };

  const StatusText = status => {
    switch (status) {
      case 1:
        return 'طلب جديد';
      case 2:
        return 'قيد التنفيذ';
      case 3:
        return 'تم التجهيز';
      case 4:
        return 'فى الطريق';
      case 5:
        return 'تم التوصيل';
      case 6:
        return 'منتهى';
      case 7:
        return 'ملغى';
    }
  };

  const StatusNavigation = status => {
    switch (status) {
      case 6:
        return 'FinishedOrderDetails';
      case 2:
        return 'InProgressOrderDetails';
      case 1:
        return 'NewOrderDetails';
      case 7:
        return 'CancelOrderDetails';
      case 4:
        return 'InProgressOrderDetails';
      case 3:
        return 'InProgressOrderDetails';
      case 5:
        return 'InProgressOrderDetails';
    }
  };
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(StatusNavigation(item.status_id), {
          OrderID: item.id,
          Type: 'Order',
        })
      }
      style={{
        width: '97%',
        height: height * 0.19,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row-reverse',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: width * 0.03,
          }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {item.id} {'#'}
          </Text>
          <Image
            source={{uri: item.provider.logo}}
            style={{height: '75%', width: '100%'}}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: '70%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          {/* <Text style={{ textAlign: 'left', textAlignVertical: 'center', width: '95%', fontSize: moderateScale(12), color: '#363636' }}>{`${monthNames[new Date(item.created_at).getMonth()]} ${new Date(item.created_at).getUTCDate()}`}</Text> */}
          <Text
            style={{
              textAlign: 'left',
              textAlignVertical: 'center',
              width: '95%',
              fontSize: moderateScale(12),
              color: '#363636',
              fontFamily: 'HacenMaghrebBd',
            }}>
            {moment(item.created_at).format('YYYY-MM-DD')}
          </Text>
          <View style={{flexDirection: 'row', width: '100%'}}>
            {item.expected_delivery_date ? (
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={require('../../../assets/delivery.png')}
                  style={{width: 20, height: 20}}
                />
                <Text
                  style={{
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    fontSize: moderateScale(12),
                    color: '#363636',
                    marginHorizontal: 4,
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  {/* {moment
                    .utc(item.expected_delivery_date)
                    .format('YYYY-MM-DD HH:MM')} */}
                  {item.expected_delivery_date.split('.')[0].replace('T', '  ')}
                </Text>
              </View>
            ) : null}
            <Text
              style={{
                flex: 1,
                textAlign: 'right',
                textAlignVertical: 'center',
                fontSize: moderateScale(14),
                color: '#000000',
                fontFamily: 'HacenMaghrebBd',
              }}>
              {item.total} {'رس'}
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'right',
              textAlignVertical: 'center',
              width: '95%',
              fontSize: moderateScale(14),
              color: '#000000',
              fontFamily: 'HacenMaghrebBd',
            }}
            numberOfLines={2}>
            {item.provider.user.name}
          </Text>
          <View
            style={{
              width: '30%',
              height: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: StatusColors(item.status),
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                textAlignVertical: 'center',
                color: StatusColors(item.status_id),
                fontFamily: 'HacenMaghrebBd',
              }}>
              {StatusText(item.status_id)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2%',
        }}>
        <View
          style={{
            // width: '45%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {allStatus ? (
            <View
              style={[
                style.spinner,
                {
                  flexDirection: 'row',
                  // marginBottom: height * 0.01,
                  width: width * 0.55,
                },
              ]}>
              <Icon
                name="chevron-down"
                type="feather"
                size={15}
                color={'#000000'}
              />
              <ModalDropdown
                options={[{label: 'الكل', value: -1}].concat(
                  allStatus.map(item => ({label: item.name, value: item.id})),
                )}
                style={{flex: 1, marginHorizontal: '2%'}}
                textStyle={style.text_style}
                defaultValue={'الكل'}
                dropdownStyle={style.dropdown_style}
                dropdownTextStyle={style.label_style}
                dropdownTextHighlightStyle={style.label_style}
                adjustFrame={() => {
                  return {
                    width: width * 0.53,
                    height: height * 0.44,
                    position: 'absolute',
                    left: width * 0.05,
                    top: Platform.OS == 'ios' ? height * 0.3 : height * 0.14,
                  };
                }}
                renderRow={(option, index, isSelected) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor:
                          Platform.OS == 'android' ? '#FFFFFF' : null,
                      }}>
                      <Text style={style.spiner_label}>{option.label}</Text>
                      {isSelected ? (
                        <Icon
                          style={{margin: 12}}
                          name="check"
                          size={24}
                          color="#49A0E3"
                        />
                      ) : null}
                    </View>
                  );
                }}
                renderButtonText={rowData => rowData.label} // ba3d ma t5tar
                onSelect={(index, value) => {
                  if (value.value == -1)
                    dispatch(getAllOrdersAction(value.value));
                  else dispatch(getFilterOrdersAction(value.value));
                }}
              />
            </View>
          ) : // <CustomPicker
          //   additionalStyle={{
          //     height: height * 0.06,
          //     borderRadius: 5,
          //     borderWidth: 1,
          //     borderColor: 'gray',
          //   }}
          //   PickerData={[{label: 'الكل', value: -1}].concat(
          //     allStatus.map(item => ({label: item.name, value: item.id})),
          //   )}
          //   placeholder="الكل"
          //   onValueChange={(value, index) => {
          //     if (value.value == -1)
          //       dispatch(getAllOrdersAction(value.value));
          //     else dispatch(getFilterOrdersAction(value));
          //   }}
          //   selectedValue={selectedStatus}
          // />
          null}
        </View>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: moderateScale(15),
            color: '#233B5D',
            fontFamily: 'HacenMaghrebBd',
          }}>
          تصفية نتائج البحث
        </Text>
      </View>
      {allOrdersLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            width: '100%',
            marginBottom: height * 0.07,
            alignItems: 'center',
          }}>
          <FlatList
            data={allOrders.data}
            keyExtractor={item => item.id}
            renderItem={RenderItem}
            contentContainerStyle={[
              {flexGrow: 1},
              allOrders ? null : {justifyContent: 'center'},
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
                refreshing={allOrdersLoading}
                onRefresh={() => dispatch(getAllOrdersAction())}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
