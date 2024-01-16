import {
  get_profile_data_loading,
  get_profile_data_success,
  get_profile_data_fail,
  edit_profile_data_loading,
  edit_profile_data_success,
  edit_profile_data_fail,
} from './ActionTypes';
import {getProfileDataAPI, editProfileDataAPI} from '../../api/ProfileAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const GetProfileDataAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_profile_data_loading});
      const result = await getProfileDataAPI();
      console.log('profile data result: ', result);
      if (result.error) {
        // showMessage({ message: result.error, backgroundColor: '#FF6F61' })
        return dispatch({type: get_profile_data_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_profile_data_success, payload: result});
        console.log('profile data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: get_profile_data_fail, error: error.message});
    }
  };
};

export const EditProfiledataAction = (
  name,
  email,
  mobile,
  address,
  lat,
  lng,
  photo,
  navigation,
) => {
  return async dispatch => {
    try {
      dispatch({type: edit_profile_data_loading});
      const result = await editProfileDataAPI(
        name,
        email,
        mobile,
        address,
        lat,
        lng,
        photo,
      );
      console.log('edit profile resut', result);
      if (result.data) {
        if (result.data.id) {
          dispatch({type: edit_profile_data_success, payload: result.data});
          showMessage({message: result.message, backgroundColor: 'green'});
          dispatch(GetProfileDataAction());
          navigation.navigate('Home');
          return;
        } else {
          dispatch({type: edit_profile_data_success, payload: result.data});
          showMessage({message: result.message, backgroundColor: 'green'});
          navigation.navigate('Verification', {
            number: result.data.mobile,
            type: 'Edit',
          });
          return;
        }
      }
      if (result.error) {
        dispatch({type: edit_profile_data_fail, error: result.error});
        showMessage({message: result.error, backgroundColor: 'red'});
        return;
      }
    } catch (error) {
      dispatch({type: edit_profile_data_fail, error: error.message});
      showMessage({message: error, backgroundColor: 'red'});
    }
  };
};
