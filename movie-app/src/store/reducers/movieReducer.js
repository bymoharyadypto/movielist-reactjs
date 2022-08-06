import { MOVIES_FETCHED, MOVIES_PAGES, DETAIL_MOVIE_FETCHED, MOVIES_LOADING, MOVIES_ERROR } from "../actionTypes/indexType";

const initState = {
    movies: [],
    movie: {},
    pages: 0,
    movieLoading: true,
    movieError: null
}

export default function moviesReducer(state = initState, action) {
    switch (action.type) {
        case MOVIES_FETCHED:
            return { ...state, movies: action.payload }
        case DETAIL_MOVIE_FETCHED:
            return { ...state, movie: action.payload }
        case MOVIES_PAGES:
            return { ...state, pages: action.payload }
        case MOVIES_LOADING:
            return { ...state, movieLoading: action.payload }
        case MOVIES_ERROR:
            return { ...state, movieError: action.payload }
        default:
            return state;
    }
}