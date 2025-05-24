import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CloudIcon from '@mui/icons-material/Cloud';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Settings() {
  const [serverUrl, setServerUrl] = useState('https://example.com/api/echoir');
  const [showServerDialog, setShowServerDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null);

  const handleSaveServer = () => {
    // Implement server URL update
    console.log('Updating server URL:', serverUrl);
    setShowServerDialog(false);
  };

  const handleConfirmAction = () => {
    if (showConfirmDialog === 'reset') {
      // Implement settings reset
      console.log('Resetting settings');
    } else if (showConfirmDialog === 'clear') {
      // Implement data clearing
      console.log('Clearing data');
    }
    setShowConfirmDialog(null);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <List>
        <ListItem button onClick={() => setShowServerDialog(true)}>
          <ListItemIcon>
            <CloudIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Server URL" 
            secondary={serverUrl} 
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Save Cover Art" 
            secondary="Save album artwork as separate file" 
          />
          <Switch />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FormatListNumberedIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Include Track Numbers" 
            secondary="Add track numbers to filenames" 
          />
          <Switch />
        </ListItem>

        <ListItem button onClick={() => setShowConfirmDialog('clear')}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Clear Data" 
            secondary="Clear download history and cache" 
          />
        </ListItem>

        <ListItem button onClick={() => setShowConfirmDialog('reset')}>
          <ListItemIcon>
            <RestartAltIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Reset Settings" 
            secondary="Reset all settings to default" 
          />
        </ListItem>
      </List>

      <Dialog open={showServerDialog} onClose={() => setShowServerDialog(false)}>
        <DialogTitle>Server URL</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="https://example.com/api/echoir"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowServerDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveServer} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={!!showConfirmDialog} 
        onClose={() => setShowConfirmDialog(null)}
      >
        <DialogTitle>
          {showConfirmDialog === 'reset' ? 'Reset Settings?' : 'Clear Data?'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {showConfirmDialog === 'reset' 
              ? 'This will reset all settings to their default values.' 
              : 'This will clear all download history and cached data.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(null)}>Cancel</Button>
          <Button onClick={handleConfirmAction} color="error">
            {showConfirmDialog === 'reset' ? 'Reset' : 'Clear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Settings;