import { 
  Link,
  Table,
  Toolbar,
  TableBody,
  TableCell,
  Typography,
  TableRow, 
} from '@mui/material'
import * as React from 'react';
import userStore from './userStore';
import Highlighter from "react-highlight-words"
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SortSelect from './SortSelect';

/*
const Title = (props) => (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
)

Title.propTypes = {
  children: PropTypes.node,
};
*/

function preventDefault(event) {
  event.preventDefault();
}

const noteCount = (obj) => {
  if(obj.length > 1) {return (`${obj.length} notes`)}
  else { return (`${obj.length} note`) }
} 

const Notes = () => {
  const {notes} = userStore()
  const {labelIdx} = userStore()
  const {searchTerms} = userStore()

  const quickFilter = (terms, notes) => {
    if ("" === terms || terms.length <1) return notes;
    terms = terms.map(val => val.replace(/"/g, ""));
    const filteredNotes = notes.filter((n) => {
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

  return (
    <React.Fragment>
      <Toolbar>
        <p>{noteCount(notesToShow)}</p>
        <SortSelect/>
      </Toolbar>
      <Table size='small'>
        {notesToShow.map((n, i) => (
          i < 5 ?
            <TableBody key={i}>
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
    </React.Fragment>
  );
}

export default Notes