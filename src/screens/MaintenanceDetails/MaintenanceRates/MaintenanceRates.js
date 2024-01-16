import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { moderateScale } from '../../../utils/moderateScale';
import Avatar from '../../../../assets/avatar';

const { width, height } = Dimensions.get('window');

export default function MaintenanceRates({ navigation }) {

    const RenderItem = ({ data: { name, comment, rate } }) => (
        <View style={{ width: '95%', height: height * 0.18, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 5, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#233B5D', shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 } }}>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '100%' }}>
                <View style={{ alignItems: 'flex-start', height: '60%', justifyContent: 'center', width: '30%' }}>
                    <Avatar />
                </View>
                <View style={{ width: '100%', justifyContent: 'space-around', height: '100%' }}>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '85%' }}>{name}</Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <AirbnbRating showRating={false} defaultRating={4} starContainerStyle={{ flexDirection: 'row-reverse' }} count={5} isDisabled={true} size={15} />
                        <Text>4.9 </Text>
                    </View>
                    <View style={{ width: '98%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ textAlign: 'right', textAlignVertical: 'center', paddingHorizontal: 8, fontSize: moderateScale(15), color: '#000000', width: '90%' }}>{comment}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: '#233B5D', fontSize: moderateScale(25) }}>4.4</Text>
            </View>
            <View style={{ width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center' }}>
                <AirbnbRating showRating={false} starImage={require('../../../../assets/star.png')} defaultRating={5} ratingCount={5} isDisabled={true} size={25} />
            </View>
            <View style={{ width: '95%', height: '70%' }}>
                <FlatList
                    data={[{ id: 1, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 2, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 3, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 }, { id: 4, name: 'المعرف', comment: 'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم', rate: 4.9 },]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RenderItem data={item} />}
                />
            </View>
        </View>
    )
}