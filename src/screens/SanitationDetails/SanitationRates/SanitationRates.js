import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { moderateScale } from '../../../utils/moderateScale';
import Avatar from '../../../../assets/avatar';
import { getCompanyRatesAction } from '../../../redux/CompanyDetails/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';

const { width, height } = Dimensions.get('window');

export default function SanitationRates({ companyId }) {
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
    const RenderItem = ({ data: { id, user, rate, comment } }) => (
        <View style={{ width: '95%', height: height * 0.18, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 } }}>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '100%' }}>
                <View style={{ alignItems: 'center', height: '60%', justifyContent: 'center', width: '20%' }}>
                    <Avatar />
                </View>
                <View style={{ flex:1,  height: '100%' }}>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '85%' }}>{user.name}</Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <AirbnbRating showRating={false} defaultRating={rate} starContainerStyle={{ flexDirection: 'row-reverse' }} count={5} isDisabled={true} size={15} />
                        <Text>{rate} </Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '90%' }} numberOfLines={3}>{comment}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#233B5D', fontSize: moderateScale(25) }}>{rate?rate:'0'}</Text>
            </View>
            <View style={{ width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center' }}>
                <AirbnbRating showRating={false} starImage={require('../../../../assets/star.png')} defaultRating={rate?rate:0} ratingCount={5} isDisabled={true} size={25} />
            </View>
            <View style={{ width: '95%', height: '70%' }}>
            {companyRatesLoading ? <Loading /> :
                <FlatList
                    data={companyRates.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    ListEmptyComponent={() => (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا يوجد تعليقات على الشركة</Text>
                     </View>
                    )}
                />
            }
            </View>
        </View>
    )
}