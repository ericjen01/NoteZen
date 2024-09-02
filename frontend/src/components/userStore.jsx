import { create } from 'zustand'
import TitleIcon from '@mui/icons-material/Title';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

import notesService from '../services/notesService';

const notes = await notesService.getAll()

const userStore = create((set) => ({
  notes: notes,
  labelIdx: 0,
  sortType: [
    { "id": 0, "txt": 'Newest First', "icon": <ChildFriendlyIcon/>},
    { "id": 1, "txt": 'Oldest First', "icon": <InventoryIcon/>},
    { "id": 2, "txt": 'Title (A-Z)', "icon": <TitleIcon/>},
    { "id": 3, "txt": 'Last Edited', "icon": <EditNoteIcon/>},
  ],
  searchTerms: [''],
  setNotes: (arr) => set(() => ({notes:arr})),
  setSorType: (txt) => set(() => ({sortType:txt})),
  setLabelIdx: (idx) => set(() => ({labelIdx:idx})),
  setSearchTerms: (terms) => set(() => ({searchTerms:terms})),
}))

export default userStore;