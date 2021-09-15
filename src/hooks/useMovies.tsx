import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieDB.interface';

interface IPeliculasState {
  now_playing: Movie[];
  populars: Movie[];
  top_rated: Movie[];
  upcoming: Movie[];
  loading: boolean;
  error?: any;
}

const initialState: IPeliculasState = {
  error: undefined,
  loading: true,
  now_playing: [],
  populars: [],
  top_rated: [],
  upcoming: [],
};

const useMovies = () => {
  const [peliculasState, setPeliculasState] =
    useState<IPeliculasState>(initialState);

  const getMovies = async () => {
    try {
      const nowPlayingPromise =
        movieDB.get<MovieDBMoviesResponse>('/now_playing');
      const popularesPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
      const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
      const upComingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

      const [
        { data: nowPlaying },
        { data: populares },
        { data: topRated },
        { data: upcoming },
      ] = await Promise.all([
        nowPlayingPromise,
        popularesPromise,
        topRatedPromise,
        upComingPromise,
      ]);

      setPeliculasState({
        ...peliculasState,
        loading: false,
        now_playing: [...nowPlaying.results],
        populars: [...populares.results],
        top_rated: [...topRated.results],
        upcoming: [...upcoming.results],
      });
    } catch (error) {
      console.error('error', error);
      setPeliculasState({ ...peliculasState, loading: false, error });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    peliculasState,
  };
};

export default useMovies;
