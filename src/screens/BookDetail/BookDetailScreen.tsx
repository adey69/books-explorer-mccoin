import React, { useLayoutEffect } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBookDetailScreen } from './useBookDetailScreen';
import { styles } from './styles';

const BookDetailScreen = () => {
  const { book, isBookmarked, cover, handleToggleBookmark } = useBookDetailScreen();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable hitSlop={8} onPress={handleToggleBookmark}>
          <Text style={[styles.headerAction, isBookmarked ? styles.headerActionActive : undefined]}>
            {isBookmarked ? 'Saved' : 'Save'}
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, handleToggleBookmark, isBookmarked]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {cover ? (
        <Image source={{ uri: cover }} style={styles.cover} resizeMode="contain" />
      ) : (
        <View style={[styles.cover, styles.coverFallback]}>
          <Text style={styles.coverFallbackText}>{book.title.charAt(0).toUpperCase()}</Text>
        </View>
      )}

      <Text style={styles.title}>{book.title}</Text>

      <InfoRow label="Author(s)" value={book.author_name?.join(', ') || 'Unknown'} />
      <InfoRow
        label="First published"
        value={book.first_publish_year ? String(book.first_publish_year) : 'N/A'}
      />
      <InfoRow label="Editions" value={book.edition_count ? String(book.edition_count) : 'N/A'} />
      <InfoRow
        label="Pages (median)"
        value={book.number_of_pages_median ? String(book.number_of_pages_median) : 'N/A'}
      />
      <InfoRow label="Publisher" value={book.publisher?.slice(0, 3).join(', ') || 'N/A'} />
      <InfoRow
        label="Languages"
        value={book.language?.slice(0, 5).join(', ').toUpperCase() || 'N/A'}
      />
      <InfoRow label="Open Library Key" value={book.key} />

      {book.subject?.length ? (
        <View style={styles.subjects}>
          <Text style={styles.subjectsLabel}>Subjects</Text>
          <View style={styles.tagWrap}>
            {book.subject.slice(0, 12).map((s) => (
              <View key={s} style={styles.tag}>
                <Text style={styles.tagText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

export default BookDetailScreen;
