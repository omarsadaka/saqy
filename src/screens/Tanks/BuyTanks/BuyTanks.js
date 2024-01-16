import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, RefreshControl, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import { moderateScale } from '../../../utils/moderateScale';
import SearchFilterIcon from '../../../../assets/search_filter_icon';
import NestleLogo from '../../../../assets/nestle_logo';
import LocationIcon from '../../../../assets/location_icon';
import RateStar from '../../../../assets/rate_star';
import { getAllCompaniesAction } from '../../../redux/TankProvidersBySubCat1/Actions';
const { width, height } = Dimensions.get('window');
import style from './BuyTanksStyle';

export default function BuyTanks({ navigation, fall, bottomSheetRef, subCat, title, guest }) {

    const dispatch = useDispatch();

    const { companiesTankBySubCatLoading1, companiesTankBySubCat1 } = useSelector(state => state.TankProviderBySubCat1);


    useEffect(() => {
            dispatch(getAllCompaniesAction(subCat));
    }, [navigation])

    console.log("BuyTanks: ", companiesTankBySubCat1?.data)

    const RenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("TankDetails", { companyId: item.id, guest: guest, title: title })} style={style.itemContainer}>
            <View style={style.viewContaier}>
                <View style={style.imageContainer}>
                    {/* <NestleLogo /> */}
                    <Image source={{uri: item.logo}} style={{width:'100%',height: height*0.09}} resizeMode='contain' />
                </View>
                <View style={style.infoContainer}>
                    <View style={style.infoContainer2}>
                        <Text style={style.name} numberOfLines={2}>{item.user.name}</Text>
                         <View style={style.rateContainer}>
                         <Text style={style.rate}>{`(${item.total_provider_rates})`}</Text>
                            <Text style={style.rate}>{item.reviews}</Text>
                            <RateStar />
                        </View> 
                    </View>
                     <View style={style.locationContainer}>
                        <LocationIcon />
                        <Text style={style.location}>{`تبعد ${item.distance?item.distance:'?'} كم`}</Text>
                    </View> 
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
         <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '3%' }}>
                <TouchableOpacity onPress={() => bottomSheetRef.current.snapTo(1)}>
                    <SearchFilterIcon />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: moderateScale(16), color: '#233B5D', fontFamily: 'HacenMaghrebBd' }}>تصفية نتائج البحث</Text>
            </View>
            {companiesTankBySubCatLoading1 ? <Loading /> : <View style={{ width: '90%', height: '85%' }}>
                <FlatList
                    data={companiesTankBySubCat1.data}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[ { flexGrow: 1 } , companiesTankBySubCat1?.data ? null : { justifyContent: 'center'} ]}
                    ListEmptyComponent={() => (
                        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: moderateScale(18), color: '#000000', fontFamily: 'HacenMaghrebBd' }}>لا يوجد بيانات فى الوقت الحالى</Text>
                        </View>
                    )}
                    renderItem={RenderItem}
                    refreshControl={
                        <RefreshControl
                          colors={['blue','gray']}
                          refreshing={companiesTankBySubCatLoading1}
                          onRefresh={()=> dispatch(getAllCompaniesAction(subCat))} />
                        }
                />
            </View>}
        </View>
    )
}