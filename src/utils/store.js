import {createStore, applyMiddleware} from 'redux';
import reducers from './CombineReducers';
import ReduxThunk from 'redux-thunk';

export default createStore(reducers, applyMiddleware(ReduxThunk));
