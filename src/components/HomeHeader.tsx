import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface Props {
  title?: string;
  subtitle?: string;
}

const HomeHeader = ({
  title = 'BookExplorer',
  subtitle = 'Discover your next great read',
}: Props) => {
  const spaceIndex = title.indexOf(' ');
  const accent = spaceIndex === -1 ? title.slice(0, 4) : title.slice(0, spaceIndex);
  const rest = spaceIndex === -1 ? title.slice(4) : title.slice(spaceIndex);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.titleAccent}>{accent}</Text>
        <Text style={styles.titleMain}>{rest}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

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
