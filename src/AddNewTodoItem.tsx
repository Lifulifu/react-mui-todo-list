import React, { useState } from 'react'
import {
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { MdAdd } from 'react-icons/md'

interface Props {
  onFinish: (text: string) => any
}

export default function AddNewTodoItem({ onFinish }: Props) {

  const [text, setText] = useState('');

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    if (e?.target.value === undefined)
      return;
    setText(e.target.value)
  }

  const handleTextKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      onFinish(text);
      setText('');
    }
  }

  const handleAddButtonClicked = () => {
    onFinish(text);
    setText('');
  }

  return (
    <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
      <ListItemIcon>
        <IconButton onClick={handleAddButtonClicked}>
          <MdAdd />
        </IconButton>
      </ListItemIcon>
      <InputBase fullWidth placeholder='Add new todo ...' value={text}
        onChange={handleTextChange}
        onKeyDown={handleTextKeyDown}
      />
    </ListItem>
  )
}
