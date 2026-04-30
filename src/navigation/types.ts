import type { Book } from '../types/book';

export type RootStackParamList = {
  Home: undefined;
  BookDetail: { book: Book };
};
