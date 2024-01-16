import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import CustomPicker from '../../../components/CustomPicker/CustomPicker';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {moderateScale} from '../../../utils/moderateScale';
import Calendar from '../../../../assets/calendar';
import TimeIcon from '../../../../assets/time_icon';

const {width, height} = Dimensions.get('window');

export default function MaintenanceServiceRequest({navigation}) {
  const [selectedValue, setSelectedValue] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  // const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || filterTime;
  //     setFilterTime(currentDate);
  // };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            margin: 8,
            height: '40%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomPicker
            additionalStyle={{
              height: Platform.OS === 'ios' ? '25%' : undefined,
              justifyContent: 'center',
            }}
            PickerData={[{label: '', value: ''}]}
            HeadLine="السعه"
            onValueChange={value => setSelectedValue(value)}
            selectedValue={selectedValue}
          />
          <View style={{width: '100%', alignItems: 'center', margin: 8}}>
            <Text
              style={{
                textAlign: 'right',
                textAlignVertical: 'center',
                width: '95%',
                marginBottom: 8,
                fontSize: moderateScale(18),
                fontFamily: 'HacenMaghrebLt',
              }}>
              التاريخ
            </Text>
            <DatePicker
              style={{width: '95%'}}
              iconComponent={
                <View
                  style={{
                    position: 'absolute',
                    left: '3%',
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <Calendar />
                </View>
              }
              mode="date"
              date={filterDate}
              placeholder={' '}
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="3030-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                placeholderText: {color: 'black'},
                dateIcon: {
                  position: 'absolute',
                  left: '3%',
                  top: 0,
                },
                dateInput: {
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 13,
                },
              }}
              onDateChange={value => setFilterDate(value)}
            />
          </View>
          <View style={{width: '100%', alignItems: 'center', margin: 8}}>
            <Text
              style={{
                textAlign: 'right',
                textAlignVertical: 'center',
                width: '95%',
                marginBottom: 8,
                fontSize: moderateScale(18),
                fontFamily: 'HacenMaghrebLt',
              }}>
              الوقت
            </Text>
            <View
              style={{
                width: '95%',
                borderWidth: 1,
                borderColor: '#EEEEEE',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                height: height / 13,
              }}>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{
                  position: 'absolute',
                  left: '3%',
                  top: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <TimeIcon />
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <Text
                  style={{textAlign: 'center', textAlignVertical: 'center'}}>
                  {filterTime}
                </Text>
              </View>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  is24Hour={true}
                  textColor="#000000"
                  onChange={(event, date) => {
                    setShowTimePicker(false);
                    var timePicked = moment(date).format('HH:mm');
                    setFilterTime(timePicked);
                    setShowTimePicker(false);
                  }}
                  value={new Date()}
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#EEEEEE',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height / 13,
                  }}
                />
              )}
            </View>
          </View>
          <CustomPicker
            additionalStyle={{
              height: Platform.OS === 'ios' ? '25%' : undefined,
              justifyContent: 'center',
            }}
            PickerData={[{label: '', value: ''}]}
            HeadLine="عنوان التوصيل"
            onValueChange={value => setSelectedValue(value)}
            selectedValue={selectedValue}
          />
          <View
            style={{
              width: '100%',
              height: '35%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 8,
            }}>
            <CustomButton
              onPress={() => navigation.navigate('ServiceRequestSummery')}
              BtnTitle="أطلب الان"
              borderRadius={Math.round(width / 2 + height / 2)}
              LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
