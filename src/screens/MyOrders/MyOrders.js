import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import Orders from './Orders';
import Services from './Services';
import {CheckActiveUserAction} from '../../redux/Location/Actions';
const {width, height} = Dimensions.get('window');

export default function MyOrders({navigation}) {
  useEffect(() => {
    dispatch(CheckActiveUserAction(navigation));
  }, []);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Services', title: 'الخدمات'},
    {key: 'Orders', title: 'المنتجات'},
  ]);
  const bottomSheetRef = useRef();
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Orders':
        return <Orders navigation={navigation} />;
      case 'Services':
        return <Services navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
      <Header
        height={height / 7}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'طلباتى'}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: '85%',
        }}>
        <TabView
          navigationState={{index, routes}}
          swipeEnabled={false}
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={({focused, route}) => (
                <Text
                  style={{
                    color: focused ? '#FFFFFF' : '#233B5D',
                    fontWeight: '500',
                    fontSize: moderateScale(17),
                    fontFamily: 'HacenMaghrebBd',
                  }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={{backgroundColor: '#42B5D0', height: '100%'}}
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                width: '90%',
                elevation: 0,
                borderRadius: 5,
              }}
            />
          )}
          onIndexChange={setIndex}
          renderScene={renderScene}
          initialLayout={{width: width}}
        />
      </View>
    </View>
  );
}
