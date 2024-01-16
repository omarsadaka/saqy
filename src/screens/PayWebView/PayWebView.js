import React, { useState, useContext , useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header/Header';
const { width, height } = Dimensions.get('window');

export default function PayWebView({ navigation, route }) {
    const { Link } = route.params;
  useEffect(() => {
  }, []);

  
  const renderWebView=()=>{
    return(
      <WebView
			source={{ uri: Link }}
			scrollEnabled={true}
      style={styles.web_view}
      />
    )
  }
  return (
    <View style={styles.container}>
        <Header height={height / 7} hideBackgroundImage={true} showBackBtn={true} onBackButtonPressed={() => navigation.navigate('Home')} headerTitle={"الدفع الإلكترونى"} />
       {renderWebView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    paddingBottom: height*0.02,
  },
  web_view:{
    width:width*0.95,
    marginTop:height*0.02
  }
});

