import { create } from 'zustand'
import TitleIcon from '@mui/icons-material/Title';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

const userStore = create((set) => ({
  user:'',
  users:{},
  email:'',
  title:'',
  notes:[],
  edited:'',
  content:'',
  created:'',
  emailErr:'',
  labelIdx: 0,
  password:'',
  newNote: {},
  message: null,
  passwordErr:'',
  searchTerms: [''],
  showPassword:false,
  slideMenuOpen:false,
  signupFormOpen:false,
  sortType: [
    { "id": 0, "str": 'Newest First', "icon": <ChildFriendlyIcon/>},
    { "id": 1, "str": 'Oldest First', "icon": <InventoryIcon/>},
    { "id": 2, "str": 'Title (A-Z)', "icon": <TitleIcon/>},
    { "id": 3, "str": 'Last Edited', "icon": <EditNoteIcon/>},
  ],
  setUser: (obj) => set(() => ({user:obj})),
  setUsers: (arr) => set(() => ({users:arr})),
  setNotes: (arr) => set(() => ({notes:arr})),
  setEmail: (str) => set(() => ({email:str})),
  setNewNote: (obj) => set(() => ({newNote:obj})),
  setSorType: (str) => set(() => ({sortType:str})),
  setPassword: (str) => set(() => ({password:str})),
  setLabelIdx: (idx) => set(() => ({labelIdx:idx})),
  setEmailErr: (str) => set(() => ({emailErr:str})),
  setMessage: (str) => set(() => ({message:str})),
  setPasswordErr: (str) => set(() => ({passwordErr:str})),
  setSearchTerms: (terms) => set(() => ({searchTerms:terms})),
  setShowPassword:(boolean) => set(() => ({showPassword:boolean})),
  setSlideMenuOpen: (boolean) => set(() => ({slideMenuOpen:boolean})),
  setSignupFormOpen: (boolean) => set(() => ({signupFormOpen:boolean})),
}))

export default userStore;