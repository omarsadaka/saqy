import React, {useEffect, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  I18nManager,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {MainNavigator} from './src/navigation/MainNavigation/MainNavigator';
import * as RootNavigation from './src/navigation/NavigationRef';
import store from './src/utils/store';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    try {
      I18nManager.allowRTL(false);
    } catch (e) {
      console.log(e);
    }
    SplashScreen.hide();
    //we check if user has granted permission to receive push notifications.
    checkPermission();
    // Register all listener for notification
    SubscribeNotifications();
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      console.log('user has Permission');
      getToken();
    } else {
      console.log('user not has Permission');
      requestPermission();
    }
  };
  const getToken = async () => {
    let ReceivedfcmToken = await messaging().getToken();
    if (ReceivedfcmToken) {
      console.log('ReceivedfcmToken:' + ReceivedfcmToken);
      await AsyncStorage.setItem('fcmToken', ReceivedfcmToken).then(value => {
        AsyncStorage.getItem('fcmToken').then(val => {
          if (!val) {
            AsyncStorage.setItem('fcmToken', ReceivedfcmToken);
          }
        });
      });
    }
  };
  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      alert(JSON.stringify(error));
      // User has rejected permissions
      console.log('permission rejected');
    }
  };
  const SubscribeNotifications = () => {
    try {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('messageListener1:', JSON.stringify(remoteMessage));
      });
    } catch (e) {
      console.log('eeeee', e);
    }
    try {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log('messageListener2:' + JSON.stringify(remoteMessage));
        });
    } catch (e) {}
    try {
      messaging().onMessage(async remoteMessage => {
        console.log('messageListener3:' + JSON.stringify(remoteMessage));
        const {title, body} = remoteMessage.notification;
        displayNotification(title, body);
      });
    } catch (e) {}
  };
  const displayNotification = (title, body) => {
    // we display notification in alert box with title and body
    Alert.alert(
      title,
      body,
      [{text: 'Ok', onPress: () => console.log('ok pressed')}],
      {cancelable: false},
    );
  };
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <Provider store={store}>
          <MainNavigator onReady={() => (isReadyRef.current = true)} />
          <FlashMessage
            position="Top"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}
            duration={3000}
            titleStyle={{
              fontSize: 14,
              alignSelf: 'center',
            }}
          />
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;
