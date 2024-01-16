import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import CustomTabBar from './CustomTabBar';
import Home from '../../screens/Home/Home';
import MyOrders from '../../screens/MyOrders/MyOrders';
import Notifications from '../../screens/Notifications/Notifications';
import Offers from '../../screens/Offers/Offers';
import Profile from '../../screens/Profile/Profile';
import GuestUser from '../../screens/GuestUser/GuestUser';
import HomeIcon from '../../../assets/home_icon';
import MyOrdersIcon from '../../../assets/my_orders_icon';
import NotificationsIcon from '../../../assets/notifications_icon';
import ProfileIcon from '../../../assets/profile_icon';
import MyOffersIcon from '../../../assets/my_offers_icon';

const Tab = createBottomTabNavigator();

export function BottomNavigator(props) {
  const {guest} = props.route.params;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{width: '100%', backgroundColor: 'transparent'}}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeIcon fill="#fafafa" />
            ) : (
              <HomeIcon fill="#BABACE" />
            );
          }
          if (route.name === 'MyOrders') {
            return focused ? (
              <MyOrdersIcon fill="#fafafa" />
            ) : (
              <MyOrdersIcon fill="#BABACE" />
            );
          }
          if (route.name === 'Notifications') {
            return focused ? (
              <NotificationsIcon fill="#fafafa" />
            ) : (
              <NotificationsIcon fill="#BABACE" />
            );
          }
          if (route.name === 'Offers') {
            return focused ? (
              <MyOffersIcon fill="#fafafa" />
            ) : (
              <MyOffersIcon fill="#BABACE" />
            );
          }
          if (route.name === 'Profile') {
            return focused ? (
              <ProfileIcon fill="#fafafa" />
            ) : (
              <ProfileIcon fill="#BABACE" />
            );
          }
        },
      })}>
      <Tab.Screen
        name="Profile"
        options={{tabBarLabel: 'حسابى'}}
        component={guest ? GuestUser : Profile}
      />
      {guest ? null : (
        <Tab.Screen
          name="Offers"
          options={{tabBarLabel: 'العروض'}}
          listeners={{tabPress: e => (guest ? e.preventDefault() : null)}}
          component={Offers}
        />
      )}
      {guest ? null : (
        <Tab.Screen
          name="Notifications"
          options={{tabBarLabel: 'إشعارات'}}
          listeners={{tabPress: e => (guest ? e.preventDefault() : null)}}
          component={Notifications}
        />
      )}
      {guest ? null : (
        <Tab.Screen
          name="MyOrders"
          options={{tabBarLabel: 'طلباتى'}}
          listeners={{tabPress: e => (guest ? e.preventDefault() : null)}}
          component={MyOrders}
        />
      )}
      <Tab.Screen
        name="Home"
        options={{tabBarLabel: 'الرئيسية'}}
        initialParams={{guest: guest}}
        component={Home}
      />
    </Tab.Navigator>
  );
}
