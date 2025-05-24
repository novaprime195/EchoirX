import { create } from 'zustand';

export interface Download {
  id: string;
  title: string;
  artist: string;
  progress: number;
  status: 'queued' | 'downloading' | 'completed' | 'failed';
  filePath?: string;
}

interface DownloadStore {
  downloads: Download[];
  addDownload: (download: Download) => void;
  updateProgress: (id: string, progress: number) => void;
  updateStatus: (id: string, status: Download['status']) => void;
  removeDownload: (id: string) => void;
}

export const useDownloadStore = create<DownloadStore>((set) => ({
  downloads: [],
  addDownload: (download) =>
    set((state) => ({ downloads: [...state.downloads, download] })),
  updateProgress: (id, progress) =>
    set((state) => ({
      downloads: state.downloads.map((d) =>
        d.id === id ? { ...d, progress } : d
      ),
    })),
  updateStatus: (id, status) =>
    set((state) => ({
      downloads: state.downloads.map((d) =>
        d.id === id ? { ...d, status } : d
      ),
    })),
  removeDownload: (id) =>
    set((state) => ({
      downloads: state.downloads.filter((d) => d.id !== id),
    })),
}));