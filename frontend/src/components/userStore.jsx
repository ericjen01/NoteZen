import { create } from 'zustand'
import { data } from '../data';
import TitleIcon from '@mui/icons-material/Title';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

const userStore = create((set) => ({
  notes: data,
  labelIdx: 0,
  sortType: [
    { "id": 0, "txt": 'Newest First', "icon": <ChildFriendlyIcon/>},
    { "id": 1, "txt": 'Oldest First', "icon": <InventoryIcon/>},
    { "id": 2, "txt": 'Title (A-Z)', "icon": <TitleIcon/>},
    { "id": 3, "txt": 'Last Edited', "icon": <EditNoteIcon/>},
  ],
  searchTerms: [''],
  setLabelIdx: (idx) => set(() => ({labelIdx:idx})),
  setNotes: (obj) => set(() => ({notes:obj})),
  setSorType: (txt) => set(() => ({sortType:txt})),
  setSearchTerms: (terms) => set(() => ({searchTerms:terms})),
}))

export default userStore;