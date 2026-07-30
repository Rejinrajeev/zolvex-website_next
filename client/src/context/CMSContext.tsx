"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CMSContextType {
  content: Record<string, any>;
  theme: Record<string, any>;
  t: (key: string, fallback: string) => string;
  refreshCMS: () => Promise<void>;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType>({
  content: {},
  theme: {},
  t: (key, fallback) => fallback,
  refreshCMS: async () => {},
  loading: true
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [theme, setTheme] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const fetchCMSData = async () => {
    try {
      const [contentRes, themeRes] = await Promise.all([
        fetch("/api/v1/content"),
        fetch("/api/v1/theme")
      ]);

      if (contentRes.ok) {
        const contentData = await contentRes.json();
        if (contentData.success && contentData.data) {
          setContent(contentData.data);
        }
      }

      if (themeRes.ok) {
        const themeData = await themeRes.json();
        if (themeData.success && themeData.data) {
          setTheme(themeData.data);
          applyThemeTokens(themeData.data);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch CMS content or theme:", e);
    } finally {
      setLoading(false);
    }
  };

  const applyThemeTokens = (themeTokens: Record<string, any>) => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      if (themeTokens.primaryColor) root.style.setProperty("--color-primary", themeTokens.primaryColor);
      if (themeTokens.primaryHover) root.style.setProperty("--color-primary-hover", themeTokens.primaryHover);
      if (themeTokens.secondaryColor) root.style.setProperty("--color-secondary", themeTokens.secondaryColor);
    }
  };

  useEffect(() => {
    fetchCMSData();
  }, []);

  const t = (key: string, fallback: string) => {
    return content[key] || fallback;
  };

  return (
    <CMSContext.Provider value={{ content, theme, t, refreshCMS: fetchCMSData, loading }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
