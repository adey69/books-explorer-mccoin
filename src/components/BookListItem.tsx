import React, { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Book } from '../types';
import { colors } from '../theme';
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
      style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : undefined]}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 12,
    boxShadow: '0 2px 10px rgba(44, 26, 14, 0.07)',
  },
  cardPressed: {
    opacity: 0.82,
  },
  cover: {
    width: 60,
    height: 88,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  coverFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  coverFallbackText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  body: {
    flex: 1,
    marginLeft: 14,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 21,
  },
  author: {
    fontSize: 13,
    color: colors.textMuted,
  },
  year: {
    fontSize: 12,
    color: colors.textFaint,
    fontWeight: '500',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
});

export default BookListItem;
