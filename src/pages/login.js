import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Box, FormControl, FormLabel } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      history.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
