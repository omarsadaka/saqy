import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import NestleLogo from '../../../../assets/nestle_logo';
import { moderateScale } from '../../../utils/moderateScale';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyInfoAction } from '../../../redux/CompanyDetails/Actions';
import Loading from '../../../components/Loading/Loading';
import ShareIcon from '../../../../assets/share_icon';
import LoveIcon from '../../../../assets/love_icon';
import PhoneNumberIcon from '../../../../assets/phone_number_icon';
import EmailIcon from '../../../../assets/email_icon';
import WebsiteIcon from '../../../../assets/website_icon';


const { width, height } = Dimensions.get('window');


export default function MaintenanceInfo({ navigation }) {

    const dispatch = useDispatch();

    const { companyInfoLoading, companyInfo, companyInfoFail } = useSelector(state => state.companyInfo);

    useEffect(() => {
        dispatch(getCompanyInfoAction(13))
    }, [])

    return (
        companyInfoLoading ? <Loading /> :
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: height }}>
                <View style={{ width: '90%', height: height * 0.18, alignItems: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 } }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <View style={{ alignItems: 'flex-start', width: '40%' }}>
                            <NestleLogo />
                        </View>
                        <View style={{ width: '100%', justifyContent: 'space-around', height: '75%' }}>
                            <View style={{ width: '100%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '85%' }}>نستله ‏ هي شركة متعددة الجنسيات متخصصة في إنتاج الأطعمة المعلبة أسست في فيفي في سويسرا</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '90%', height: '75%', borderRadius: 10, overflow: 'hidden', alignItems: 'center', marginTop: '5%' }}>
                    <MapView
                        style={{ width: '100%', height: '100%', flex: 1 }}
                        onRegionChange={e => console.log('region change: ', e)}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: companyInfo?.data?.location?.coordinates[0],
                            longitude: companyInfo?.data?.location?.coordinates[1],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker
                            coordinate={{
                                latitude: companyInfo?.data?.location?.coordinates[0],
                                longitude: companyInfo?.data?.location?.coordinates[1],
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }} tracksViewChanges={false}>
                            <Callout style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} tooltip={true}>
                                <View style={{ width: width / 1.5, height: height / 5, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFFFFF', borderRadius: 10, opacity: 0.88 }}>
                                    <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                        <PhoneNumberIcon />
                                        <Text>{`: ${companyInfo?.data?.mobileNumber}`}</Text>
                                    </View>
                                    <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                        <EmailIcon />
                                        <Text>{`: ${companyInfo?.data?.email}`}</Text>
                                    </View>
                                    <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                        <WebsiteIcon />
                                        <Text>{`: ${companyInfo?.data?.website}`}</Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>
                    <View style={{ position: 'absolute', left: 0, flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <ShareIcon />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <LoveIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    )
}