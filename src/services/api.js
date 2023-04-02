import axios from "axios";

const API_KEY = '33ef4765e3f4adc0587a60944c0ed5d4';
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const DETAILS_URL = 'https://api.themoviedb.org/3/movie/';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';


export async function fetchTrendingMovies() {
    const response = await axios.get(TRENDING_URL, {
        params: {
            api_key: API_KEY,
        }
    });
    return response.data;
}

export async function fetchDetailsMovies(id) {
    const response = await axios.get(`${DETAILS_URL}${id}`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data;
}

export async function fetchSearchMovie(query) {
    const response = await axios.get(`${SEARCH_URL}`, {
        params: {
            api_key: API_KEY,
            query: query,
        }
    });
    return response.data;
}

export async function fetchCastMovies(id) {
    const response = await axios.get(`${DETAILS_URL}${id}/credits`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data;
}

export async function fetchReviewsMovies(id) {
    const response = await axios.get(`${DETAILS_URL}${id}/reviews`, {
        params: {
            api_key: API_KEY
        }
    });
    return response.data;
}