import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const HomeHeader = () => (
  <View style={styles.container}>
    <View style={styles.titleRow}>
      <Text style={styles.titleAccent}>Book</Text>
      <Text style={styles.titleMain}>Explorer</Text>
    </View>
    <Text style={styles.subtitle}>Discover your next great read</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleAccent: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -1,
  },
  titleMain: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 3,
    letterSpacing: 0.1,
  },
});

export default HomeHeader;
