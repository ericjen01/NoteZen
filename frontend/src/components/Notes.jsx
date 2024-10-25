import { 
  Link,
  Paper,
  Table,
  Button,
  Toolbar,
  TableRow, 
  TableBody,
  TableCell,
  Typography,
} from '@mui/material'
import SortMenu from './SortMenu';
import userStore from './userStore';
import { addButtonStyle } from '../styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Highlighter from "react-highlight-words"
import { showDate } from '../functions/functions';
import { quickFilter } from '../functions/functions';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Notes = () => {

  const {notes} = userStore()
  const {labelIdx} = userStore()
  const navigate =  useNavigate()
  const {searchTerms} = userStore()
  const notesToShow = quickFilter(searchTerms, notes)

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
        <h4>{noteCount(notesToShow)}</h4>
        <SortMenu/>
        <Button 
          {...addButtonStyle}
          onClick={()=>navigate("../create")} 
        > 
          <AddIcon/>
        </Button>
      </Toolbar>
      <Table size='small' >
        {notesToShow.map((n, i) => (
          i < 5 ?
            <TableBody 
              key={i} 
              sx={styleObj}
              onClick={()=>navigate(`/note/${n.id}`)} 
            >
              <TableRow>
                <TableCell 
                  sx={{ borderBottom: "none", verticalAlign: 'top' }}
                >
                  <TextSnippetIcon className='txtsnippetIcon'/>
                </TableCell>
                <TableCell 
                  sx={{ borderBottom: "none" }}
                >
                  <div className='noteTitle'>
                    <Highlighter
                      autoEscape={true}
                      textToHighlight={n.title}
                      searchWords={searchTerms}
                      highlightClassName="YourHighlightClass"
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}/>
                <TableCell sx={{ borderBottom: "none" }}>
                  <div className='noteContent'>
                    <Highlighter
                      autoEscape={true}
                      searchWords={searchTerms}
                      textToHighlight={n.content}
                      highlightClassName="YourHighlightClass"
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell/>
                <TableCell>
                    <Typography fontSize={'small'}>
                      {showDate(n, labelIdx)}
                    </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          : null
        ))}
      </Table>
      {notesToShow.length > 0 ?
         <Link 
          href="#" 
          sx={{ mt:3, ml:'40%' }}
          color="primary" 
          onClick={preventDefault} 
        >
          See more Notes
        </Link>
        : 
        <Typography 
          sx={{ mt:3, ml:'40%' }}
        >
          --No Note To Show--
        </Typography>
      } 
    </Paper>
  );
}

export default Notes