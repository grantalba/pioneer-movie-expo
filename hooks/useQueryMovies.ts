import { useInfiniteQuery } from '@tanstack/react-query';

import { MoviePage, fetchMovies } from '@/api/movies';

type QueryMovies = {
  endpoint: string;
  isInfiniteQuery?: boolean;
};
const useQueryMovies = ({ endpoint, isInfiniteQuery = true }: QueryMovies) => {
  return useInfiniteQuery<MoviePage>({
    queryKey: ['movies', endpoint],
    queryFn: ({ pageParam }) => fetchMovies({ endpoint, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;
      return page < total_pages ? page + 1 : undefined;
    },
  });
};

export default useQueryMovies;
