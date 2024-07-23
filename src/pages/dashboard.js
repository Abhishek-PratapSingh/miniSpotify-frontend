import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Box>
      <Button onClick={() => history.push('/playlists')}>Go to Playlists</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Dashboard;



