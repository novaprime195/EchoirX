import { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  quality: string[];
}

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<SearchResult | null>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleSearch = async () => {
    // Implement search functionality
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Sample Track',
        artist: 'Sample Artist',
        coverUrl: 'https://via.placeholder.com/64',
        duration: '3:45',
        quality: ['HIRES', 'LOSSLESS', 'AAC']
      }
    ];
    setResults(mockResults);
  };

  const handleDownload = (track: SearchResult) => {
    setSelectedTrack(track);
    setShowDownloadDialog(true);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tracks..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={() => setQuery('')}>
                <ClearIcon />
              </IconButton>
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{ mb: 3 }}
      />

      <List>
        {results.map((result) => (
          <ListItem
            key={result.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDownload(result)}>
                <DownloadIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={result.coverUrl} variant="rounded" />
            </ListItemAvatar>
            <ListItemText
              primary={result.title}
              secondary={
                <Box>
                  <Typography variant="body2">{result.artist}</Typography>
                  <Box sx={{ mt: 1 }}>
                    {result.quality.map((q) => (
                      <Chip
                        key={q}
                        label={q}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      <Dialog
        open={showDownloadDialog}
        onClose={() => setShowDownloadDialog(false)}
      >
        <DialogTitle>Download Options</DialogTitle>
        <DialogContent>
          <List>
            {selectedTrack?.quality.map((quality) => (
              <ListItem
                key={quality}
                button
                onClick={() => {
                  // Implement download with selected quality
                  console.log('Downloading:', selectedTrack.title, 'in', quality);
                  setShowDownloadDialog(false);
                }}
              >
                <ListItemText primary={quality} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDownloadDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Search;