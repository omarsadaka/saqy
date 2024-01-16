import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import DesalinationInfo from './DesalinationInfo/DesalinationInfo';
import ServiceRequest from './ServiceRequest/ServiceRequest';
import DesalinationRates from './DesalinationRates/DesalinationRates';

const {width, height} = Dimensions.get('window');

export default function DesalinationDetails({navigation, route}) {
  const {companyId, title, guest, serviceID} = route.params;
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    {key: 'DesalinationRates', title: 'التقيمات'},
    {key: 'ServiceRequest', title: 'طلب خدمة'},
    {key: 'DesalinationInfo', title: 'بيانات'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'DesalinationInfo':
        return <DesalinationInfo companyId={companyId} guest={guest} />;
      case 'ServiceRequest':
        return (
          <ServiceRequest
            navigation={navigation}
            companyId={companyId}
            guest={guest}
            serviceID={serviceID}
          />
        );
      case 'DesalinationRates':
        return <DesalinationRates companyId={companyId} />;
      default:
        return null;
    }
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
        height={height / 4}
        showBackBtn={true}
        onCartIconPressed={() => navigation.navigate('Cart')}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={index == 0 ? 'التقيمات' : title}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: '75%',
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
