import axios from "axios";

const baseUrl = 'http://localhost:3001/api'

const getUsers = async () => {
	const res = await axios.get(`${baseUrl}/users`);
  return res.data
};


const login = async credential => {
    console.log("services>login: credential ", credential)
    const res = await axios.post(`${baseUrl}/login`, credential)
    return res.data
}

const signup = async credential => {
    console.log("services>signup: credential ", credential)
    const res = await axios.post(`${baseUrl}/users`, credential)
    console.log('res: ', res)
    return res.data
}
 
export default { login, signup, getUsers }