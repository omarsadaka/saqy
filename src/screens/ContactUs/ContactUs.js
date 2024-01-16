import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Header from '../../components/Header/Header';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomTextInput2 from '../../components/CustomTextInput2/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {moderateScale} from '../../utils/moderateScale';
import {baseURL} from '../../utils/BaseURL';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');
import {User} from '../../components/api/UserUtilities';

export default function ContactUs({navigation}) {
  const data = [
    {value: 'request', label: 'طلب'},
    {value: 'complaint', label: 'شكوى'},
    {value: 'suggestion', label: 'اقتراح'},
    {value: 'other', label: 'أخري'},
  ];
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState('request');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState(null);

  const sendData2 = async () => {
    const values = {
      name: name,
      mobile: mobile,
      email: email,
      subject: title,
      message: messageText,
      type: selectedValue,
    };
    setLoading(true);
    User.contact_us(values)
      .then(res => {
        setLoading(false);
        console.log('contact_us', JSON.stringify(res));
        if (res) {
          showMessage({message: res.message, backgroundColor: 'green'});
          setName('');
          setMobile('');
          setEmail('');
          setTitle('');
          setMessageText('');
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('err', JSON.stringify(err));
      });
  };

  return (
    <View style={styles.container}>
      <Header
        height={height / 8}
        hideBackgroundImage={true}
        showBackBtn={true}
        onBackButtonPressed={() => navigation.goBack()}
        headerTitle={'تواصل معنا'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            width: width,
            alignItems: 'center',
            paddingBottom: height * 0.53,
          }}>
          <View
            style={{
              width: '90%',
              height: height * 0.18,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              margin: 8,
              elevation: 5,
              shadowColor: '#233B5D',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {height: 1, width: 1},
            }}>
            <AirbnbRating
              showRating={false}
              ratingCount={5}
              defaultRating={0}
              onFinishRating={value => setRate(value)}
              ratingBackgroundColor="#FFFFFF"
              size={25}
            />
            <Text
              style={{
                fontSize: moderateScale(14),
                color: '#888888',
                fontFamily: 'HacenMaghrebBd',
              }}>
              تقييم التطبيق
            </Text>
          </View>
          <Text style={styles.title}> الإسم</Text>
          <CustomTextInput2
            placeholder={''}
            onChangeText={value => setName(value)}
            addtionalContainerStyle={{
              width: '90%',
              marginTop: height * 0.01,
            }}
          />
          <Text style={styles.title}> الموبايل</Text>
          <CustomTextInput2
            placeholder={''}
            keyboardType="numeric"
            onChangeText={value => setMobile(value)}
            addtionalContainerStyle={{width: '90%', marginTop: height * 0.01}}
          />
          <Text style={styles.title}> البريد الإلكترونى</Text>
          <CustomTextInput2
            placeholder={''}
            onChangeText={value => setEmail(value)}
            addtionalContainerStyle={{width: '90%', marginTop: height * 0.01}}
          />
          <CustomPicker
            additionalStyle={{
              width: '90%',
              height: Platform.OS === 'ios' ? '15%' : '17%',
              justifyContent: 'center',
              // marginTop: -height * 0.03,
            }}
            PickerData={data}
            onValueChange={value => setSelectedValue(value)}
            selectedValue={selectedValue}
          />
          <Text style={styles.title}>عنوان الرسالة</Text>
          <CustomTextInput2
            placeholder={''}
            onChangeText={value => setTitle(value)}
            addtionalContainerStyle={{width: '90%', marginTop: height * 0.01}}
          />
          <Text style={styles.title}>نص الرسالة</Text>
          <CustomTextInput
            placeholder={''}
            onChangeText={value => setMessageText(value)}
            textAlignVertical="top"
            additionalStyle={{
              width: '95%',
              height: height * 0.2,
              marginTop:
                Platform.OS == 'android' ? -height * 0.23 : -height * 0.2,
            }}
            multiline
          />

          <CustomButton
            BtnTitle="إرسال"
            borderRadius={Math.round(width / 2 + height / 2)}
            LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
            Loading={loading}
            onPress={() => sendData2()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    width: '95%',
    textAlign: 'right',
    marginTop: height * 0.02,
    fontSize: moderateScale(16),
    fontFamily: 'HacenMaghrebBd',
  },
});
