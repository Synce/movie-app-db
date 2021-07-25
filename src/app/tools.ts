import { IMovie } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const filterMoviesByGenre = (
  movies: IMovie[],
  genres: number[],
): IMovie[] => {
  if (genres.length === 0) return movies;

  const result = movies.filter(value =>
    value.genre_ids.some(r => genres.includes(r)),
  );
  return result;
};
