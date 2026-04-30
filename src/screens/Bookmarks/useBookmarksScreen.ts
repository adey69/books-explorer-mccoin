import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../store/hooks';
import type { RootStackParamList } from '../../navigation/types';
import type { BookSummary } from '../../types';

type BookmarksNav = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export const useBookmarksScreen = () => {
  const navigation = useNavigation<BookmarksNav>();

  const books = useAppSelector(
    (s) => Object.values(s.bookmarks.items),
    shallowEqual,
  );

  const handleBookPress = useCallback(
    (book: BookSummary) => navigation.navigate('BookDetail', { book }),
    [navigation],
  );

  return { books, handleBookPress };
};
