import '../App.css'
import { 
  Box,
  Stack,
  Paper,
  Typography, 
} from '@mui/material'
import userStore from "./userStore"
import { useParams } from "react-router-dom"
import TipTapSearchBox from './TipTapSearchBox'
import { showDate } from '../functions/functions'

import StarterKit from '@tiptap/starter-kit'
import TipTapTable from '@tiptap/extension-table'
import TipTapButtonGroup from './TipTapButtonGroup'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import {EditorContent, useEditor} from '@tiptap/react'
import TableHeader from '@tiptap/extension-table-header'
import TipTapTableRow from '@tiptap/extension-table-row'
import TipTapTableCell from '@tiptap/extension-table-cell'

const SingleNotePage = () => {

  const {id} = useParams()
  const {labelIdx} = userStore()
  const note = (userStore().notes).find(n => n.id === id)
  const {title} = note
  const {content} = note

  const editor = useEditor({
    extensions: [
      Underline,
      TableHeader,
      TipTapTableRow,
      TipTapTableCell,
      TipTapTable.configure({resizable: true}),
      Highlight.configure({ multicolor: true }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: content
  })

  if (!editor) return null
  
  return(
    <Paper>
      <Box sx={{
        mx:'auto',
        width:'95%', 
        height:'100vh', 
        color:'text.primary', 
        bgcolor:'background.default', 
      }}>
        <TipTapButtonGroup editor={editor}/>

        <Box sx={{pt:'30px'}}>
          <Typography 
            sx={{fontWeight:'bold', fontSize:'1.2rem'}}
          >
            {title}
          </Typography>
          <Stack 
            gap={0} 
            direction="row" 
            sx={{my:'-10px'}}
            alignItems="center" 
          >
            <Typography fontSize={'small'} sx={{my:'20px'}}>
              {showDate(note, labelIdx)}
            </Typography>
            <TipTapSearchBox editor={editor} content={content}/>
          </Stack>
          <EditorContent editor={editor} />
        </Box>
      </Box>                    
    </Paper>
    
  )
}


export default SingleNotePage