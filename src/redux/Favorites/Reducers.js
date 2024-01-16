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

const initialState = {
    addToFavoriteLoading: false, addedToFavroites: {}, addedToFavroitesFail: '', itemLiked: {},
    favoritesLoading: false, favorites: {}, favoritesFail: '',
    removeToFavoriteLoading: false, removedFromFavroites: {}, removedFromFavroitesFail: '', itemLiked: {},
}

export default (state = initialState, action) => {
    switch (action.type) {

        case add_item_to_favorites_loading:
            return { ...state, addToFavoriteLoading: true };

        case add_item_to_favorites_success:
            return { ...state, addedToFavroites: action.payload, addToFavoriteLoading: false, itemLiked: { ...state.itemLiked, [`${action.payload.data.id}`]: true } };

        case add_item_to_favorites_fail:
            return { ...state, addedToFavroitesFail: action.error, addToFavoriteLoading: false };

        case get_favorites_loading:
            return { ...state, favoritesLoading: true };

        case get_favorites_success:
            return { ...state, favorites: action.payload, favoritesLoading: false };

        case get_favorites_fail:
            return { ...state, favoritesFail: action.error, favoritesLoading: false };

        case remove_item_from_favorites_loading:
            return { ...state, removeToFavoriteLoading: true };

        case remove_item_from_favorites_success:
            return { ...state, removedFromFavroites: action.payload, removeToFavoriteLoading: false };

        case remove_item_from_favorites_fail:
            return { ...state, removedFromFavroitesFail: action.error, removeToFavoriteLoading: false };

        default:
            return state
    }
};
