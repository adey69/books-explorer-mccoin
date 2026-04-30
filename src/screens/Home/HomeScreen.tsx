import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookListItem from '../../components/BookListItem';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';
import type { Book } from '../../types/book';
import { useHomeScreen } from './useHomeScreen';
import { styles } from './styles';

const keyExtractor = (item: Book) => item.key;
const ItemSeparator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  const { query, setQuery, trimmed, books, isLoading, isFetching, isError, refetch, handleBookPress } =
    useHomeScreen();

  const renderItem = useCallback(
    ({ item }: { item: Book }) => <BookListItem book={item} onPress={handleBookPress} />,
    [handleBookPress],
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }
    if (isError) {
      return <ErrorState onRetry={refetch} />;
    }
    if (books.length === 0) {
      return (
        <EmptyState
          subtitle={
            trimmed
              ? `No matches for "${trimmed}". Try another search.`
              : 'Pull to refresh or search above.'
          }
        />
      );
    }
    return (
      <FlatList
        data={books}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader />
      <SearchBar value={query} onChangeText={setQuery} />
      {renderContent()}
    </SafeAreaView>
  );
};

export default HomeScreen;
