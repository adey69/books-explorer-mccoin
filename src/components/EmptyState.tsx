import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title?: string;
  subtitle?: string;
}

const EmptyState = ({
  title = 'No books found',
  subtitle = 'Try a different search term.',
}: Props) => (
  <View style={styles.container}>
    <View style={styles.iconWrap}>
      <Text style={styles.iconText}>B</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderCurve: 'continuous',
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },
});

export default EmptyState;
