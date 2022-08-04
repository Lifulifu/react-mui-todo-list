import React, { useEffect } from 'react';
import './App.css';
import TodoList, { TodoItemData } from './TodoList';
import Footer from './Footer';
import { getId } from './util'
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

const DUMMY_DATA: TodoItemData[] = [
  { done: false, text: 'Get a job' },
  { done: false, text: 'Study typescript' },
  { done: false, text: 'Pet the cat' },
  { done: false, text: 'Pet the dog' },
  { done: true, text: 'What da dog do\'in?' },
].map(({ done, text }, idx): TodoItemData => {
  let date = new Date();
  date.setMilliseconds(date.getMilliseconds() + idx);  // add 1 ms difference to each item for sorting
  return {
    done, text,
    createdAt: date,
    id: getId(date, text)
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
          <TodoList initialData={DUMMY_DATA} />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
