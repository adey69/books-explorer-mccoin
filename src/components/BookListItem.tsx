import React, { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types/book';
import { colors } from '../theme/colors';
import { useAppSelector } from '../store/hooks';

interface Props {
  book: Book;
  onPress: (book: Book) => void;
}

const coverFor = (id?: number) =>
  id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : null;

const BookListItem = memo(function BookListItem({ book, onPress }: Props) {
  const bookmarked = useAppSelector((s) => Boolean(s.bookmarks.items[book.key]));
  const cover = coverFor(book.cover_i);
  const authors = book.author_name?.slice(0, 2).join(', ') ?? 'Unknown author';

  const handlePress = useCallback(() => onPress(book), [onPress, book]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : undefined]}
    >
      {cover ? (
        <Image source={{ uri: cover }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverFallback]}>
          <Text style={styles.coverFallbackText}>{book.title.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {authors}
        </Text>
        {book.first_publish_year ? (
          <Text style={styles.year}>{book.first_publish_year}</Text>
        ) : null}
      </View>
      {bookmarked ? <View style={styles.dot} /> : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: {
    backgroundColor: colors.surface,
  },
  cover: {
    width: 52,
    height: 76,
    borderRadius: 6,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  coverFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverFallbackText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textMuted,
  },
  body: {
    flex: 1,
    marginLeft: 14,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  author: {
    fontSize: 13,
    color: colors.textMuted,
  },
  year: {
    fontSize: 12,
    color: colors.textMuted,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
});

export default BookListItem;
