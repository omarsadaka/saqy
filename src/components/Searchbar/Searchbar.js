import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import style from './SearchbarStyle';
import SearchIcon from '../../../assets/search_icon';
import FilterIcon from '../../../assets/filter_icon';

export default function Searchbar({ returnKeyType, returnKeyLabel, blurOnSubmit, onChangeText, value, disabled, onSearchPressed, onFilterPressed }) {
    return (
        <View style={style.container}>
            <View style={style.childContainer}>
                <TextInput
                    placeholder={"بحث"}
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    returnKeyLabel={returnKeyLabel}
                    blurOnSubmit={blurOnSubmit}
                    style={style.textInputStyle} />
                <TouchableOpacity onPress={onSearchPressed} disabled={disabled} style={style.searchIconContainer}>
                    <SearchIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={onFilterPressed} disabled={disabled} style={style.filterIconContainer}>
                    <FilterIcon />
                </TouchableOpacity>
            </View>
        </View>
    )
}