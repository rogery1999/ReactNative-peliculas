import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '63ff7b47e2fa937809a31fbae71e8647',
    language: 'es-ES',
  },
});

export default movieDB;
