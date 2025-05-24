import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  serverUrl: string;
  saveCoverArt: boolean;
  includeTrackNumbers: boolean;
  fileNamingFormat: 'ARTIST_TITLE' | 'TITLE_ARTIST' | 'TITLE_ONLY';
}

interface SettingsStore extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  serverUrl: 'https://example.com/api/echoir',
  saveCoverArt: false,
  includeTrackNumbers: false,
  fileNamingFormat: 'TITLE_ONLY',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'echoir-settings',
    }
  )
);