import axios from 'axios';

// Types based on API response 
export interface BookDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

export interface SearchResponse {
  docs: BookDoc[];
  numFound: number;
  start: number;
}

const API_URL = "https://openlibrary.org/search.json";

export const fetchBooks = async ({ pageParam = 1, queryKey }: any) => {
  const [_, searchQuery] = queryKey;
  // Fetch 20 items per page [cite: 13]
  const { data } = await axios.get<SearchResponse>(API_URL, {
    params: {
      q: searchQuery,
      page: pageParam,
      limit: 20,
      fields: "title,author_name,first_publish_year,cover_i,subject,key"
    },
  });
  return data;
};