import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  coverWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cover: {
    width: 160,
    height: 224,
    borderRadius: 14,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    boxShadow: '0 8px 28px rgba(44, 26, 14, 0.22)',
  },
  coverFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  coverFallbackText: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    marginBottom: 8,
    boxShadow: '0 2px 8px rgba(44, 26, 14, 0.06)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '600',
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  saveButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderCurve: 'continuous',
    backgroundColor: colors.primaryLight,
  },
  saveButtonActive: {
    backgroundColor: colors.accentLight,
  },
  saveButtonPressed: {
    opacity: 0.65,
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  saveButtonTextActive: {
    color: colors.accent,
  },
  keyValueRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  keyValueText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  copyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIcon: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 18,
  },
  subjects: {
    marginTop: 20,
  },
  subjectsLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '600',
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.accentLight,
    borderRadius: 20,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
});
