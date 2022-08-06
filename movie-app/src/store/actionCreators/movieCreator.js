import { MOVIES_FETCHED, MOVIES_PAGES, DETAIL_MOVIE_FETCHED, MOVIES_LOADING, MOVIES_ERROR } from "../actionTypes/indexType";

export const fetchMovies = (payload) => {
    return { type: MOVIES_FETCHED, payload }
}

export const fetchMovie = (payload) => {
    return { type:DETAIL_MOVIE_FETCHED, payload }
}

export const moviePages = (payload) => {
    return { type: MOVIES_PAGES, payload }
}
export const loadingMovie = (payload) => {
    return { type:  MOVIES_LOADING, payload }
}

export const errorMovie = (payload) => {
    return { type: MOVIES_ERROR, payload }
}

export const getMovies = () => {
    return (dispatch) => {  
        dispatch(loadingMovie(true))
        dispatch(errorMovie(null))
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49`, {
                method: 'GET'
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Cannot Fetch Data')
                    return response.json()
                })
                .then((data) => {
                    dispatch(fetchMovies(data))
                    dispatch(moviePages(data.total_pages))
                    resolve()
                })
                .catch((err) => {
                    dispatch(errorMovie(err))
                    reject()
                })
                .finally(() => {
                    dispatch(loadingMovie(false))
                })
        })
    }
}

export const getMovieById = (id) => {
    // console.log(id);
    return (dispatch) => {
        dispatch(loadingMovie(false))
        dispatch(errorMovie(null))
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`, {
                method: 'GET'
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Cannot Fetch Data')
                    return response.json()
                })
                .then((data) => {
                    dispatch(fetchMovie(data))
                    resolve()
                })
                .catch((err) => {
                    dispatch(errorMovie(err))
                    reject()
                })
                .finally(() => {
                    dispatch(loadingMovie(false))
                })
        })
    }
}