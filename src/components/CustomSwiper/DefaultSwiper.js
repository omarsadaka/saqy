import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const {width, height} = Dimensions.get('window');

const CustomSwiper = ({images}) => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        showPagination
        paginationDefaultColor={'red'}
        paginationActiveColor={'blue'}
        paginationStyleItemActive={styles.active}
        paginationStyleItemInactive={styles.inActive}
        data={images}
        renderItem={({item}) => (
          <View style={styles.child}>
            <Image style={styles.image} source={{uri: item.photo}} />
            <Text style={[styles.title, styles.left]}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.02,
    height: height * 0.25,
    backgroundColor: 'gray',
  },
  child: {
    width: width,
    height: height * 0.2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  inActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: height * 0.025,
    position: 'absolute',
    bottom: height * 0.0,
    right: 0,
    backgroundColor: 'blue',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.01,
    opacity: 0.6,
    borderTopLeftRadius: height * 0.025,
  },
});

export default CustomSwiper;
