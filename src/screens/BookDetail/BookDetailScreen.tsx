import React, { useCallback, useLayoutEffect } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useBookDetailScreen } from './useBookDetailScreen';
import { styles } from './styles';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue} numberOfLines={2}>{value}</Text>
  </View>
);

const CopyableKeyRow = ({ value }: { value: string }) => {
  const handleCopy = useCallback(() => {
    Clipboard.setString(value);
    Toast.show({ type: 'success', text1: 'Copied to clipboard', visibilityTime: 2000 });
  }, [value]);

  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>Open Library Key</Text>
      <View style={styles.keyValueRow}>
        <Text style={styles.keyValueText} numberOfLines={1}>{value}</Text>
        <Pressable onPress={handleCopy} hitSlop={8} style={styles.copyButton}>
          <Text style={styles.copyIcon}>⧉</Text>
        </Pressable>
      </View>
    </View>
  );
};

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onPress: () => void;
}

const BookmarkButton = ({ isBookmarked, onPress }: BookmarkButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.saveButton,
      isBookmarked ? styles.saveButtonActive : undefined,
      pressed ? styles.saveButtonPressed : undefined,
    ]}
  >
    <Text style={[styles.saveButtonText, isBookmarked ? styles.saveButtonTextActive : undefined]}>
      {isBookmarked ? '★  Saved' : 'Save'}
    </Text>
  </Pressable>
);

const makeHeaderRight = (isBookmarked: boolean, onPress: () => void) =>
  function HeaderRight() {
    return <BookmarkButton isBookmarked={isBookmarked} onPress={onPress} />;
  };

const BookDetailScreen = () => {
  const { summary, detail, isLoading, isBookmarked, cover, handleToggleBookmark } = useBookDetailScreen();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: summary.title,
      headerRight: makeHeaderRight(isBookmarked, handleToggleBookmark),
    });
  }, [navigation, handleToggleBookmark, isBookmarked, summary.title]);

  const loading = (val: string | undefined) => (isLoading ? '…' : val || 'N/A');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.coverWrap}>
        {cover ? (
          <Image source={{ uri: cover }} style={styles.cover} resizeMode="cover" />
        ) : (
          <View style={[styles.cover, styles.coverFallback]}>
            <Text style={styles.coverFallbackText}>{summary.title.charAt(0).toUpperCase()}</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{summary.title}</Text>

      <View style={styles.infoSection}>
        <InfoRow label="Author(s)" value={summary.author_name?.join(', ') || 'Unknown'} />
        <InfoRow
          label="First published"
          value={summary.first_publish_year ? String(summary.first_publish_year) : 'N/A'}
        />
        <InfoRow label="Editions" value={loading(detail?.edition_count ? String(detail.edition_count) : undefined)} />
        <InfoRow label="Pages (median)" value={loading(detail?.number_of_pages_median ? String(detail.number_of_pages_median) : undefined)} />
        <InfoRow label="Publisher" value={loading(detail?.publisher?.slice(0, 3).join(', '))} />
        <InfoRow label="Languages" value={loading(detail?.language?.slice(0, 5).join(', ').toUpperCase())} />
        <CopyableKeyRow value={summary.key} />
      </View>

      {detail?.subject?.length ? (
        <View style={styles.subjects}>
          <Text style={styles.subjectsLabel}>Subjects</Text>
          <View style={styles.tagWrap}>
            {detail.subject.slice(0, 12).map((s) => (
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

export default BookDetailScreen;
