import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Header from '../../components/Header/Header';
import {moderateScale} from '../../utils/moderateScale';
import axios from 'axios';
import {baseURL} from '../../utils/BaseURL';
import {ExpandableListView} from 'react-native-expandable-listview';
import {FaqList} from '../../components/CardItems/faq';
const {width, height} = Dimensions.get('window');
import Loading from '../../components/Loading/Loading';
import {User} from '../../components/api/UserUtilities';
import {Icon} from 'react-native-elements';
import {getFaqQuistionApi} from '../../api/faqApi';

export default function Faq({navigation, route}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const keyExtractor = (item, index) => item + index;
  useEffect(() => {
    loadData();
  }, []);
  console.log('data', data);
  const loadData = async () => {
    setIsLoading(true);
    await getFaqQuistionApi()
      .then(res => setData(res))
      .catch(err => console.log(err));
    setIsLoading(false);
  };
  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <View style={styles.header2}>
        <Text
          style={[
            styles.header_title,
            {color: '#000000', textAlign: 'center'},
          ]}>
          {item?.question}
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>{item?.answer}</Text>
        <FaqList
          data={item?.sub_questions}
          onEndReach={() => {}}
          loadingMore={null}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header
          height={height / 7}
          top={height * 0.05}
          close={true}
          showBackBtn={true}
          onBackButtonPressed={() => navigation.navigate('Home')}
          headerTitle={'الدعم والمساعدة'}
        />
      </View>
      {/* <View style={styles.header}>
            <Text style={styles.header_title}>{'الدعم والمساعدة'}</Text>
            <Icon name={'x'} type="feather" size={height*0.025} color={'#ffffff'}
            onPress={()=> navigation.navigate('Home')}/>
           </View> */}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  view: {
    width: width,
    marginTop: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: width * 0.9,
    fontSize: width * 0.035,
    color: '#000000',
    textAlign: 'right',
    fontFamily: 'HacenMaghrebBd',
  },
  header: {
    width: width,
    height: height * 0.1,
    paddingHorizontal: width * 0.03,
    alignItems: 'center',
    backgroundColor: 'gray',
    flexDirection: 'row',
  },
  header2: {
    width: width,
    marginTop: height * 0.12,
    paddingHorizontal: width * 0.03,
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_title: {
    flex: 1,
    fontSize: width * 0.04,
    marginHorizontal: width * 0.03,
    color: '#FFFFFF',
    textAlign: 'right',
    fontFamily: 'HacenMaghrebBd',
  },
});
