import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../NavigationRef';
import RegisterOptions from '../../screens/RegisterOptions/RegisterOptions';
import Register from '../../screens/Register/Register';
import Login from '../../screens/Login/Login';
import Verification from '../../screens/Verification/Verification';
import SetPassword from '../../screens/SetPassword/SetPassword';
import {BottomNavigator} from '../BottomNavigation/BottomNavigator';
import Water from '../../screens/Water/Water';
import WaterItemDetails from '../../screens/WaterItemDetails/WaterItemDetails';
import Cart from '../../screens/Cart/Cart';
import OrderSummery from '../../screens/OrderSummery/OrderSummery';
import OrderCompleted from '../../screens/OrderCompleted/OrderCompleted';
import NewOrderDetails from '../../screens/NewOrderDetails/NewOrderDetails';
import InProgressOrderDetails from '../../screens/InProgressOrderDetails/InProgressOrderDetails';
import FinishedOrderDetails from '../../screens/FinishedOrderDetails/FinishedOrderDetails';
import CancelOrderDetails from '../../screens/CanceledOrderDetails/CanceledOrderDetails';
import CreateAd from '../../screens/CreateAd/CreateAd';
import DesalinationDetails from '../../screens/DesalinationDetails/DesalinationDetails';
import ServiceRequestSummery from '../../screens/ServiceRequestSummery/ServiceRequestSummery';
import Tanks from '../../screens/Tanks/Tanks';
import TankDetails from '../../screens/TanksDetails/TankDetails';
import TanksCart from '../../screens/TanksCart/TanksCart';
import TanksOrderSummery from '../../screens/TankOrderSummery/TankOrderSummery';
import Sanitation from '../../screens/Sanitation/Sanitation';
import SanitationDetails from '../../screens/SanitationDetails/SanitationDetails';
import Maintenance from '../../screens/Maintenance/Maintenance';
import MaintenanceDetails from '../../screens/MaintenanceDetails/MaintenanceDetails';
import GuestUser from '../../screens/GuestUser/GuestUser';
import ContactUs from '../../screens/ContactUs/ContactUs';
import AboutUs from '../../screens/AboutUs/AboutUs';
import TermsAndConditions from '../../screens/TermsAndConditions/TermsAndConditions';
import Favorites from '../../screens/Favorites/Favorites';
import ResetPassword from '../../screens/ResetPassword/ResetPassword';
import ForgetPassword from '../../screens/ForgetPassword/ForgetPassword';
import VerificationResetPassword from '../../screens/VerificationResetPassword/VerificationResetPassword';
import Faq from '../../screens/Faq/Faq';
import AddAddress from '../../screens/AddAddress/AddAddress';
import OnlineCartType from '../../screens/OnlineCartType/OnlineCartType';
import PayWebView from '../../screens/PayWebView/PayWebView';
import EditAddress from '../../screens/EditAddress/EditAddress';
import MyAddress from '../../screens/MyAddress/MyAddress';
import EditProfile from '../../screens/EditProfile/EditProfile';
import OrderRequestOnlineCartType from '../../screens/OrderRequestOnlineCartType/OrderRequestOnlineCartType';
import CartonsProviders from '../../screens/Categories/CartonsProviders';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import HelpAndSupport from '../../screens/HelpAndSupport/HelpAndSupport';
import Offers from '../../screens/Offers/Offers';
const Stack = createStackNavigator();

export function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterOptions"
          component={RegisterOptions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNavigator"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Water"
          component={Water}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaterItemDetails"
          component={WaterItemDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderSummery"
          component={OrderSummery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderCompleted"
          component={OrderCompleted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewOrderDetails"
          component={NewOrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InProgressOrderDetails"
          component={InProgressOrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FinishedOrderDetails"
          component={FinishedOrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CancelOrderDetails"
          component={CancelOrderDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateAd"
          component={CreateAd}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DesalinationDetails"
          component={DesalinationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServiceRequestSummery"
          component={ServiceRequestSummery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tanks"
          component={Tanks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TankDetails"
          component={TankDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TanksCart"
          component={TanksCart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TanksOrderSummery"
          component={TanksOrderSummery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sanitation"
          component={Sanitation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SanitationDetails"
          component={SanitationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Maintenance"
          component={Maintenance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MaintenanceDetails"
          component={MaintenanceDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GuestUser"
          component={GuestUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerificationResetPassword"
          component={VerificationResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnlineCartType"
          component={OnlineCartType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PayWebView"
          component={PayWebView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyAddress"
          component={MyAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderRequestOnlineCartType"
          component={OrderRequestOnlineCartType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartonsProviders"
          component={CartonsProviders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpAndSupport"
          component={HelpAndSupport}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Offers"
          component={Offers}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
