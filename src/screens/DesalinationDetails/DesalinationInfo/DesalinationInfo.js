import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import NestleLogo from '../../../../assets/nestle_logo';
import { moderateScale } from '../../../utils/moderateScale';
import { getCompanyInfoAction } from '../../../redux/CompanyDetails/Actions';
import Loading from '../../../components/Loading/Loading';
import ShareIcon from '../../../../assets/share_icon';
import LoveIcon from '../../../../assets/love_icon';
import LovedIcon from '../../../../assets/loved_icon';
import PhoneNumberIcon from '../../../../assets/phone_number_icon';
import EmailIcon from '../../../../assets/email_icon';
import WebsiteIcon from '../../../../assets/website_icon';
import style from './DesalinationInfoStyle';
import { addItemToFavoritesAction } from '../../../redux/Favorites/Actions';


const { width, height } = Dimensions.get('window');


export default function DesalinationInfo({ companyId, guest }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyInfoAction(companyId))
        setLoading(false)
    }, [])

    const { companyInfoLoading, companyInfo, companyInfoFail } = useSelector(state => state.companyInfo);
    const { addToFavoriteLoading, addedToFavroites, addedToFavroitesFail, itemLiked } = useSelector(state => state.favroites);
    const [loading, setLoading] = useState(true);

    const InformationEmpty = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا يوجد معلومات عن الشركة</Text>
        </View>
    )

    console.log('companyInfoDeselation: ', companyInfo)
    return (
        companyInfoLoading|| loading ? <Loading /> :
            !companyInfo? InformationEmpty() :
                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: height }}>
                    <View style={{ width: '90%', alignItems: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 },marginTop:height*0.02, paddingVertical: height*0.02 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row-reverse'}}>
                            <View style={style.imageContainer}>
                                <Image source={{uri: companyInfo.logo}} style={{width:'100%',height: height*0.1}} resizeMode='contain'/>
                            </View>
                            <View style={{flex:1 }}>
                            <View style={{ width: '100%',  alignItems: 'center', flexDirection: 'row-reverse', }}>
                                    <PhoneNumberIcon />
                                    <Text style={{marginHorizontal: width*0.03}}>{`${companyInfo?.user?.mobile} :`}</Text>
                                </View>
                                <View style={{ width: '100%',  alignItems: 'center', flexDirection: 'row-reverse' }}>
                                    <EmailIcon />
                                    <Text style={{marginHorizontal: width*0.03}}>{`${companyInfo?.user?.email} :`}</Text>
                                </View>
                                {companyInfo?.location?
                                 <View style={{ width: '100%',  alignItems: 'center', flexDirection: 'row-reverse' }}>
                                 <WebsiteIcon />
                                 <Text style={{marginHorizontal: width*0.03, fontSize: moderateScale(11)}}>{`${companyInfo?.location} :`}</Text>
                                </View>
                                :null}
                               
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center',marginTop: height*0.01}}>
                            <Text style={{width: '95%', textAlign: 'right', marginHorizontal: 8, fontSize: moderateScale(15), color: '#000000'}}>{`${companyInfo?.user?.name}`}</Text>
                            <Text style={{width: '95%', textAlign: 'right', marginHorizontal: 8, fontSize: moderateScale(15), color: '#000000',marginTop:4}}>{`${companyInfo?.bio}`}</Text>
                        </View>
                    </View>
                    <View style={{ width: '90%', flex:1, borderRadius: 10, overflow: 'hidden', alignItems: 'center', marginVertical: '5%' }}>
                        <MapView
                            style={{ width: '100%', height: '100%', flex: 1 }}
                            onRegionChange={e => console.log('region change: ', e)}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: companyInfo.user.lat?Number(companyInfo.user.lat):36.1122,
                                longitude: companyInfo.user.lng?Number(companyInfo.user.lng):31.1233,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <Marker
                                coordinate={{
                                    latitude: companyInfo.user.lat?Number(companyInfo.user.lat):36.1122,
                                    longitude: companyInfo.user.lng?Number(companyInfo.user.lng):31.1233,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }} tracksViewChanges={false}>
                                <Callout style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} tooltip={true}>
                                    <View style={{ width: width / 1.3, height: height / 7, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFFFFF', borderRadius: 10, opacity: 0.88 }}>
                                        <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <PhoneNumberIcon />
                                            <Text style={{marginHorizontal: width*0.02}}>{`: ${companyInfo?.user?.mobile}`}</Text>
                                        </View>
                                        <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                            <EmailIcon />
                                            <Text style={{marginHorizontal: width*0.02}}>{`: ${companyInfo?.user?.email}`}</Text>
                                        </View>
                                        {companyInfo?.location?
                                        <View style={{ width: '90%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                        <WebsiteIcon />
                                        <Text style={{marginHorizontal: width*0.02}}>{`: ${companyInfo?.location}`}</Text>
                                        </View>
                                        :null}
                                        
                                    </View>
                                </Callout>
                            </Marker>
                        </MapView>
                        <View style={{ position: 'absolute', left: 0, flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <ShareIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                             onPress={() => guest ? showMessage({ message: 'ليس لديك الصلاحية كزائر', backgroundColor: '#FF6F61' }) : dispatch(addItemToFavoritesAction(companyId))}>
                                {companyInfo.add_to_my_fav==1 ?<LovedIcon /> : <LoveIcon />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
    )
}