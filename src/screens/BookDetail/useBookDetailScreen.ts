import { useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleBookmark } from '../../store/bookmarksSlice';
import type { RootStackParamList } from '../../navigation/types';
import { useGetBookDetailQuery } from '../../api';

type DetailRoute = RouteProp<RootStackParamList, 'BookDetail'>;

export const useBookDetailScreen = () => {
  const route = useRoute<DetailRoute>();
  const dispatch = useAppDispatch();
  const { book: summary } = route.params;

  const { data: detail, isLoading, isError } = useGetBookDetailQuery(summary.key);

  const isBookmarked = useAppSelector((s) => Boolean(s.bookmarks.items[summary.key]));

  const handleToggleBookmark = useCallback(() => {
    if (detail) dispatch(toggleBookmark(detail));
  }, [dispatch, detail]);

  const coverKey = detail?.cover_i ?? summary.cover_i;
  const cover = coverKey
    ? `https://covers.openlibrary.org/b/id/${coverKey}-L.jpg`
    : null;

  return { summary, detail, isLoading, isError, isBookmarked, cover, handleToggleBookmark };
};
