import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import style from './CustomTextInputStyle';
import PhoneIcon from '../../../assets/phone_icon';
import {Icon } from 'react-native-elements';


export default function CustomTextInput({
    HeadLine,
    icon,
    clickable,
    secureTextEntry,
    reference,
    returnKeyType,
    returnKeyLabel,
    blurOnSubmit,
    onSubmitEditing,
    keyboardType,
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    multiline,
    textAlignVertical,
    additionalStyle,
    numberOfLines,
    addtionalContainerStyle
}) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={style.container}>
            <View style={style.childContainer}>
                <Text style={style.headLineStyle}>{HeadLine}</Text>
                <View style={[{ width: '100%', alignItems: 'center' }, addtionalContainerStyle]}>
                    <TextInput
                        ref={reference}
                        returnKeyType={returnKeyType}
                        returnKeyLabel={returnKeyLabel}
                        blurOnSubmit={blurOnSubmit}
                        style={[style.textInputStyle, additionalStyle]}
                        secureTextEntry={secureTextEntry ? !showPassword : showPassword}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        multiline={multiline}
                        textAlignVertical={textAlignVertical}
                        numberOfLines={numberOfLines}
                        value={value}
                    />
                    {
                        clickable ?
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={style.iconContainer}>
                                {showPassword?
                                <Icon
                                 name={'eye-outline'}
                                 type="ionicon"
                                 size={25}
                                 color={'black'}/>
                                :icon}
                            </TouchableOpacity> :
                            <View style={style.iconContainer}>
                                {icon}
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}