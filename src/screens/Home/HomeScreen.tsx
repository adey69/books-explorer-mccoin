import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import BookListItem from '../../components/BookListItem';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import type { Book } from '../../types/book';
import { useHomeScreen } from './useHomeScreen';
import { styles } from './styles';

const keyExtractor = (item: Book) => item.key;

const HomeScreen = () => {
  const { query, setQuery, trimmed, books, isLoading, isFetching, isError, refetch, handleBookPress } =
    useHomeScreen();

  const renderItem = useCallback(
    ({ item }: { item: Book }) => <BookListItem book={item} onPress={handleBookPress} />,
    [handleBookPress],
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : books.length === 0 ? (
        <EmptyState
          subtitle={
            trimmed
              ? `No matches for "${trimmed}". Try another search.`
              : 'Pull to refresh or search above.'
          }
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={isFetching && !isLoading}
          onRefresh={refetch}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={10}
        />
      )}
    </View>
  );
};

export default HomeScreen;
