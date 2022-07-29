import React from 'react'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import { MdLightbulbOutline } from 'react-icons/md'

const GITHUB_LINK = 'https://github.com/Lifulifu';
const REPO_LINK = 'https://github.com/Lifulifu/react-mui-todo-list';

export default function Footer() {
  return (
    <Box sx={{
      textAlign: 'center',
      color: 'secondary.main',
    }}>
      <Typography variant='subtitle1' alignItems='center'>
        <MdLightbulbOutline />Pro tip: Click on an item's text to edit.
      </Typography>
      <Typography variant='body2'>
        Made by <Link href={GITHUB_LINK}>lifulifu</Link>
      </Typography>
    </Box>
  )
}
