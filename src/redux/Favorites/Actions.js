import { 
    add_item_to_favorites_loading, 
    add_item_to_favorites_success, 
    add_item_to_favorites_fail,
    get_favorites_loading,
    get_favorites_success,
    get_favorites_fail,
    remove_item_from_favorites_loading,
    remove_item_from_favorites_success,
    remove_item_from_favorites_fail, 
} from './ActionTypes';
import { addItemToFavoritesAPI, getAllFavroitesAPI, removeItemToFavoritesAPI } from '../../api/FavoritesAPI';
import { getCompanyInfoAction } from '../CompanyDetails/Actions';
import { getTanksProductsAction } from '../CompanyDetails/Actions';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const getAllFavroitesAction = () => {
    return async dispatch => {
        try {
            dispatch({ type: get_favorites_loading })
            const result = await getAllFavroitesAPI();
            console.log('all favroites result: ', result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: get_favorites_fail, error: result.error })
            }
            if (result.data) {
                dispatch({ type: get_favorites_success, payload: result.data })
                return
            }
        } catch (error) {
            dispatch({ type: get_favorites_fail, error: error.message })
        }
    }
}

export const addItemToFavoritesAction = (provider_id) => {
    return async dispatch => {
        try {
            dispatch({ type: add_item_to_favorites_loading })
            const result = await addItemToFavoritesAPI(provider_id);
            console.log('add to favroites result: ', result);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: add_item_to_favorites_fail, error: result.error })
            }
            if (result.status) {
                showMessage({ message: result.message, backgroundColor: 'green' })
                dispatch(getCompanyInfoAction(provider_id))
                dispatch({ type: add_item_to_favorites_success, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: add_item_to_favorites_fail, error: error.message })
        }
    }
}

export const removeItemToFavoritesAction = (id) => {
    return async dispatch => {
        try {
            dispatch({ type: remove_item_from_favorites_loading })
            const result = await removeItemToFavoritesAPI(id);
            console.log('remove to favroites: ', result);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: remove_item_from_favorites_fail, error: result.error })
            }
            if (result.status){
                showMessage({ message: result.message, backgroundColor: 'green' })
                dispatch({ type: remove_item_from_favorites_success, payload: result })
                dispatch(getAllFavroitesAction())
                return
            }
           
        } catch (error) {
            dispatch({ type: remove_item_from_favorites_fail, error: error.message })
        }
    }
}