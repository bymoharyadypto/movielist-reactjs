import { GENRE_FETCH, GENRE_ERROR, GENRE_LOADING } from "../actionTypes/indexType";


export const fetchGenre = (payload) => {
    return { type: GENRE_FETCH, payload }
}

export const loadingGenre = (payload) => {
    return { type:  GENRE_LOADING, payload }
}

export const errorGenre = (payload) => {
    return { type: GENRE_ERROR, payload }
}

export const getGenres = () => {
    return (dispatch) => {
        dispatch(loadingGenre(false))
        dispatch(errorGenre(null))
        return new Promise ((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49`, {
                method: 'GET'
            })
            .then((response) => {
                if (!response.ok) throw new Error('Cannot Fetch Data')
                return response.json()
            })
            .then((data) => {
                dispatch(fetchGenre(data))
                resolve()
            })
            .catch((err) => {
                dispatch(errorGenre(err))
                reject()
            })
            .finally(() => {
                dispatch(loadingGenre(false))
            })
        })
    }
}