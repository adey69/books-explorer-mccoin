import { useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleBookmark } from '../../store/bookmarksSlice';
import type { RootStackParamList } from '../../navigation/types';

type DetailRoute = RouteProp<RootStackParamList, 'BookDetail'>;

export const useBookDetailScreen = () => {
  const route = useRoute<DetailRoute>();
  const dispatch = useAppDispatch();
  const { book } = route.params;
  const isBookmarked = useAppSelector((s) => Boolean(s.bookmarks.items[book.key]));

  const handleToggleBookmark = useCallback(
    () => dispatch(toggleBookmark(book)),
    [dispatch, book],
  );

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return { book, isBookmarked, cover, handleToggleBookmark };
};
