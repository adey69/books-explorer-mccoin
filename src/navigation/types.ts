import type { BookSummary } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetail: { book: BookSummary };
};

export type MainTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};
