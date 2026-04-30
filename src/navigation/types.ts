import type { Book } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetail: { book: Book };
};

export type MainTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};
