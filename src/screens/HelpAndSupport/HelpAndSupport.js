import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import Header from '../../components/Header/Header';
import { moderateScale } from '../../utils/moderateScale';
const { width, height } = Dimensions.get('window');
import Loading from '../../components/Loading/Loading';
import { User } from '../../components/api/UserUtilities';
import {Icon} from 'react-native-elements';

export default function HelpAndSupport({ navigation }) {
    const [data, setData]= useState([])
    const [loading, setLoading]= useState(true)
    useEffect(() => {
        loadData()
    }, [])

    const loadData=()=>{
        User.faq().then(res=>{
            console.log('faq', JSON.stringify(res))
            setLoading(false)
            if(res.status){
                setData(res.data)
            }
           }).catch(err=>{
             console.log(err)
             setLoading(false)
           })
    }

    const RenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Faq',{Item: item})} style={styles.item}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'chevron-left'} type="feather" size={width*0.035} color={'#000000'}/>
            <Text style={styles.title}>{item.question}</Text>
        </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Header height={height / 7} top={height*0.05} showBackBtn={true} onBackButtonPressed={() => navigation.pop()} headerTitle={'الدعم والمساعدة'} />
            {loading? <Loading/>:
            <View style={styles.view}>
            <Text style={styles.title0}> كيف نقدر نساعدك؟</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
                contentContainerStyle={[{ flexGrow: 1 }, data ? null : { justifyContent: 'center' }]}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', width: '100%', color: '#000000', fontSize: moderateScale(18), fontFamily: 'HacenMaghrebBd' }}>لا توجد عناصر فى الوقت الحالى</Text>
                     </View>
                )}
                />
            </View>
            }
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width: width, height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF' 
     },
     view:{
        width: width, 
        marginTop: height*0.1,
        justifyContent: 'center',
        alignItems: 'center',
     },
     title:{
        flex:1,marginHorizontal: width*0.02,
        fontSize: height*0.022,
        color: '#000000',
        textAlign:'right',
        fontFamily: 'HacenMaghrebBd'
      },
      title0:{
        fontSize: height*0.022,
        color: '#000000',
        textAlign:'center',
        fontFamily: 'HacenMaghrebBd'
      },
      item:{
        width: width*0.9,
        justifyContent: 'center',
        alignItems: 'center', borderRadius: 5,
        backgroundColor: '#FFFFFF',
        elevation:2 , shadowOpacity:0.2,
        marginVertical: height*0.01,marginHorizontal:2,
        paddingVertical: height*0.015
      }
  });