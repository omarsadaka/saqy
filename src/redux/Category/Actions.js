import {
  get_all_companies_loading,
  get_all_companies_success,
  get_all_companies_fail,
  reset_companies,
  get_all_categories_loading,
  get_all_categories_success,
  get_all_categories_fail,
  get_all_product_providers_loading,
  get_all_product_providers_success,
  get_all_product_providers_fail,
  get_all_product_tank_loading,
  get_all_product_tank_success,
  get_all_product_tank_fail,
  get_all_product_water_loading,
  get_all_product_water_success,
  get_all_product_water_fail,
} from './ActionTypes';
import {
  getAllCompanies,
  getAllProductProviders,
  getAllCategories,
  getFilterCompaniesByCity,
  getAllWaterOfferProduct,
  getAllTanksOfferProduct,
} from '../../api/CategoryAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

export const getAllCompaniesAction = sectionID => {
  return async dispatch => {
    try {
      dispatch({type: get_all_companies_loading});
      const result = await getAllCompanies(sectionID);
      console.log('get all companies result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_companies_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_companies_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_companies_fail, error: error.message});
    }
  };
};

export const getAllProductProvidersAction = catID => {
  return async dispatch => {
    try {
      dispatch({type: get_all_product_providers_loading});
      const result = await getAllProductProviders(catID);
      console.log('get all companies result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({
          type: get_all_product_providers_fail,
          error: result.error,
        });
      }
      if (result.data) {
        dispatch({type: get_all_product_providers_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_product_providers_fail, error: error.message});
    }
  };
};

export const getAllFilterCompaniesByCityAction = (
  city_id,
  section_id,
  sub_section_id,
) => {
  return async dispatch => {
    try {
      dispatch({type: get_all_companies_loading});
      const result = await getFilterCompaniesByCity(
        city_id,
        section_id,
        sub_section_id,
      );
      console.log('get all companies result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_companies_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_companies_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_companies_fail, error: error.message});
    }
  };
};

export const getAllCategoriesAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_all_categories_loading});
      const result = await getAllCategories();
      console.log('get all categories result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_categories_fail, error: result.error});
      } else if (result.data) {
        dispatch({type: get_all_categories_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_categories_fail, error: error.message});
    }
  };
};

export const getAllWaterOfferProductAction = catID => {
  return async dispatch => {
    try {
      dispatch({type: get_all_product_water_loading});
      const result = await getAllWaterOfferProduct(catID);
      console.log('get all product offer water result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({
          type: get_all_product_water_fail,
          error: result.error,
        });
      }
      if (result.data) {
        dispatch({type: get_all_product_water_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_product_water_fail, error: error.message});
    }
  };
};

export const getAllTanksOfferProductAction = catID => {
  return async dispatch => {
    try {
      dispatch({type: get_all_product_tank_loading});
      const result = await getAllTanksOfferProduct(catID);
      console.log('get all product offer tanks result data: ', result.data);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_product_tank_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_product_tank_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_product_tank_fail, error: error.message});
    }
  };
};

export const resetCompaniesAction = () => {
  return async dispatch => {
    dispatch({type: reset_companies});
  };
};
