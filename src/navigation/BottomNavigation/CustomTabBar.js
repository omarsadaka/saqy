import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeIcon from '../../../assets/home_icon';
import MyOrdersIcon from '../../../assets/my_orders_icon';
import NotificationsIcon from '../../../assets/notifications_icon';
import ProfileIcon from '../../../assets/profile_icon';
import MyOffersIcon from '../../../assets/my_offers_icon';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const FocusedGradient = ['#42B5D0', '#3EB0CE', '#1579BB'];
const NotFocusedGradient = ['#ffffff', '#ffffff'];

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const {unreadNotification} = useSelector(state => state.Notification);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        //console.log('options: ', state.routes);
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name == 'Offers')
              navigation.navigate(route.name, {Type: 1});
            else navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const setIcon = () => {
          if (route.name === 'Home') {
            return isFocused ? (
              <HomeIcon fill="#fafafa" />
            ) : (
              <HomeIcon fill="#BABACE" />
            );
          }
          if (route.name === 'MyOrders') {
            return isFocused ? (
              <MyOrdersIcon fill="#fafafa" />
            ) : (
              <MyOrdersIcon fill="#BABACE" />
            );
          }
          if (route.name === 'Notifications') {
            return (
              <View style={{}}>
                {isFocused ? (
                  <NotificationsIcon fill="#fafafa" />
                ) : (
                  <NotificationsIcon fill="#BABACE" />
                )}
                <View
                  style={{
                    width: width * 0.04,
                    height: width * 0.04,
                    borderRadius: (width * 0.04) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: -height * 0.01,
                    right: -width * 0.02,
                    backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'HacenMaghrebLt',
                      fontSize: width * 0.025,
                      color: '#FFFFFF',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>
                    {unreadNotification}
                  </Text>
                </View>
              </View>
            );
          }
          if (route.name === 'Offers') {
            // return isFocused ? <MyOffersIcon fill="#fafafa" /> : <MyOffersIcon fill="#BABACE" />
            return (
              <Icon
                name={'dollar-sign'}
                type="feather"
                size={25}
                color={isFocused ? '#fafafa' : '#BABACE'}
              />
            );
          }
          if (route.name === 'Profile') {
            return isFocused ? (
              <ProfileIcon fill="#fafafa" />
            ) : (
              <ProfileIcon fill="#BABACE" />
            );
          }
        };

        return (
          <LinearGradient
            colors={FocusedGradient}
            style={{
              flex: 1,
              backgroundColor: isFocused ? 'dodgerblue' : 'white',
            }}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                minHeight: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>{setIcon()}</View>
              <Text
                style={{
                  color: isFocused ? '#FAFAFA' : '#BABACE',
                  fontFamily: 'HacenMaghrebLt',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
