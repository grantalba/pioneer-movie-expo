import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

const AUTH_KEY = process.env.EXPO_PUBLIC_TMDB_AUTH_KEY;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${AUTH_KEY}`,
  },
  params: {
    language: 'en-Us',
  },
});

export default axiosClient;
