import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChangeText, placeholder = 'Search books or authors…' }: Props) => {
  const showClear = value.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <Text style={styles.searchGlyph}>○</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textFaint}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {showClear ? (
          <Pressable onPress={() => onChangeText('')} hitSlop={10} style={styles.clear}>
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    boxShadow: '0 1px 6px rgba(44, 26, 14, 0.08)',
  },
  searchGlyph: {
    fontSize: 16,
    color: colors.textMuted,
    marginRight: 8,
    lineHeight: 22,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  clear: {
    paddingHorizontal: 4,
  },
  clearText: {
    fontSize: 22,
    color: colors.textMuted,
    lineHeight: 24,
  },
});

export default SearchBar;
