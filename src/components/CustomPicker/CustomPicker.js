import React from 'react';
import {View, Text, Platform, Picker} from 'react-native';
//import { Picker } from '@react-native-picker/picker';
import RNPicker from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './CustomPickerStyle';
import {moderateScale} from '../../utils/moderateScale';

function CustomPicker({
  onValueChange,
  selectedValue,
  PickerData,
  key,
  additionalStyle,
  additionalPickerStyle,
  placeholder,
  HeadLine,
}) {
  if (Platform.OS === 'ios') {
    return (
      <View style={[style.container, additionalStyle]}>
        <View style={style.childContainer}>
          <Text style={style.headLineStyle}>{HeadLine}</Text>
          <View style={[style.pickerParentStyle, additionalPickerStyle]}>
            <RNPicker
              placeholder={placeholder}
              style={{
                width: '100%',
                inputIOS: {
                  fontSize: moderateScale(18),
                  fontFamily: 'HacenMaghrebBd',
                  paddingHorizontal: 25,
                },
              }}
              onValueChange={onValueChange}
              fixAndroidTouchableBug={true}
              value={selectedValue}
              items={
                PickerData &&
                PickerData.map(item => ({value: item.value, label: item.label}))
              }
              Icon={() => (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="sort-down"
                    size={20}
                    color="grey"
                    style={[{right: 10, top: -4, position: 'absolute'}]}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[style.container, additionalStyle]}>
        <View style={style.childContainer}>
          <Text style={style.headLineStyle}>{HeadLine}</Text>
          <View style={[style.pickerParentStyle, additionalPickerStyle]}>
            <Picker
              mode="dropdown"
              style={{width: '100%'}}
              onValueChange={onValueChange}
              selectedValue={selectedValue}>
              {PickerData &&
                PickerData.map((item, index) => (
                  <Picker.Item
                    key={index}
                    value={item.value}
                    label={item.label}
                  />
                ))}
            </Picker>
            <Text
              style={{
                width: '100%',
                height: 60,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}>
              {' '}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default CustomPicker;
