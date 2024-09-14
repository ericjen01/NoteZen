import axios from 'axios'
import userStore from '../components/userStore';

const baseUrl = 'http://localhost:3001/api/notes'


let token;
const config = () => ({
    headers: {
        Authorization: token,
    },
});

const handleMessage = (message, type, detail) => {
  console.log(type, 'message', detail)
}

const getAll = async () => {
	const res = await axios.get(baseUrl);
  return res.data
};

const create = async (newObj) => {
  const {setNotes} = userStore
  const {notes} = userStore
  try{
    const res = await axios.post(baseUrl, newObj, config())
    return res.then(r =>{
      handleMessage('new note added: ', 'success', r)
      setNotes(notes.concat(res))
      return r.data
    })
  } catch(ex) {
    handleMessage('New blog creation failed', 'error', ex)
  }
}

const update = async (id, newObj) => {
  try{
    const res = await axios.put(`${baseUrl}/${id}`, newObj)
    return res.then(r =>{
      handleMessage('note updated: ', 'success', r.data)
      return r.data
    })
  }catch(err) {
    handleMessage('update failed:', 'error', err.message)
  }
}

/*
export const showNotif = (msg, secs) => (dispatchCommand) =>{
  dispatchCommand(createNotif(msg))

  setTimeout(() => {
    dispatchCommand(muteNotif())
  }, 1000*secs)
}
*/


export default {
  create,
  update,
  getAll, 
}
