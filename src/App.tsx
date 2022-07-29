import React, { useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import Footer from './Footer';

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
    secondary: {
      main: '#777777'
    }
  }
})

function App() {

  useEffect(() => {
    document.title = 'Todo List';
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container sx={{ py: '2em' }} maxWidth='xs'>
          <TodoList />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
