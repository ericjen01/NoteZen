import {
  Box,
  Button,
  Select, 
  MenuItem, 
}from '@mui/material';
import { editorButton } from '../styles';
import boldIcon from '../assets/bold.png'
import listIcon from '../assets/list.png'
import lineIcon from '../assets/line.png'
import undoIcon from '../assets/undo.png'
import redoIcon from '../assets/redo.png'
import quoteIcon from '../assets/quote.png'
import eraseIcon from '../assets/erase.png'
import tableIcon from '../assets/table.png'
import strikeIcon from '../assets/strike.png'
import italicIcon from '../assets/italic.png'
import bulletIcon from '../assets/bullet.png'
import markerIcon from '../assets/marker.png'
import addTopIcon from '../assets/addtop.png'
import headingIcon from '../assets/heading.png'
import addLeftIcon from '../assets/addleft.png'
import addRightIcon from '../assets/addright.png'
import codeBlockIcon from '../assets/codeblock.png'
import underlineIcon from '../assets/underline.png'
import addBottomIcon from '../assets/addbottom.png'
import deleteRowIcon from '../assets/deleteRow.png'
import colorCellIcon from '../assets/colorcell.png'
import mergeCellIcon from '../assets/mergecells.png'
import deleteColumnIcon from '../assets/deleteCol.png'

const TipTapButtonGroup = ({editor}) => {
  return(
    <div>
      <Box 
        sx={{
          zIndex:'3',
          bottom:'55px',
          boxShadow: '5',
          borderRadius: 1,
          display: 'flex',
          position:'fixed',
          overflowX:'auto',
          overflowY:'hidden',
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
          <img src={undoIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <img src={redoIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton} 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <img src={eraseIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          <img src={headingIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <img src={italicIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <img src={boldIcon} width={'15px'}/>
        </Button>
        <Button
            {...editorButton}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={ !editor.can().chain().focus().toggleStrike().run()}
          >
          <img src={strikeIcon} width={'15px'}/>
        </Button>
        <Button
          {...editorButton}
          onClick={() => editor.chain().focus().setUnderline().run()}
          disabled={editor.isActive('underline')}
        >
          <img src={underlineIcon} width={'15px'}/>
        </Button>
        <Button 
          {...editorButton}
          onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
          <img src={markerIcon} width={'15px'}/>
        </Button>
        <Select  
          value={1}
          autoWidth
          displayEmpty
          IconComponent = {()=>null}
          inputProps= {{ sx: { padding: '0 !important' } }}
          sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <img src={bulletIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <img src={listIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <img src={quoteIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <img src={codeBlockIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton} 
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <img src={lineIcon} width={'15px'}/>
            </Button>
          </MenuItem>
        </Select>
        <Select  
          value={1}
          autoWidth
          displayEmpty
          IconComponent = {()=>null}
          inputProps= {{ sx: { padding: '0 !important' } }}
          sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}} 
        >
          <MenuItem value={1}>
            <Button
              {...editorButton}
              onClick={() => editor.chain().focus().insertTable({rows:3,cols:2,withHeaderRow:true}).run()}
            >
              <img src={tableIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              {...editorButton} 
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              X
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <img src={addLeftIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <img src={addRightIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <img src={addTopIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <img src={addBottomIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <img src={deleteColumnIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <img src={deleteRowIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              <img src={mergeCellIcon} width={'15px'}/>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button 
              {...editorButton}
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              <img src={colorCellIcon} width={'15px'}/>
            </Button>
          </MenuItem>
        </Select>
      </Box>
    </div>
  )
}

export default TipTapButtonGroup