import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../utils/moderateScale';
import Header from '../../components/Header/Header';
import MaintenanceInfo from './MaintenanceInfo/MaintenanceInfo';
import MaintenanceServiceRequest from './MaintenanceServiceRequest/MaintenanceServiceRequest';
import MaintenanceRates from './MaintenanceRates/MaintenanceRates';

const { width, height } = Dimensions.get('window');

export default function MaintenanceDetails({ navigation }) {

    const [index, setIndex] = useState(2);
    const [routes] = useState([
        { key: 'MaintenanceRates', title: 'تقيمات' },
        { key: 'MaintenanceServiceRequest', title: 'طلب خدمة' },
        { key: 'MaintenanceInfo', title: 'بيانات' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'MaintenanceInfo':
                return <MaintenanceInfo navigation={navigation} />;
            case 'MaintenanceServiceRequest':
                return <MaintenanceServiceRequest navigation={navigation} />;
            case 'MaintenanceRates':
                return <MaintenanceRates navigation={navigation} />;
            default:
                return null;
        }
    };

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <Header height={height / 4} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle={index == 0 ? "التقيمات" : "قسم الصيانة"} />
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: '75%' }}>
                <TabView
                    navigationState={{ index, routes }}
                    swipeEnabled={false}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            renderLabel={({ focused, route }) => <Text style={{ color: focused ? "#FFFFFF" : "#233B5D", fontWeight: '500', fontSize: moderateScale(17) }}>{route.title}</Text>}
                            indicatorStyle={{ backgroundColor: '#42B5D0', height: '100%' }}
                            style={{ backgroundColor: '#FFFFFF', alignSelf: 'center', width: '90%', elevation: 0, borderRadius: 5 }} />
                    }
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                    initialLayout={{ width: width }} />
            </View>
        </View>
    )
}