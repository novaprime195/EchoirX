import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, LinearProgress, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

interface Download {
  id: string;
  title: string;
  artist: string;
  progress: number;
  status: 'queued' | 'downloading' | 'completed' | 'failed';
  filePath?: string;
}

function Home() {
  const [downloads] = useState<Download[]>([
    {
      id: '1',
      title: 'Sample Track',
      artist: 'Sample Artist',
      progress: 45,
      status: 'downloading'
    }
  ]);

  const handlePlay = (download: Download) => {
    if (download.filePath) {
      // Implement audio playback
      console.log('Playing:', download.filePath);
    }
  };

  const handleDelete = (download: Download) => {
    // Implement delete functionality
    console.log('Deleting:', download.id);
  };

  const handleShare = (download: Download) => {
    // Implement share functionality
    console.log('Sharing:', download.id);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Downloads
      </Typography>
      
      <List>
        {downloads.map((download) => (
          <ListItem
            key={download.id}
            secondaryAction={
              <Box>
                <IconButton edge="end" onClick={() => handlePlay(download)}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(download)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleShare(download)}>
                  <ShareIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={download.title}
              secondary={
                <Box>
                  <Typography variant="body2">{download.artist}</Typography>
                  {download.status === 'downloading' && (
                    <LinearProgress 
                      variant="determinate" 
                      value={download.progress} 
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Home;