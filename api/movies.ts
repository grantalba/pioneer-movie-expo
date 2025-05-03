import axiosClient from './axiosClient';

type FetchMovies = {
  endpoint: string;
  pageParam: any;
};

export type MoviePage = {
  page: number;
  results: any[]; // Replace with your actual Movie type
  total_pages: number;
};

export const fetchMovies = async ({ endpoint, pageParam }: FetchMovies) => {
  const response = await axiosClient.get(endpoint, {
    params: { page: pageParam },
  });

  return response.data as MoviePage;
};

export const fetchMovieTrailer = async (id: string) => {
  const response = await axiosClient.get(`${id}/videos`);

  return response.data;
};
