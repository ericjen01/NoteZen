import { 
  Link,
  Paper,
  Table,
  Toolbar,
  TableRow, 
  TableBody,
  TableCell,
  Typography,
} from '@mui/material'
import SortMenu from './SortMenu';
import userStore from './userStore';
import Highlighter from "react-highlight-words"
import { useNavigate } from 'react-router-dom';

import TextSnippetIcon from '@mui/icons-material/TextSnippet';


const Notes = () => {


  const {notes} = userStore()
  const {labelIdx} = userStore()
  const navigate =  useNavigate()
  const {searchTerms} = userStore()

  const quickFilter = (terms, inputNotes) => {
    if ("" === terms || terms.length <1) return inputNotes;
    terms = terms.map(val => val.replace(/"/g, ""));
    const filteredNotes = inputNotes.filter((n) => {
      const v = Object.values(n);
      const f = JSON.stringify(v).toLowerCase();
      return terms.every(term => f.includes(term));
    });
    return filteredNotes
  };
  const notesToShow = quickFilter(searchTerms, notes)

  const showDate = (noteObj) => {
    const oneDay = 24 * 60 * 60 * 1000
    const today = new Date()
    const createdDate = new Date(noteObj.created)
    const editedDate = new Date(noteObj.edited)
    if (labelIdx === 3){
      const dayCount = Math.round(Math.abs((today - editedDate)/oneDay))
      if(dayCount < 8) {
        return (`Edited ${dayCount} days ago`)
      } else return (`Edited on ${noteObj.edited}`) 
    }else{
      const dayCount = Math.round(Math.abs((today - createdDate)/oneDay))
      if(dayCount < 8) {
        return (`Created ${dayCount} days ago`)
      } else return (`Created on ${noteObj.created}`) 
    }
  }

  const styleObj = {
    "&:hover": {
      backgroundColor: "rgba(225,225,225,0.15)"
    },
    "&:active": {
      backgroundColor: "rgba(225,225,225,0.15)"
    }
  };
  
  const preventDefault = (e) => {
    e.preventDefault();
  }
  
  const noteCount = (obj) => {
    if(obj.length > 1) {return (`${obj.length} notes`)}
    else { return (`${obj.length} note`) }
  } 

  return (
    <Paper>
      <Toolbar>
        <p>{noteCount(notesToShow)}</p>
        <SortMenu/>
      </Toolbar>
      <Table size='small' >
        {notesToShow.map((n, i) => (
          i < 5 ?
            <TableBody key={i} onClick={()=>navigate(`/note/${n.id}`)} sx={styleObj}>
                <TableRow>
                  <TableCell sx={{ borderBottom: "none", verticalAlign: 'top' }}>
                    <TextSnippetIcon className='txtsnippetIcon'/>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <div className='noteTitle'>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={searchTerms}
                        autoEscape={true}
                        textToHighlight={n.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "none" }}/>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <div className='noteContent'>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={searchTerms}
                        autoEscape={true}
                        textToHighlight={n.content}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell/>
                  <TableCell>
                      <Typography fontSize={'small'}>{showDate(n)}</Typography>
                  </TableCell>
                </TableRow>
            </TableBody>
          : null
        ))}
      </Table> 
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Paper>
  );
}

export default Notes