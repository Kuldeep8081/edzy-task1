import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/lib/openLibrary';

export function useInfiniteBooks(query: string) {
  return useInfiniteQuery({
    queryKey: ['books', query],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage, allPages) => {
      // If no docs returned, stop. Otherwise, increment page.
      if (!lastPage.docs.length) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 100,
  });
}