import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookListItem, EmptyState, HomeHeader } from '../../components';
import type { Book } from '../../types';
import { useBookmarksScreen } from './useBookmarksScreen';
import { styles } from './styles';

const keyExtractor = (item: Book) => item.key;
const ItemSeparator = () => <View style={styles.separator} />;

const BookmarksScreen = () => {
  const { books, handleBookPress } = useBookmarksScreen();

  const renderItem = useCallback(
    ({ item }: { item: Book }) => <BookListItem book={item} onPress={handleBookPress} />,
    [handleBookPress],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader title="Saved Books" subtitle="Your personal reading list" />
      {books.length === 0 ? (
        <EmptyState
          title="No saved books yet"
          subtitle="Tap Save on any book to add it here."
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </SafeAreaView>
  );
};

export default BookmarksScreen;
