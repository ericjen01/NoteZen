import '../styles.scss'
import userStore from "./userStore"
import { editorButton } from '../styles'
import boldIcon from '../assets/bold.png'
import listIcon from '../assets/list.png'
import lineIcon from '../assets/line.png'
import undoIcon from '../assets/undo.png'
import redoIcon from '../assets/redo.png'
import strikeIcon from '../assets/strike.png'
import italicIcon from '../assets/italic.png'
import bulletIcon from '../assets/bullet.png'
import quoteIcon from '../assets/quote.png'
import eraseIcon from '../assets/erase.png'
import headingIcon from '../assets/heading.png'
import codeBlockIcon from '../assets/codeblock.png'
import underlineIcon from '../assets/underline.png'
import Table from '@tiptap/extension-table'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TableRow from '@tiptap/extension-table-row'
import ListItem from '@tiptap/extension-list-item'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import TableCell from '@tiptap/extension-table-cell'
import { EditorContent, useEditor } from '@tiptap/react'
import TableHeader from '@tiptap/extension-table-header'
import tableIcon from '../assets/table.png'
import addTopIcon from '../assets/addtop.png'
import addLeftIcon from '../assets/addleft.png'
import addRightIcon from '../assets/addright.png'
import addBottomIcon from '../assets/addbottom.png'
import deleteRowIcon from '../assets/deleteRow.png'
import colorCellIcon from '../assets/colorcell.png'
import mergeCellIcon from '../assets/mergecells.png'
import deleteColumnIcon from '../assets/deleteCol.png'
import deleteTableIcon from '../assets/deleteTable.png'

import {
  Box,
  Button,
  Select, 
  Divider,
  MenuItem, 
}from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components

const highlightMatch = (searchTerms, text) => {  
  searchTerms.map(searchTerm =>{
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escapedTerm + '\\b', 'gi');
    if (searchTerm !== '') {
      text = text.replace(regex, m => '<mark style="background-color: yellow;">' + m + '</mark>');
    }
    console.log('text: ', text)
  })
  return ( text )
}


const TextEditBar = (note) => {
  const {title} = note
  const {content} = note
  const {searchTerms} = userStore()
  
  const editor = useEditor({
    extensions: [
      Text,
      TableRow,
      TableCell,
      Underline,
      Highlight,
      TableHeader,
      Table.configure({resizable: true}),
      TextStyle.configure({ types: [ListItem.name] }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
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

  editor.commands.setContent(highlightMatch(searchTerms,content))

  return (
    <div>
      <Box 
        sx={{
          overflowX:'auto',
          overflowY:'hidden',
          boxShadow: '5',
          borderRadius: 1,
          display: 'flex',
          width:'100%',
          alignItems: 'center',
          color: 'text.secondary',
          bgcolor: 'background.paper',
        }}
      >
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <img src={undoIcon}/>
        </Button>
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <img src={redoIcon} />
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <img src={eraseIcon} />
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <img src={lineIcon} />
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Select  
          value={1}
          autoWidth
          displayEmpty
          disableUnderline='true'
          sx={{ height:'35px', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}> 
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              <img src={headingIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              <img src={headingIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
              <img src={headingIcon} width={'10px'}/>
            </Button>
          </MenuItem>
        </Select>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Select  
          value={1}
          autoWidth
          displayEmpty
          sx={{ height:'35px', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
              <img src={italicIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
            >
              <img src={boldIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
                {...editorButton}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={ !editor.can().chain().focus().toggleStrike().run()}
              >
              <img src={strikeIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().setUnderline().run()}
              disabled={editor.isActive('underline')}
            >
              <img src={underlineIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
              Highlight
            </Button>
          </MenuItem>
        </Select>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Select  
          value={1}
          autoWidth
          displayEmpty
          sx={{ height:'35px', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <img src={bulletIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <img src={listIcon} />
            </Button>
          </MenuItem>
        </Select>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Select  
          value={1}
          autoWidth
          displayEmpty
          sx={{ height:'35px', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <img src={quoteIcon} />
            </Button>
          </MenuItem>
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <img src={codeBlockIcon} />
            </Button>
          </MenuItem>
        </Select>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Select  
          value={1}
          autoWidth
          displayEmpty
          sx={{ height:'35px', '.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}>
            <Button
            onClick={() => editor.chain().focus().insertTable({rows:3,cols:2,withHeaderRow:true}).run()}
            >
              <img src={tableIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().deleteTable().run()}>
            <img src={deleteTableIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().addColumnBefore().run()}>
            <img src={addLeftIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            <img src={addRightIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().addRowBefore().run()}>
            <img src={addTopIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().addRowAfter().run()}>
            <img src={addBottomIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().deleteColumn().run()}>
            <img src={deleteColumnIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().deleteRow().run()}>
            <img src={deleteRowIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().mergeCells().run()}>
            <img src={mergeCellIcon} />
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
            <img src={colorCellIcon} />
            </Button>
          </MenuItem>
        </Select>
      </Box>
    </div>
  )
}

export default TextEditBar