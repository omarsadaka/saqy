import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import Information from './Information/Information';
import Products from './Products/Products';
import {useDispatch, useSelector} from 'react-redux';
import Rates from './Rates/Rates';
import {CheckActiveUserAction} from '../../redux/Location/Actions';
const {width, height} = Dimensions.get('window');

export default function WaterItemDetails({navigation, route}) {
  const dispatch = useDispatch();
  const {companyId, guest, title} = route.params;
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    {key: 'Rates', title: 'تقييمات'},
    {key: 'Products', title: 'المنتجات'},
    {key: 'Information', title: 'بيانات'},
  ]);

  useEffect(() => {
    if (!guest) dispatch(CheckActiveUserAction(navigation));
  }, []);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Information':
        return <Information companyId={companyId} guest={guest} />;
      case 'Products':
        return <Products companyId={companyId} guest={guest} />;
      case 'Rates':
        return <Rates companyId={companyId} guest={guest} />;
      default:
        return null;
    }
  };

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <Header
        height={height / 4.5}
        showBackBtn={true}
        showCartIcon={!guest}
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
