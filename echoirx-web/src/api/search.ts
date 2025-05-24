import { supabase } from './client';

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  quality: string[];
}

export async function searchTracks(query: string): Promise<SearchResult[]> {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('title');

  if (error) throw error;
  return data || [];
}

export async function getDownloadUrl(trackId: string, quality: string): Promise<string> {
  const { data, error } = await supabase
    .from('downloads')
    .select('url')
    .eq('track_id', trackId)
    .eq('quality', quality)
    .single();

  if (error) throw error;
  return data.url;
}