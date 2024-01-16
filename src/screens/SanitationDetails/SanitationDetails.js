import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import SanitationInfo from './SanitationInfo/SanitationInfo';
import SanitationServiceRequest from './SanitationServiceRequest/SanitationServiceRequest';
import SanitationRates from './SanitationRates/SanitationRates';

const {width, height} = Dimensions.get('window');

export default function WaterItemDetails({navigation, route}) {
  const {companyId, guest, title, serviceID} = route.params;
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    {key: 'SanitationRates', title: 'تقيمات'},
    {key: 'SanitationServiceRequest', title: 'طلب خدمة'},
    {key: 'SanitationInfo', title: 'بيانات'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'SanitationInfo':
        return <SanitationInfo navigation={navigation} companyId={companyId} />;
      case 'SanitationServiceRequest':
        return (
          <SanitationServiceRequest
            navigation={navigation}
            companyId={companyId}
            guest={guest}
            serviceID={serviceID}
          />
        );
      case 'SanitationRates':
        return (
          <SanitationRates navigation={navigation} companyId={companyId} />
        );
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
