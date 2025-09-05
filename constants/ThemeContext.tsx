import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type Theme = 'light' | 'dark';
type ThemePreference = Theme | 'system';

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceScheme = useDeviceColorScheme() ?? 'light';
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');

  // Carrega a preferência salva ao iniciar o app
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem(THEME_STORAGE_KEY)) as ThemePreference | null;
        if (savedTheme) {
          setThemePreferenceState(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadThemePreference();
  }, []);

  // Salva a preferência sempre que ela for alterada
  const setThemePreference = async (newPreference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newPreference);
      setThemePreferenceState(newPreference);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  // Determina o tema ativo: a preferência do usuário ou o tema do sistema
  const activeTheme = themePreference === 'system' ? deviceScheme : themePreference;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themePreference, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
