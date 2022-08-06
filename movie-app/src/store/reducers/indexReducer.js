import { combineReducers } from 'redux'
import moviesReducer from './movieReducer'
import genreReducer from './genreReducer'
export default combineReducers({moviesReducer, genreReducer})