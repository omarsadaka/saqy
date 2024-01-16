import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import style from './CustomTextInputStyle';
import PhoneIcon from '../../../assets/phone_icon';


export default function CustomTextInput({
    Icon,
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
                <View style={[{ alignItems: 'center' }, addtionalContainerStyle]}>
                    <TextInput
                        ref={reference}
                        returnKeyType={returnKeyType}
                        returnKeyLabel={returnKeyLabel}
                        blurOnSubmit={blurOnSubmit}
                        style={[style.textInputStyle]}
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
                                {Icon}
                            </TouchableOpacity> :
                            <View style={style.iconContainer}>
                                {Icon}
                            </View>
                    }
                </View>
           
    )
}