import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import style from './CodeInputStyle';


export default function CodeInput({ onChangeText, value, setValue, Navigation }) {

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const ref = useBlurOnFulfill({ value, cellCount: 4 });

    return (
        <SafeAreaView style={[style.root]}>
            <CodeField
                ref={ref}
                {...props}
                //key={value}
                value={value}
                onChangeText={onChangeText}
                autoFocus={true}
                blurOnSubmit={true}
                cellCount={4}
                returnKeyType="done"
                rootStyle={style.codeFieldRoot}
                textInputStyle={{ textAlign: 'center', textAlignVertical: 'center' }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                //caretHidden={false}
                //selection={{start: 0, end: 0}}
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[style.cell, isFocused && style.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    )
}