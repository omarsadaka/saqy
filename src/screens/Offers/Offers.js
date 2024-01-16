import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import Water from './Water';
import Tanks from './Tanks';
import {CheckActiveUserAction} from '../../redux/Location/Actions';
const {width, height} = Dimensions.get('window');

export default function Offers({navigation, route}) {
  const {Type} = route.params;
  useEffect(() => {
    dispatch(CheckActiveUserAction(navigation));
  }, []);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(Type == 1 ? 1 : 0);
  const [routes] = useState([
    {key: 'Tanks', title: 'الخزانات'},
    {key: 'Water', title: 'المياة'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Water':
        return <Water navigation={navigation} />;
      case 'Tanks':
        return <Tanks navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
      <Header
        height={height / 4.5}
        hideBackgroundImage={false}
        showBackBtn={true}
        showCartIcon={true}
        onCartIconPressed={() => navigation.navigate('Cart')}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'العروض'}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 5,
          right: 0,
          left: 0,
          height: '77%',
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
