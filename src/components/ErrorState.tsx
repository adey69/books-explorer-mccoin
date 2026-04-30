import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message = 'Something went wrong while loading books.', onRetry }: Props) => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      <Text style={styles.iconText}>!</Text>
    </View>
    <Text style={styles.title}>Couldn't load books</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry ? (
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderCurve: 'continuous',
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  iconText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 21,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
    borderCurve: 'continuous',
  },
  buttonText: {
    color: '#FFF8F4',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default ErrorState;
