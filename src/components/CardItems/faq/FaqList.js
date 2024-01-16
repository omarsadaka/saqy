/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import CustomList from '../../CustomList/CustomList';
import FaqItem from './FaqItem';

const CourseList = ({data, onEndReach, loadingMore}) => {
  const renderItem = ({item}) => {
    return (
      <FaqItem
        {...item}
      />
    );
  };

  return (
    <CustomList
      style={{marginTop:10}}
      data={data}
      numColumns={1}
      renderItem={renderItem}
      onEndReach={()=>onEndReach()}
      loadingMore={loadingMore}
    />
  );
};

const styles = StyleSheet.create({
 
});

export default CourseList;
