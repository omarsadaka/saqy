import { 
    get_cities_by_region_id_loading,
    get_cities_by_region_id_success,
    get_cities_by_region_id_fail, 
} from './ActionTypes';
import { getCitiesAPI } from '../../api/RegionAPI';



export const getCitiesAction = (regionId) => {
    return async dispatch => {
        try {
            dispatch({ type: get_cities_by_region_id_loading })
            const result = await getCitiesAPI(regionId);
            //console.log('citiieees: ', result);
            if (result.error) {
                return dispatch({ type: get_cities_by_region_id_fail, error: result.error })
            }
            if (result.data) {
                dispatch({ type: get_cities_by_region_id_success, payload: result })
                return
            }
           
        } catch (error) {
            dispatch({ type: get_cities_by_region_id_fail, error: error.message })
        }
    }
}