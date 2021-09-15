import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Cast, MovieCast, MovieFull } from '../interfaces/movieDB.interface';

interface IMovieDetails {
  cast?: Cast[];
  movieFull?: MovieFull;
  isLoading: boolean;
}

const defaultMovieDetails: IMovieDetails = {
  cast: undefined,
  movieFull: undefined,
  isLoading: true,
};

const useMovieDetails = (movieId: number) => {
  const [movieDetailsState, setMovieDetails] = useState(defaultMovieDetails);

  const movieRequest = async () => {
    const movieFullPromise = movieDB.get<MovieFull>(`${movieId}`);
    const movieCastPromise = movieDB.get<MovieCast>(`${movieId}/credits`);
    const [{ data: movieFull }, { data: movieCast }] = await Promise.all([
      movieFullPromise,
      movieCastPromise,
    ]);
    setMovieDetails({
      cast: movieCast.cast,
      movieFull: movieFull,
      isLoading: false,
    });
  };

  useEffect(() => {
    movieRequest();
  }, []);

  return { ...movieDetailsState };
};

export default useMovieDetails;
