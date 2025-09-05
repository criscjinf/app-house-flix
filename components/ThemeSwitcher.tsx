import { useTheme } from '@/constants/ThemeContext';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function ThemeSwitcher() {
  const { themePreference, setThemePreference } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Mudar Tema</ThemedText>
      <View style={styles.buttonsContainer}>
        {(['light', 'dark', 'system'] as const).map((p) => (
          <Pressable
            key={p}
            style={[styles.button, themePreference === p && styles.selectedButton]}
            onPress={() => setThemePreference(p)}
          >
            <ThemedText style={[styles.buttonText, themePreference === p && styles.selectedButtonText]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  selectedButton: {
    backgroundColor: '#0a7ea4',
  },
  buttonText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#fff',
  },
});
