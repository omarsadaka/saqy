import React, { useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import NestleLogo from '../../../assets/nestle_logo';
import { moderateScale } from '../../utils/moderateScale';
import RateStar from '../../../assets/rate_star';
import LoveIcon from '../../../assets/love_icon';
import LocationIcon from '../../../assets/location_icon';
import LikedIcon from '../../../assets/liked_icon';
import style from './FavoritesStyle';
import { getAllFavroitesAction, removeItemToFavoritesAction} from '../../redux/Favorites/Actions';

const { width, height } = Dimensions.get('window');


export default function Favorites({ navigation }) {

    const dispatch = useDispatch();

    const { favoritesLoading, favorites } = useSelector(state => state.favroites);

    useEffect(() => {
        dispatch(getAllFavroitesAction())
    }, [])

    console.log("favorites: ", favorites)

    const RenderItem = ({ data: { id, provider } }) => (
        <TouchableOpacity style={{ width: '100%', height: height * 0.2, alignItems: 'center', borderRadius: 5, backgroundColor: '#FFFFFF', marginTop: '3%', justifyContent:'center' }}
        onPress={()=> {}}>
            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row-reverse', justifyContent:'center' }}>
                <View style={style.imageContainer}>
                    <Image source={{uri: provider.logo}} style={{width:'100%',height: height*0.09}} resizeMode='contain' />
                </View>
                <View style={{ flex:1, height: '90%',alignItems:'center',justifyContent:'center' }}>
                    <Text style={{ textAlign: 'right', textAlignVertical: 'center', width: '100%', paddingHorizontal: 8, fontSize: moderateScale(16), color: '#000000',fontFamily: 'HacenMaghrebBd' }} numberOfLines={2}>{provider.user.name}</Text>
                    <Text style={{ textAlign: 'right', textAlignVertical: 'center', width: '100%', paddingHorizontal: 8, fontSize: moderateScale(16), color: '#000000',fontFamily: 'HacenMaghrebBd' }} numberOfLines={2}>{provider.bio}</Text>
                    <View style={style.locationContainer}>
                        <LocationIcon />
                        <Text style={style.location}>{`تبعد ${provider.distance?provider.distance:'?'} كم`}</Text>
                    </View> 
                </View>
                <View style={{height:'80%',alignItems:'center',justifyContent:'space-between'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                    <Text style={{textAlign: 'left', textAlignVertical: 'center', paddingHorizontal: 2, fontSize: moderateScale(15), color: '#363636',fontFamily: 'HacenMaghrebBd'}}>{`(${provider.total_provider_rates})`}</Text>
                        <Text style={{ textAlign: 'left', textAlignVertical: 'center', paddingHorizontal: 2, fontSize: moderateScale(15), color: '#363636',fontFamily: 'HacenMaghrebBd' }}>{provider.reviews?provider.reviews:'0'}</Text>
                        <RateStar />
                    </View> 

                    <TouchableOpacity onPress={() => {
                        dispatch(removeItemToFavoritesAction(id))
                        }} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <LikedIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            <Header height={height / 8} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle="المفضلة" />
            {favoritesLoading ? <Loading /> : <View style={{ width: '95%'}}>
                <FlatList
                    data={favorites}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    contentContainerStyle={[ { flexGrow: 1 } , favorites?.data ? null : { justifyContent: 'center'} ]}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>ليس لديك اى مفضلات</Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                          colors={['blue','gray']}
                          refreshing={favoritesLoading}
                          onRefresh={()=> dispatch(getAllFavroitesAction())} />
                        }
                />
            </View>}
        </View>
    )
}