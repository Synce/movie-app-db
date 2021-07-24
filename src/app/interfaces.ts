import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';

/* eslint-disable camelcase */
export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export type ProfileScreenNavigationProp = StackNavigationProp<StackParamList>;

export interface IDetails {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: {
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
