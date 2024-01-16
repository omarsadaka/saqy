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
  home_ads_loading,
  home_ads_fail,
  home_user_addresses_loading,
  home_user_addresses_success,
  home_user_addresses_fail,
} from './ActionTypes';

const initialState = {
  notificationLoading: false,
  notification: [],
  notificationFail: '',
  unreadNotification: '',
  unreadNotificationFail: '',
  updateNotification: '',
  updateNotificationFail: '',
  homeSectionLoading: false,
  homeSections: [],
  homeSectionFail: '',
  homeAds: [],
  homeAdsFail: '',
  homeUserAddressesLoading: false,
  homeUserAddresses: [],
  homeUserAddressesFail: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case get_all_notification_loading:
      return {...state, notificationLoading: true};

    case get_all_notification_success:
      return {
        ...state,
        notification: action.payload.data,
        notificationLoading: false,
      };

    case get_all_notification_fail:
      return {
        ...state,
        notificationFail: action.error,
        notificationLoading: false,
      };

    // case get_unread_notification_loading:
    //     return { ...state, notificationLoading: true };

    case get_unread_notification_success:
      return {...state, unreadNotification: action.payload};

    case get_unread_notification_fail:
      return {...state, notificationFail: action.error};

    // case update_notification_loading:
    //     return { ...state, notificationLoading: true };

    case update_notification_success:
      return {...state, updateNotification: action.payload};

    case update_notification_fail:
      return {...state, updateNotificationFail: action.error};

    case home_section_loading:
      return {...state, home_section_loading: true};

    case home_section_success:
      return {
        ...state,
        homeSections: action.payload,
        home_section_loading: false,
      };

    case home_section_fail:
      return {
        ...state,
        homeSectionFail: action.error,
        home_section_loading: false,
      };

    case home_ads_success:
      return {
        ...state,
        homeAds: action.payload,
      };

    case home_ads_fail:
      return {
        ...state,
        homeAdsFail: action.error,
      };

    case home_user_addresses_loading:
      return {...state, homeUserAddressesLoading: true};
    case home_user_addresses_success:
      return {
        ...state,
        homeUserAddresses: action.payload,
        homeUserAddressesLoading: false,
      };

    case home_user_addresses_fail:
      return {
        ...state,
        homeUserAddressesFail: action.error,
        homeUserAddressesLoading: false,
      };

    default:
      return state;
  }
};
