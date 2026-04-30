import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, SearchResponse } from '../types';

const LIST_FIELDS = 'key,title,author_name,first_publish_year,cover_i';

const DETAIL_FIELDS = [
  'key',
  'title',
  'author_name',
  'first_publish_year',
  'cover_i',
  'edition_count',
  'publisher',
  'language',
  'subject',
  'number_of_pages_median',
].join(',');

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<SearchResponse, { q: string; limit?: number }>({
      query: ({ q, limit = 25 }) => ({
        url: '/search.json',
        params: { q, limit, fields: LIST_FIELDS },
      }),
    }),
    getBookDetail: builder.query<Book | undefined, string>({
      query: (key) => ({
        url: '/search.json',
        params: { q: `key:"${key}"`, limit: 1, fields: DETAIL_FIELDS },
      }),
      transformResponse: (response: { docs: Book[] }) => response.docs[0],
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookDetailQuery } = booksApi;
