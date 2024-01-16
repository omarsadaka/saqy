import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header/Header';
import {moderateScale} from '../../utils/moderateScale';
import NotificationStatusIcon from '../../../assets/notification_status_icon';
import axios from 'axios';
import {
  getNotificationAction,
  updateNotificationToReadAction,
  getUnReadNotificationAction,
} from '../../redux/Notification/Actions';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Loading/Loading';
import {CheckActiveUserAction} from '../../redux/Location/Actions';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

export default function Notifications({navigation}) {
  const dispatch = useDispatch();
  const {notificationLoading, notification} = useSelector(
    state => state.Notification,
  );
  useEffect(() => {
    dispatch(getNotificationAction());
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getNotificationAction());
      dispatch(CheckActiveUserAction(navigation));
    });
    return unsubscribe;
  }, []);
  console.log('notification???>>>>>>>', notification);
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
  const RenderItem = ({
    data: {
      id,
      item_id,
      body,
      status_id,
      notification_type,
      created_at,
      is_read,
      sub_section_id,
    },
  }) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 8,
        }}
        onPress={() => {
          dispatch(updateNotificationToReadAction(id));
          dispatch(getUnReadNotificationAction());
          if (notification_type == 'order' || notification_type == 'service') {
            navigation.navigate(StatusNavigation(status_id), {
              OrderID: item_id,
              Type: notification_type == 'order' ? 'Order' : 'Service',
            });
          } else if (notification_type == 'offer') {
            navigation.navigate('Offers', {
              Type: sub_section_id,
            });
          }
        }}>
        <View
          style={{
            width: '95%',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          {/* <Text style={{flex:1, textAlign: 'left', textAlignVertical: 'center', fontSize: moderateScale(12), color: '#707070', fontFamily: 'HacenMaghrebLt' }}>{moment.utc(created_at).format("YYYY-MM-DD  HH:MM:SS")}</Text> */}
          <Text
            style={{
              flex: 1,
              textAlign: 'left',
              textAlignVertical: 'center',
              fontSize: moderateScale(12),
              color: '#707070',
              fontFamily: 'HacenMaghrebLt',
            }}>
            {created_at.split('.')[0].replace('T', '  ')}
          </Text>
          <NotificationStatusIcon />
        </View>
        <Text
          style={{
            textAlign: 'right',
            textAlignVertical: 'center',
            width: '90%',
            fontSize: moderateScale(13.5),
            color: is_read == 0 ? 'red' : '#363636',
            fontFamily: 'HacenMaghrebLt',
          }}>
          {body}
        </Text>
        <View
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            marginTop: 3,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <Header
        height={height / 7}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'إشعارات'}
      />
      {notificationLoading ? (
        <Loading />
      ) : (
        <View style={{width: '100%', height: '80%', alignItems: 'center'}}>
          <FlatList
            data={notification}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderItem data={item} />}
            refreshControl={
              <RefreshControl
                colors={['blue', 'gray']}
                refreshing={notificationLoading}
                onRefresh={() => dispatch(getNotificationAction())}
              />
            }
            ListEmptyComponent={() => (
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#000000',
                    fontSize: moderateScale(18),
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  لا يوجد إشعارات فى الوقت الحالى
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
