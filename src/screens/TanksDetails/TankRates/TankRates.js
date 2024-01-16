import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions,RefreshControl } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { moderateScale } from '../../../utils/moderateScale';
import { getCompanyRatesAction } from '../../../redux/CompanyDetails/Actions';
import Avatar from '../../../../assets/avatar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';

const { width, height } = Dimensions.get('window');

export default function TankRates({ companyId }) {

    const dispatch = useDispatch();

    const { companyRatesLoading, companyRates, companyRatesFail } = useSelector(state => state.companyInfo);
    const [ rate, setRate]= useState(null)
    useEffect(() => {
        dispatch(getCompanyRatesAction(companyId))
        if(companyRates.data){
            setRate(companyRates?.data[0]?.provider.reviews)
           }
    }, [])

    console.log('companyRates: ', companyRates.data)
    

    // const RenderItem = ({ data: { name, opinion, stars } }) => (
    //     <View style={{ width: '95%', height: height * 0.18, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 } }}>
    //         <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '100%' }}>
    //             <View style={{ alignItems: 'flex-start', height: '60%', justifyContent: 'center', width: '30%' }}>
    //                 <Avatar />
    //             </View>
    //             <View style={{ width: '100%', justifyContent: 'space-around', height: '100%' }}>
    //                 <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
    //                     <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '85%' }}>{"المعرف"}</Text>
    //                 </View>
    //                 <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
    //                     <AirbnbRating showRating={false} defaultRating={stars} starContainerStyle={{ flexDirection: 'row-reverse' }} count={5} isDisabled={true} size={15} />
    //                     <Text>{stars} </Text>
    //                 </View>
    //                 <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
    //                     <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '90%' }}>{opinion}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     </View>
    // )

    // return (
    //     <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
    //         {!companyRates?.data?.reviews.length ? null : <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
    //             <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#233B5D', fontSize: moderateScale(25) }}>{Math.floor(companyRates?.data?.rate[0].rating)}</Text>
    //         </View>}
    //         {!companyRates?.data?.reviews.length ? null : <View style={{ width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center' }}>
    //             <AirbnbRating showRating={false} defaultRating={Math.floor(companyRates?.data?.rate[0].rating)} ratingCount={5} isDisabled={true} size={25} />
    //         </View>}
    //         {
    //             companyRatesLoading ? <Loading /> :
    //                 !Object.keys(companyRates).length ? InformationEmpty() :
    //                     <View style={{ width: '95%', height: '70%' }}>
    //                         <FlatList
    //                             data={!companyRates?.data?.reviews.length ? [] : companyRates?.data?.reviews}
    //                             //data={[{ id: 1, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 2, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 3, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 4, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 },]}
    //                             keyExtractor={item => item.id}
    //                             renderItem={({ item }) => <RenderItem data={item} />}
    //                             contentContainerStyle={[{ flexGrow: 1 }, companyRates.data ? null : { justifyContent: 'center' }]}
    //                             ListEmptyComponent={() => (
    //                                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                                     <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا يوجد تعليقات على الشركة</Text>
    //                                 </View>
    //                             )}
    //                         />
    //                     </View>
    //         }
    //     </View>
    // )

    const RenderItem = ({ data: { id, user, rate, comment } }) => (
        <View style={{ width: '95%', height: height * 0.18, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 } }}>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '100%' }}>
                <View style={{ alignItems: 'flex-start', height: '60%', justifyContent: 'center', width: '30%' }}>
                    <Avatar />
                </View>
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '85%' }}>{user.name}</Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <AirbnbRating showRating={false} defaultRating={rate} starContainerStyle={{ flexDirection: 'row-reverse' }} count={5} isDisabled={true} size={15} />
                        <Text>{rate} </Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '90%' }}numberOfLines={3}>{comment}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#233B5D', fontSize: moderateScale(25) }}>{rate? rate:'0'}</Text>
            </View>
            <View style={{ width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center' }}>
                <AirbnbRating showRating={false} starImage={require('../../../../assets/star.png')} defaultRating={rate?rate:'0'} ratingCount={5} isDisabled={true} size={25} />
            </View>
            <View style={{ width: '95%', height: '70%' }}>
                <FlatList
                     data={companyRates.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                           <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا يوجد تعليقات على الشركة</Text>
                       </View>
                      )}
                      refreshControl={
                        <RefreshControl
                          colors={['blue','gray']}
                          refreshing={companyRatesLoading}
                          onRefresh={()=>{
                            dispatch(getCompanyRatesAction(companyId))
                           if(companyRates.data){
                             setRate(companyRates?.data[0]?.provider.reviews)
                            }
                          }} />
                        }
                />
            </View>
        </View>
    )
}