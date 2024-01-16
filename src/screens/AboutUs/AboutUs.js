import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import { moderateScale } from '../../utils/moderateScale';
import axios from 'axios';
import { baseURL } from '../../utils/BaseURL';
import HTML from 'react-native-render-html';
import Loading from '../../components/Loading/Loading';
const { width, height } = Dimensions.get('window');
import { User } from '../../components/api/UserUtilities';
import WebView from 'react-native-webview';

export default function AboutUs({ navigation }) {
    const [body, setBody]= useState(null)
    const [loading, setLoading]= useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData=()=>{
        User.about_us().then(res=>{
            // console.log('about_us', JSON.stringify(res))
            setLoading(false)
            if(res.data){
                setBody(res.data.body)
            }
           }).catch(err=>{
            setLoading(false)
             console.log(err)
           })
    }

    const renderWebView=()=>{
        return(
          <WebView
            source={{ uri: 'http://saqiest.com/about_us' }}
            scrollEnabled={true}
            style={styles.web_view}
          />
        )
      }

    return (
        <View style={styles.container}>
            <Header height={height / 8} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.goBack()} headerTitle={"من نحن"} />
            {loading? <Loading/>:
              // <HTML source={{ html: body }}/> 
              renderWebView()
          }
        </View>
    )
}
const styles = StyleSheet.create({
     container:{
        width: '100%', height: '100%',
         alignItems: 'center',
          backgroundColor: '#FFF' 
     },
     view:{
        width: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width*0.05 
     },
     web_view:{
        width: width,
        marginTop: height*0.01
      }
  });