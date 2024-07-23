import React, { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');
  const [songs, setSongs] = useState('');
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('/api/playlists', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, songs: songs.split(',') }),
    });
    const playlist = await response.json();
    setPlaylists([...playlists, playlist]);
    setName('');
    setSongs('');
  };

  const handleUpdatePlaylist = async (playlistId) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, songs: songs.split(',') }),
    });
    const updatedPlaylist = await response.json();
    setPlaylists(playlists.map(playlist => (playlist._id === playlistId ? updatedPlaylist : playlist)));
    setName('');
    setSongs('');
    setEditingPlaylistId(null);
  };

  const handleDeletePlaylist = async (playlistId) => {
    await fetch(`/api/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
  };

  const handleEditClick = (playlist) => {
    setName(playlist.name);
    setSongs(playlist.songs.join(','));
    setEditingPlaylistId(playlist._id);
  };

  const handleSearch = async () => {
    const response = await fetch(`/api/playlists/search?query=${searchQuery}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await response.json();
    setPlaylists(data);
  };

  return (
    <Box>
      <Input
        placeholder="Playlist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Songs (comma separated)"
        value={songs}
        onChange={(e) => setSongs(e.target.value)}
      />
      {editingPlaylistId ? (
        <Button onClick={() => handleUpdatePlaylist(editingPlaylistId)}>Update Playlist</Button>
      ) : (
        <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
      )}
      <Input
        placeholder="Search Playlists"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <List>
        {playlists.map(playlist => (
          <ListItem key={playlist._id}>
            {playlist.name}
            <IconButton icon={<EditIcon />} onClick={() => handleEditClick(playlist)} />
            <IconButton icon={<DeleteIcon />} onClick={() => handleDeletePlaylist(playlist._id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Playlists;


 