import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import Loading from '../Loading/Loading';
const CustomList = ({
  data,
  renderItem,
  style,
  numColumns,
  onEndReach,
  loadingMore,
}) => {
  return (
    <FlatList
      style={style}
      data={data}
      nestedScrollEnabled
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id}
      renderItem={renderItem}
      onEndReachedThreshold={0.3}
      onEndReached={() => onEndReach()}
      onEndReachedThreshold={0}
      ListFooterComponent={loadingMore ? <Loading /> : null}
      ListFooterComponentStyle={{marginVertical: 10}}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Text style={styles.text}>{/* {'لا يوجد بيانات.'} */}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HacenMaghrebBd',
    color: 'gray',
    fontSize: 20,
  },
});

export default CustomList;
