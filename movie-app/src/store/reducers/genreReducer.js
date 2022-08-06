import { GENRE_FETCH, GENRE_LOADING, GENRE_ERROR } from "../actionTypes/indexType";

const initState = {
    genres: [],
    genreLoading: false,
    genreError: null
}

export default function genreReducer (state = initState, action) {
    switch (action.type) {
        case GENRE_FETCH:
            return { ...state, genres: action.payload }
        case GENRE_LOADING:
            return { ...state, genreLoading: action.payload }
        case GENRE_ERROR:
            return { ...state, genreError: action.payload }
        default:
            return state;
    }
}