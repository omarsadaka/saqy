import {
  get_all_notification_loading,
  get_all_notification_success,
  get_all_notification_fail,
  get_unread_notification_loading,
  get_unread_notification_success,
  get_unread_notification_fail,
  update_notification_loading,
  update_notification_success,
  update_notification_fail,
  home_section_loading,
  home_section_success,
  home_section_fail,
  home_ads_success,
  home_ads_fail,
  home_ads_loading,
  home_user_addresses_fail,
  home_user_addresses_loading,
  home_user_addresses_success,
} from './ActionTypes';
import {
  getNotificationAPI,
  geUnReadtNotificationAPI,
  updateNotificationToReadAPI,
  getHomeSectionsApi,
  getHomeAdsApi,
  getHomeUserAddressesApi,
} from '../../api/NotificationApi';

export const getNotificationAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_all_notification_loading});
      const result = await getNotificationAPI();
      if (result.error) {
        return dispatch({type: get_all_notification_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_notification_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_notification_fail, error: error.message});
    }
  };
};

export const getUnReadNotificationAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_unread_notification_loading});
      const result = await geUnReadtNotificationAPI();
      console.log('result.meta.total', result.meta.total);
      if (result.error) {
        return dispatch({
          type: get_unread_notification_fail,
          error: result.error,
        });
      }
      if (result.data) {
        dispatch({
          type: get_unread_notification_success,
          payload: result.meta.total,
        });
        return;
      }
    } catch (error) {
      dispatch({type: get_unread_notification_fail, error: error.message});
    }
  };
};

export const updateNotificationToReadAction = id => {
  return async dispatch => {
    try {
      dispatch({type: update_notification_loading});
      const result = await updateNotificationToReadAPI(id);
      console.log('updateNotificationToReadAPI', result);
      if (result.error) {
        return dispatch({type: update_notification_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: update_notification_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: update_notification_fail, error: error.message});
    }
  };
};

export const getHomeSections = () => {
  return async dispatch => {
    try {
      dispatch({type: home_section_loading});
      const result = await getHomeSectionsApi();
      console.log('getHomeSectionsApi', result);
      if (result.error) {
        return dispatch({type: home_section_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: home_section_success, payload: result.data});
        return;
      }
    } catch (error) {
      dispatch({type: home_section_fail, error: error.message});
    }
  };
};

export const getHomeAds = () => {
  return async dispatch => {
    try {
      dispatch({type: home_ads_loading});
      const result = await getHomeAdsApi();
      console.log('getHomeAds', result);
      if (result.error) {
        return dispatch({type: home_ads_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: home_ads_success, payload: result.data});
        return;
      }
    } catch (error) {
      dispatch({type: home_ads_fail, error: error.message});
    }
  };
};

export const getHomeUserAddresses = () => {
  return async dispatch => {
    try {
      dispatch({type: home_user_addresses_loading});
      const result = await getHomeUserAddressesApi();
      console.log('getHomeUserAddresses', result);
      if (result.error) {
        return dispatch({type: home_user_addresses_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: home_user_addresses_success, payload: result.data});
        return;
      }
    } catch (error) {
      dispatch({type: home_user_addresses_fail, error: error.message});
    }
  };
};
