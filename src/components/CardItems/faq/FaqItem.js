import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors, Dimensions, Fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const CourseItem = ({id, question, answer, created_at}) => {
  const navigation = useNavigation();
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.view}
        onPress={() => setShowAnswer(pre => !pre)}>
        <Icon
          name={showAnswer ? 'chevron-up' : 'chevron-left'}
          type="feather"
          size={Dimensions.DEVICE_HEIGHT * 0.025}
          color={Colors.black}
        />
        <Text style={styles.title}>{question}</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      {showAnswer ? <Text style={styles.sub_title}>{answer}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.2,
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.015,
    padding: Dimensions.DEVICE_HEIGHT * 0.02,
    marginVertical: Dimensions.DEVICE_HEIGHT * 0.01,
    marginHorizontal: 2,
  },

  view: {
    flex: 1,
    flexDirection: 'row',
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.black,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    fontSize: Dimensions.DEVICE_HEIGHT * 0.022,
    color: Colors.black,
    textAlign: 'right',
    fontFamily: 'HacenMaghrebBd',
  },
  sub_title: {
    width: '100%',
    fontSize: Dimensions.DEVICE_HEIGHT * 0.018,
    color: Colors.textTitle,
    marginTop: Dimensions.DEVICE_HEIGHT * 0.01,
    textAlign: 'right',
    fontFamily: 'HacenMaghrebBd',
  },
});

export default CourseItem;
