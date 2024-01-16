import React, {useState, useEffect} from 'react';
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
import {User} from '../../../components/api/UserUtilities';
import {createOrderRequestAction} from '../../../redux/Cart/Actions';
import {getCompanyInfoAction} from '../../../redux/CompanyDetails/Actions';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

export default function SanitationServiceRequest({
  navigation,
  companyId,
  guest,
  serviceID,
}) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [price, setPrice] = useState(null);
  const [service, setService] = useState(null);
  const [unit, setUnit] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState({});

  // const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || filterTime;
  //     setFilterTime(currentDate);
  // };
  const {createOrderLoading} = useSelector(state => state.cart);
  const {companyInfo} = useSelector(state => state.companyInfo);

  useEffect(() => {
    if (!guest) getDefaultAddress();
    getServiceInfo();
  }, []);

  const getAllAddress = (value, label) => {
    User.getAllAdress()
      .then(res => {
        console.log('getAllAddress', JSON.stringify(res));
        if (res.data) {
          const data = [];
          var arr = res.data;
          for (let index = 0; index < arr.length; index++) {
            const obj = {
              value: arr[index].id,
              label: arr[index].address,
            };
            data.push(obj);
          }
          data.unshift({label: label, value: value});
          setAddresses(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDefaultAddress = () => {
    User.getDefaultAdress()
      .then(res => {
        console.log('getDefaultAdress', res);
        if (res.status) {
          setDefaultAddress(res.data);
          setSelectedValue(res.data.address);
          setAddressId(res.data.id);
        } else {
          showMessage({
            message: 'لا يوجد عنوان إفتراضى ',
            backgroundColor: '#FF6F61',
          });
          getAllAddress(0, 'إختر عتوان توصيل');
        }
        getAllAddress(res.data.id, res.data.address);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getServiceInfo = () => {
    User.ProviderService(serviceID)
      .then(res => {
        // console.log('ProviderService', JSON.stringify(res))
        if (res.status) {
          setPrice(res.data.price);
          setService(res.data.capacity.name ? res.data.capacity.name : '');
          setUnit(res.data.capacity.unit ? res.data.capacity.unit.name : '');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const isToday = pickedDate => {
    const today = new Date();
    const date = new Date(pickedDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      {/* <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ alignItems: 'center' }}> */}
      {/* <CustomPicker
                    additionalStyle={{ height: Platform.OS === 'ios' ? '25%' : undefined, justifyContent: 'center', }}
                    PickerData={[{ label: '', value: '' }]}
                    HeadLine="السعه"
                    onValueChange={value => setSelectedValue(value)}
                    selectedValue={selectedValue} /> */}
      <Text
        style={{
          width: '95%',
          textAlign: 'right',
          marginHorizontal: width * 0.02,
          color: '#42B5D0',
          fontSize: moderateScale(18),
          fontFamily: 'HacenMaghrebLt',
          marginTop: height * 0.01,
        }}>
        {service} {unit}
      </Text>
      <View style={{width: '100%', alignItems: 'center', margin: 8}}>
        <Text
          style={{
            textAlign: 'right',
            textAlignVertical: 'center',
            width: '95%',
            marginBottom: '5%',
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
          minDate={new Date()}
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
        <TouchableOpacity
          style={{
            width: '95%',
            borderWidth: 1,
            borderColor: '#EEEEEE',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            height: height / 13,
          }}
          onPress={() => setShowTimePicker(true)}>
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
            <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>
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
                setPickedTime(date.getTime());
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
        </TouchableOpacity>
      </View>
      <CustomPicker
        additionalStyle={{
          height: Platform.OS === 'ios' ? '25%' : '25%',
          justifyContent: 'center',
        }}
        PickerData={addresses}
        HeadLine="عنوان التوصيل"
        onValueChange={value => setAddressId(value)}
        selectedValue={addressId}
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: height * 0.03,
        }}>
        <CustomButton
          onPress={() => {
            if (!guest) {
              if (filterDate) {
                if (filterTime) {
                  if (isToday(filterDate)) {
                    if (new Date().getTime() < pickedTime) {
                      if (addressId) {
                        dispatch(
                          createOrderRequestAction(
                            addressId,
                            serviceID,
                            filterDate,
                            filterTime,
                            navigation,
                            unit,
                          ),
                        );
                      } else {
                        showMessage({
                          message: 'إختر عنوان التوصيل أولا ',
                          backgroundColor: '#FF6F61',
                        });
                      }
                    } else {
                      showMessage({
                        message: 'الوقت غير صالح',
                        backgroundColor: '#FF6F61',
                      });
                    }
                  } else {
                    if (addressId) {
                      dispatch(
                        createOrderRequestAction(
                          addressId,
                          serviceID,
                          filterDate,
                          filterTime,
                          navigation,
                          unit,
                        ),
                      );
                    } else {
                      showMessage({
                        message: 'إختر عنوان التوصيل أولا ',
                        backgroundColor: '#FF6F61',
                      });
                    }
                  }
                } else {
                  showMessage({
                    message: 'إختر الوقت أولا ',
                    backgroundColor: '#FF6F61',
                  });
                }
              } else {
                showMessage({
                  message: 'إختر التاريخ أولا',
                  backgroundColor: '#FF6F61',
                });
              }
            } else {
              showMessage({
                message: 'ليس لديك الصلاحية كزائر',
                backgroundColor: '#FF6F61',
              });
            }
          }}
          BtnTitle={`أطلب الأن ${price} ريال`}
          borderRadius={Math.round(width / 2 + height / 2)}
          LinearGradientColors={['#42B5D0', '#3EB0CE', '#1579BB']}
          Loading={createOrderLoading}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
