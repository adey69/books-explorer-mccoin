import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSearchBooksQuery } from '../../api/booksApi';
import { useDebounce } from '../../hooks/useDebounce';
import type { RootStackParamList } from '../../navigation/types';
import type { Book } from '../../types/book';

type HomeNav = NativeStackNavigationProp<RootStackParamList>;

const FALLBACK_QUERY = 'bestseller';

export const useHomeScreen = () => {
  const navigation = useNavigation<HomeNav>();
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400);
  const trimmed = debounced.trim();
  const effectiveQuery = trimmed.length > 0 ? trimmed : FALLBACK_QUERY;

  const { data, isLoading, isFetching, isError, refetch } = useSearchBooksQuery({
    q: effectiveQuery,
    limit: 25,
  });

  const books = data?.docs ?? [];

  const handleBookPress = useCallback(
    (book: Book) => {
      navigation.navigate('BookDetail', { book });
    },
    [navigation],
  );

  return {
    query,
    setQuery,
    trimmed,
    books,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleBookPress,
  };
};
