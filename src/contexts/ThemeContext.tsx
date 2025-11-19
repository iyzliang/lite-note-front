'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}
interface keywordContextType {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const KeywordContext = createContext<keywordContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    // 从 localStorage 读取主题设置
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // 计算实际应用的主题
    const root = window.document.documentElement;

    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    // 保存主题设置到 localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      <KeywordContext.Provider value={{ searchKeyword, setSearchKeyword }}>
        {children}
        <Toaster position="top-center" />
      </KeywordContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
export function useSearchKeyword() {
  const context = useContext(KeywordContext);
  if (context === undefined) {
    throw new Error('useSearchKeyword must be used within a KeywordProvider');
  }
  return context;
}
