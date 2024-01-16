import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from './CustomButtonStyle';

export default function CustomButton({
  Loading,
  BtnTitle,
  onPress,
  LinearGradientColors,
  borderRadius,
  additionalStyle,
  fontColor,
}) {
  return (
    <View style={style.container}>
      {LinearGradientColors ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            style.btnStyle,
            {borderRadius: borderRadius},
            additionalStyle,
          ]}>
          <LinearGradient
            colors={LinearGradientColors}
            end={{x: 0.0, y: 1.0}}
            start={{x: 1.0, y: 0.0}}
            style={{
              height: '100%',
              justifyContent: 'center',
              borderRadius: borderRadius,
              width: '100%',
              borderWidth: 1,
              borderColor: '#1579BB',
            }}>
            {Loading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Text style={style.btnTextStyle}>{BtnTitle}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[
            {borderRadius: borderRadius},
            style.btnStyle,
            additionalStyle,
          ]}>
          {Loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text
              style={[
                style.btnTextStyle,
                {color: fontColor ? fontColor : '#FFFFFF'},
              ]}>
              {BtnTitle}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
