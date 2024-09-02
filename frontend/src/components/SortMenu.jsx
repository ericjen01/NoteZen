import * as React from 'react';
import {
  Box,
  Select, 
  MenuItem, 
  Stack,
  FormControl,
}from '@mui/material';
import userStore from './userStore';


export default function SortMenu() {
  const {sortType} = userStore()
  const {notes, setNotes} = userStore()
  const {labelIdx, setLabelIdx} = userStore()

  const sort = (e)=> {
    setLabelIdx(e.target.value)
    switch (e.target.value){
      case 0: //new to old
        setLabelIdx(0)
        setNotes(notes.sort((a, b) => new Date(a.created) - new Date(b.created)).reverse()); 
        break;
      case 1: //old to new
        console.log('old to new')
        setLabelIdx(1)
        setNotes(notes.sort((a, b) => new Date(a.created) - new Date(b.created))); 
        break;
      case 2: //title
        setLabelIdx(2)
        setNotes(notes.sort((a, b) => a.title.localeCompare(b.title))); 
        break;
      case 3: //by edit date
        setLabelIdx(3)
        console.log("labelIdx: ", labelIdx)
        setNotes(notes.sort((a, b) => new Date(a.edited) - new Date(b.edited))); 
        break;
      default: 0
    }
  }


  return (
    <Box sx={{ ml:'30px', display:'inline-block'}}>
      <FormControl fullWidth >
        <Select
          value={labelIdx}
          onChange={sort}
          sx={{height:'35px'}}
        >
          {sortType.map(s => (
            <MenuItem key={s.id} value={s.id}>
            <Stack alignItems="center" direction="row" gap={1}>
              {s.icon}{s.txt}
            </Stack> 
            </MenuItem> 
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}