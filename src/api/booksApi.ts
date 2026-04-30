import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchResponse } from '../types/book';

const FIELDS = [
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
        params: { q, limit, fields: FIELDS },
      }),
    }),
  }),
});

export const { useSearchBooksQuery } = booksApi;
