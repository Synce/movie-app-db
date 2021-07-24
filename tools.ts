import { IMovie } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const filterMoviesByGenre = (
  movies: IMovie[],
  AND: boolean,
  genres: number[],
): IMovie[] => {
  if (AND)
    return movies.filter(value =>
      genres.every(i => value.genre_ids.includes(i)),
    );
  if (genres.length > 0)
    return movies.filter(value =>
      value.genre_ids.some(r => genres.includes(r)),
    );
  return movies;
};
