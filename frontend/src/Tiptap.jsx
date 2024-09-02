import './styles.scss'
import {editorButton}  from './styles'
import listIcon from './assets/list.png'
import lineIcon from './assets/line.png'
import undoIcon from './assets/undo.png'
import redoIcon from './assets/redo.png'
import strikeIcon from './assets/strike.png'
import italicIcon from './assets/italic.png'
import bulletIcon from './assets/bullet.png'
import quoteIcon from './assets/quote.png'
import eraseIcon from './assets/erase.png'
import headingIcon from './assets/heading.png'
import codeBlockIcon from './assets/codeblock.png'
import underlineIcon from './assets/underline.png'
import Table from '@tiptap/extension-table'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TableRow from '@tiptap/extension-table-row'
import ListItem from '@tiptap/extension-list-item'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

import {
  Box,
  Button,
  Select, 
  Divider,
  MenuItem, 
}from '@mui/material';

const extensions = [
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
]

const content = `
<h2>
Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
`


const TextEditorBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

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
          sx={{px:"20px"}}
        >
          <img src={undoIcon} width={'20px'}/>
        </Button>
        <Button
          sx={{px:"20px"}}
          {...editorButton} 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <img src={redoIcon} width={'20px'}/>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          sx={{px:"20px"}}
        >
          <img src={eraseIcon} width={'20px'}/>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          sx={{px:"20px"}}
        >
          <img src={lineIcon} width={'20px'}/>
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
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              <img src={headingIcon} width={'20px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              <img src={headingIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
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
              <img src={italicIcon} width={'20px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
                {...editorButton}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={ !editor.can().chain().focus().toggleStrike().run()}
              >
              <img src={strikeIcon} width={'20px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().setUnderline().run()}
              disabled={editor.isActive('underline')}
            >
              <img src={underlineIcon} width={'20px'}/>
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
              <img src={bulletIcon} width={'20px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <img src={listIcon} width={'20px'}/>
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
              <img src={quoteIcon} width={'20px'}/>
            </Button>
          </MenuItem>
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <img src={codeBlockIcon} width={'20px'}/>
            </Button>
          </MenuItem>
        </Select>
      </Box>
    </div>
    
  )
}

const TableEditorBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    console.log('tableeditor: ', editor)
    console.log('tableeditor not found: ')
    return null
  }
  return (
    <>
       <button
        onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 1, withHeaderRow: true }).run()
        }
      >
        insertTable
      </button>
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        addColumnBefore
      </button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter</button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>deleteColumn</button>
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>addRowBefore</button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>addRowAfter</button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow</button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>deleteTable</button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells</button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        toggleHeaderColumn
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        toggleHeaderRow
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        toggleHeaderCell
      </button>
    </>
  )
}

const Tiptap = () => (
  <>
    <EditorProvider 
      slotBefore={<TextEditorBar/>} 
      slotAfter={<TableEditorBar/>} 
      extensions={extensions} 
      content={content}
    />
  </>
)

export default Tiptap