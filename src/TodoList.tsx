import React, { useRef, useState } from 'react'
import TodoItem from './TodoItem'
import AddNewTodoItem from './AddNewTodoItem'
import { getId } from './util'

import {
  Divider,
  List,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'

interface TodoItemData {
  id: string,
  createdAt: Date,
  done: boolean,
  text: string,
}

const DUMMY_DATA: TodoItemData[] = [
  { done: false, text: 'Get a job' },
  { done: false, text: 'Study typescript' },
  { done: false, text: 'Pet the cat' },
  { done: false, text: 'Pet the dog' },
  { done: true, text: 'What da dog do\'in?' },
]
  .map(({ done, text }, idx): TodoItemData => {
    let date = new Date();
    date.setMilliseconds(date.getMilliseconds() + idx);  // add 1 ms difference to each item for sorting
    return {
      done, text,
      createdAt: date,
      id: getId(date, text)
    }
  })

export default function TodoList() {

  const [todoItems, setTodoItems] = useState<TodoItemData[]>(DUMMY_DATA);
  const [searchStr, setSearchStr] = useState<string>('');

  const handleAddNewTodoItem = (text: string) => {
    const date = new Date();
    const newTodoItems = [
      { id: getId(date, text), createdAt: date, done: false, text },
      ...todoItems
    ];
    setTodoItems(newTodoItems);
  }

  const handleItemStatusChange = (targetId: string, checked: boolean) => {
    const newTodoItems = todoItems
      .map((item) => {
        const { id, done, ...rest } = item;
        return targetId === id ? { id, done: !done, ...rest } : item;  // toggle done state of the todo item
      })
      .sort((a, b) => {
        // sort by done state
        if (a.done && !b.done)
          return 1;
        else if (!a.done && b.done)
          return -1;
        // sort by date 
        // because array.sort is not stable sort, so item order may not be preserved
        return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
      })
    setTodoItems(newTodoItems);
  }

  const handleItemTextChange = (targetId: string, targetText: string) => {
    console.log('text changed')
    const newTodoItems = todoItems
      .map((item): TodoItemData => {
        const { id, text, ...rest } = item;
        if (id === targetId)
          return { id, text: targetText, ...rest };
        return item;
      })
    setTodoItems(newTodoItems);
  }

  const handleItemDelete = (targetId: string) => {
    const newTodoItems = todoItems.filter(({ id }) => (id !== targetId));
    setTodoItems(newTodoItems);
  }

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  }

  const getFilteredTodoItems = () => {
    if (searchStr === '')
      return todoItems;
    return todoItems.filter((item) => {
      const { text } = item;
      return text.toLowerCase().includes(searchStr.toLowerCase());
    })
  }

  const needDivider = (idx: number): boolean => {
    if (idx >= 1 && todoItems[idx].done && !todoItems[idx - 1].done)
      return true;
    return false;
  }

  return (
    <>
      <Paper sx={{ py: '1em' }}>
        <Typography variant='h4' textAlign='center'>
          Todo List
        </Typography>
        <Box sx={{ mx: '1em', mt: '1em' }}>
          <TextField fullWidth label='Search' onChange={handleSearchFieldChange} />
        </Box>
        <List dense>
          <AddNewTodoItem onFinish={handleAddNewTodoItem} />
          {
            getFilteredTodoItems().map(({ id, done, text }, idx) => (
              <div key={id}>
                {
                  // divider between done and ongoing items
                  needDivider(idx) && <Divider orientation='horizontal' />
                }
                <TodoItem done={done} text={text} id={id}
                  onStatusChange={handleItemStatusChange}
                  onTextChange={handleItemTextChange}
                  onDelete={handleItemDelete} />
              </div>
            ))
          }
        </List>
      </Paper>
    </>
  )
}
