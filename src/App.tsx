import React from 'react';
import './App.css';
import TodoList from './TodoList';

import {
  ThemeProvider,
  createTheme,
  Container,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#383B53'
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container sx={{ py: '2em' }} maxWidth='xs'>
          <TodoList />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
