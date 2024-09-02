--- 1-a Create React App
    npm create vite@latest <project directory name> --template react

    cd <project directory name>
    npm install

    npm run dev

--- 1-a Component
    index.js/main.jsx:
    import ReactDOM from 'react-dom/client'
    import App from './App'
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)

    App.jsx:
    const App = () => {
      return (
        <div>
          <p>Hello world</p>
        </div>
      )
    }
    export default App

--- 1-d Exercises 1.6.-1.14
    rm -rf node_modules/ && npm i

--- 2-c (Backend) Getting Data From Server
    npm install -g json-server
    json-server --port 3001 --watch db.json
    npx json-server --port 3001 --watch db.json

--- 2-c Axios and Promises
    npm install axios
    npm install json-server --save-dev
    npm run server

--- 3-a Create a Backend App
    npm init

--- 3-a Simple Web Server
    {
      // ...
      "scripts": {

        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ...
    }

    node index.js
    npm start

--- 3-a Rest
      Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's dissertation. REST is an architectural style meant for building scalable web applications.

--- 3-a Express
      Express. js is a backend framework for creating web applications in Node. js, while React is a frontend library for building user interfaces. When combined, they create a robust and efficient full-stack web application
    npm install express
    
    npm update
    npm install

    const express = require('express')
    const app = express()


--- 3-a Nodemon for backend
    npm install --save-dev nodemon
    node_modules/.bin/nodemon index.js

    {
      // ..
      "scripts": {
        "start": "node index.js",

        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ..
    }

    npm run dev

--- exercise 3.7
    https://github.com/expressjs/morgan
    npm install morgan
    morgan(':method :url :status :res[content-length] - :response-time ms')


--- 3-b Same Origin Policy & Cors
    npm install cors

    const cors = require('cors')
    app.use(cors())

--- 3-b Application to The Internet
    fly auth login
    fly launch
    fly deploy
    fly open

--- 3-b Frontend Production build
    npm run build
    app.use(express.static('dist'))

--- 3-c Backend MongoDB
    go to mongoDB site, register and click connect, select 'connect to your app'

    copy the MONGODB URL 'mongodb+srv://${pr....' <--- add to index.js (see below)

    MONGODB_URI=mongodb+srv://<Username>:<Password>@cluster0.idyl0ve.mongodb.net/<dataBaseName>?retryWrites=true&w=majority
 
    npm install mongoose
    npm install dotenv <--- for process.env.MONGODB_URI

    OR: npm install mongoose dotenv for both

    create a schema file (eg. author.js, book.js etc) in backend/models folder:
      "part8/backend/models/author.js"

        /*const mongoose = require('mongoose')
        const uniqueValidator = require('mongoose-unique-validator')*/

        import { Schema, model } from 'mongoose'
        import uniqueValidator from 'mongoose-unique-validator'

        const schema = new mongoose.Schema({
          name: {
            type: String,
            required: true,
            unique: true,
            minlength: 4
          },
          born: {
            type: Number,
          },
        })
        schema.plugin(uniqueValidator)
       // module.exports = mongoose.model('Author', schema)
       export default model('Author', schema)


      "part8/backend/models/book.js"

        const mongoose = require('mongoose')
        const uniqueValidator = require('mongoose-unique-validator')
        const schema = new mongoose.Schema({
          title: {
            type: String,
            required: true,
            unique: true,
            minlength: 5
          },
          published: {
            type: Number,
          },
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
          },
          genres: [
            { type: String}
          ]
        })
        schema.plugin(uniqueValidator)
        module.exports = mongoose.model('Book', schema)

    in index.js:

     /* require('dotenv').config()  <--- for process.env.MONGODB_URI
      const mongoose = require('mongoose')
      mongoose.set('strictQuery', false)
      const Author = require('./models/author')
      const Book = require('./models/book') */

      import mongoose from 'mongoose'
      import Author from './models/author'
      import Book from './models/book'
      import { GraphQLError } from 'graphql';
      import "dotenv/config.js";

      const url =`mongodb+srv://${projectName}:${password}... ...`
      (replace it with const MONGODB_URI = process.env.MONGODB_URI)

      const { startStandaloneServer } = require('@apollo/server/standalone')
      const { v1: uuid } = require('uuid')

      let books/user etc = [
        title:....
      ]

      mongoose.connect(url or MONGDB_URI).then(() => {
        console.log('connected to MongoDB')
      })
      .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
      })

          
      const typeDefs = `
        type Author {
            type Book {
            title: String!
            published: String!
            author: String!...}`

      const resolvers = {
        Query: {
          bookCount: async () => Book.collection.countDocuments(),
          authorCount: async () => Author.collection.countDocuments(),
          
          allBooks: async (root, args) => {
            if(args.author && args.genres){
              return Book.find( {author: args.author, genres:{ $in: args.genres}} )
            }
            else if(args.author){
              return Book.find({ author: args.author })
            }
            else{
              return Book.find({})
            } 

          allAuthors: async () => 
            return Author.find({})...
       },

        Mutation: {
          addBook: async (root, args) => {
            const foundAuthor = Author.findOne({ name: args.author })
            const book = new Book({ ...args, author: foundAuthor })
            try{
              await book.save()
            } catch (error) {
              throw new GraphQLError('saving book failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args,
                  error
                }
              })
            }
            return book
            ....
      

      mongoose.set('strictQuery',false)
      mongoose.connect(url)
      MONGODB_URI=address_here npm run dev

      const PORT = process.env.PORT
      app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)

--- 3-c Database Config into Its Module
    npm install dotenv
    fly secrets set MONGODB_URI='mongodb+srv://<projectName>:<password>... ...'

--- 3d Lint
    npm install eslint --save-dev
    npx eslint --init
    'env': {
            'commonjs': true,
            'es2021': true,
            'node': true
        },
      'rules': {
            'indent': [
                'error',
                2
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'never'
            ]
        }

        npx eslint index.js

        "scripts": {
            "lint": "eslint ."
        },

        npm run lint

--- 4-a Project Structure
    ├── index.js
    ├── app.js
    ├── dist
    │   └── ...
    ├── controllers
    │   └── notes.js
    ├── models
    │   └── note.js
    ├── package-lock.json
    ├── package.json
    ├── utils
    │   ├── config.js
    │   ├── logger.js
    │   └── middleware.js  

--- 4-a Exercises 4.1-4.2
    npm install mongoose@7.6.5

--- 4-a Testing Node Applications
    npm install --save-dev jest

    "scripts": {
      ...
      "test": "jest --verbose"
    },
    "jest": {
      "testEnvironment": "node"
    }

    npm script test
    npm test

--- 4-b Testing Enviroment
    npm install --save-dev cross-env
    npm install cross-env

    npm install --save-dev supertest

    npm test -- tests/note_api.test.js
    npm test -- -t "a specific note is within the returned notes"
    npm test -- -t 'notes'

    npm install express-async-errors
    npm test -- tests/note_api.test.js


--- 4-b Eliminating The Try-Catch
    npm install express-async-errors 
    
    *introduce the library in app.js, before importing the routes:

    const config = require('./utils/config')
    const express = require('express')
    require('express-async-errors')
    const app = express()
    const cors = require('cors')
    const notesRouter = require('./controllers/notes')
    const middleware = require('./utils/middleware')

--- 4-c Creating Users
    npm install mongoose-unique-validator
    npm install mongoose@7.6.5

--- 4-d Limiting Creating New Notes to Logged-in Users
    npm install jsonwebtoken

    ---------------------------------------
    React eslint error missing in props validation
      /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
    OR
      add rule in .eslintrc.cjs:

        "rules": {
        "react/prop-types": "off"
        }

--- 5-b Prop-Types Package
    npm install prop-types

--- 5-b ESlint For The Frontend
    npm install --save-dev eslint-plugin-jest

    create .eslintrc.cjs 

    create .eslintignore with the following contents to the repository root

    npm run lint

--- 5-c Testing React App Frontend

    npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @babel/preset-env @babel/preset-react

    in package.json:
      {
        "scripts": {
          // ...
          "test": "jest"
        }
        // ...
        "jest": {
          "testEnvironment": "jsdom"
        }
      }

    for .babelrc:
      {
        "presets": [
          "@babel/preset-env",
          ["@babel/preset-react", { "runtime": "automatic" }]
        ]
      }

    Clicking buttons in tests
    npm install --save-dev @testing-library/user-event

--- 5-d Cypress

    npm install --save-dev cypress
      "scripts": {
        "dev": "vite --host",
        "cypress:open": "cypress open"

    npm run cypress:open

    add an npm script to the backend
      "scripts": {
          "start:test": "NODE_ENV=test node index.js",

    Cy error fix:
      npm install eslint-plugin-cypress --save-dev

      change configuration in .eslintrc.cjs:

      module.exports = {
      "env": {
        "cypress/globals": true
      "plugins": [
          "react", "jest", "cypress"
      ],
      }
    }

    Controlling the state of the database

      if (process.env.NODE_ENV === 'test'){...}

      npm run start:test

      backend:

        npm install --save-dev cross-env

        "scripts": {
          "start": "cross-env  NODE_ENV=production node index.js",
          "dev": "cross-env  NODE_ENV=development nodemon index.js",
          "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
          "lint": "eslint .",
          "start:test": "cross-env NODE_ENV=test node index.js"
        },

        .env
          TEST_MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/TestBlogApp
          ?retryWrites=true&w=majority

        config.js
          require('dotenv').config()
          const PORT = process.env.PORT
          const MONGODB_URI = process.env.NODE_ENV === 'test'
            ? process.env.TEST_MONGODB_URI
            : process.env.MONGODB_URI

--- 6-a Redux
    npm install redux

    cd unicafe-redux   // go to the directory of cloned repository
    rm -rf .git
    npm install

--- 6-b Redux Toolkit
    npm install @reduxjs/toolkit

    -- create a store file store.jsx in src folder

        import { configureStore } from '@reduxjs/toolkit'
        import blogReducer from './reducers/blogReducer'
        import loginReducer from './reducers/loginReducer'
        ....

        const store = configureStore({
          reducer: {
            storedUser: loginReducer, 
            blogs: blogReducer,
            users: userReducer,
            notif: notifReducer,
            comments: commentReducer
          }
        })
        store.subscribe(() => {console.log(store.getState())})

        export default store


    -- Create a reducer file (noteReducer/blockReducer etc...):

        import { createSlice } from "@reduxjs/toolkit";

        const notifSlice = createSlice({
          name: 'notif',
          initialState: {
            message: null,
            type: null
          },
          reducers: {
            showNotif(state, action){
              return action.payload
            },

            hideNotif(){
              return ''
            }
          } 
        })

        export const {showNotif, hideNotif} = notifSlice.actions

        // AC as Action Creator
        export const storedUserAC = () => {
          return dispatchCommand => {
            const userInLocalStorage = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

            if(userInLocalStorage){
              dispatchCommand(initUser(userInLocalStorage))
              blogService.setToken(userInLocalStorage.token)
            }
          }
        }

        export const initAllUsersAC = () => {
          return async dispatchCommand => {
            const users = await userService.get()
            window.localStorage.setItem('allStoredUsers', JSON.stringify(users))

            dispatchCommand(setUser(users))
            }
        }

        export const notifyAC = (message, type, seconds) => {  
          const notif = {
            message: message,
            type: type
          }
          console.log('notif: ', notif)

          return dispatchCommand => {
            dispatchCommand(showNotif(notif))
            setTimeout(()=>{
              dispatchCommand(hideNotif())
            }, seconds*1000)
          }
        }

        export default notifSlice.reducer

    -- In App.jsx or places the stored needs to be accessed:

          import { initUser, logoutAC } from './reducers/loginReducer'
          import { storedUserAC } from './reducers/loginReducer'
          import { initBlogAC } from './reducers/blogReducer'
          import { btnStyle } from './components/Styling'
          import { initAllUsersAC } from './reducers/userReducer'
          import { initCommentsAC } from './reducers/commentReducer'

          useEffect(() => {
          dispatch(storedUserAC())

          if(userInLocalStorage){
            dispatch(initUser(userInLocalStorage)) 
          } 
          //dispatch(initUser())
          dispatch(initBlogAC())
          dispatch(initCommentsAC())
          dispatch(initAllUsersAC())
          }, [])

          const storedUser = [useSelector(state => state.storedUser)]
          const allUsers = [useSelector(state => state.users)]



--- 6-c Redux Thunk
    https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application
    https://redux.js.org/usage/writing-logic-thunks
    https://redux-toolkit.js.org/api/createAsyncThunk

    // fetchTodoById is the "thunk action creator"
    export function fetchTodoById(todoId) {
      // fetchTodoByIdThunk is the "thunk function"
      return async function fetchTodoByIdThunk(dispatch, getState) {
        const response = await client.get(`/fakeApi/todo/${todoId}`)
        dispatch(todosLoaded(response.todos))
      }
    }

--- 6-d Managing data on the server with the React Query library
    npm install @tanstack/react-query

    in main/index file:
      import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
      ...
      const queryClient = new QueryClient()
      ...
      ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      )

--- 7-a React Router
    npm install react-router-dom

    in index/main: 

      import {  BrowserRouter as Router } from 'react-router-dom'
      ReactDOM.createRoot(document.getElementById('root')).render(<Router><Provider store={store}><App/></Provider></Router>)

    in App:

      import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
      import { Grid, Container, Button, AppBar, Toolbar } from '@mui/material'

      return(
        <Container>
          <AppBar sx={{borderRadius:1}} position='static'>
            <Toolbar>
              <Button color='inherit' component={Link}to='/'>Home</Button>
              <Button color='inherit' component={Link}to='/blogs'>Blogs</Button>
              <Button color='inherit' component={Link}to='/users'>Users</Button>
              {userInLocalStorage 
                ? <div style={{marginLeft: 'auto', fontFamily:'arial', fontSize:'.75rem'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                      <span>Logged in as: <br/> '{userInLocalStorage.username}'</span>
                      <Button color='inherit' {...btnStyle} onClick={handleLogout}>Logout</Button>
                    </div>
                  </div>

                : <div style={{marginLeft:'auto', marginRight:'.5rem'}}>
                    <Button color="inherit" {...btnStyle} component={Link} to="/login"> Login </Button>
                  </div>
              }
            </Toolbar>
          </AppBar>
          <Notification/>
          <Routes>
            <Route path='/blogs' element={<BlogListing/>} />
            <Route path='/' element={userInLocalStorage? <Home/> : <LoginForm/>} />
            <Route path='/login' element={userInLocalStorage? <Home/> : <LoginForm/>} />
            <Route path='/users' element={userInLocalStorage? <UserListing/> : <LoginForm/>} />
            <Route path="/users/:id" element={userInLocalStorage? <SingleUserPage/>: <LoginForm/>} />
            <Route path='/blogs/:id' element={userInLocalStorage? <SingleBlogPage/> : <LoginForm/>}/>
          </Routes>
          <Footer/>
        </Container>
      )

--- 7-c React Bootstrap
    npm install react-bootstrap

    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />
      // ...
    </head>

--- 7-c Material UI
    npm install @mui/material @emotion/react @emotion/styled

    Render the contents of the whole application within a Container:

      import { Container } from '@mui/material'

      const App = () => {
        // ...
        return (
          <Container>
            // ...
          </Container>
        )
      }

--- Material UI Datepicker

      npm install @mui/x-date-pickers
      // Install date library (if not already installed)
      npm install dayjs
      npm install dayjs --save

--- 8-a GraphQL is a query language, architecture style, and set of tools to create and manipulate 
          APIs. REST is good for simple data sources where resources are well defined

--- 8-a Apollo (backend)
      Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client

      Create a new npm project with npm init and install the required dependencies.

      npm install @apollo/server graphql

      Also create a index.js file in your project's root directory.
      The initial code is as follows:

        const { ApolloServer } = require('@apollo/server')
        const { startStandaloneServer } = require('@apollo/server/standalone')

        let persons = [
          {
            name: "Arto Hellas",
            phone: "040-123543",
            street: "Tapiolankatu 5 A",
            city: "Espoo",
            id: "3d594650-3436-11e9-bc57-8b80ba54c431"
          },
          {
            name: "Matti Luukkainen",
            phone: "040-432342",
            street: "Malminkaari 10 A",
            city: "Helsinki",
            id: '3d599470-3436-11e9-bc57-8b80ba54c431'
          },
          {
            name: "Venla Ruuska",
            street: "Nallemäentie 22 C",
            city: "Helsinki",
            id: '3d599471-3436-11e9-bc57-8b80ba54c431'
          },
        ]

        const typeDefs = `
          type Person {
            name: String!
            phone: String
            street: String!
            city: String! 
            id: ID!
          }

          type Query {
            personCount: Int!
            allPersons: [Person!]!
            findPerson(name: String!): Person
          }
        `

        const resolvers = {
          Query: {
            personCount: () => persons.length,
            allPersons: () => persons,
            findPerson: (root, args) =>
              persons.find(p => p.name === args.name)
          }
        }

        const server = new ApolloServer({
          typeDefs,
          resolvers,
        })

        startStandaloneServer(server, {
          listen: { port: 4000 },
        }).then(({ url }) => {
          console.log(`Server ready at ${url}`)
        })

      Start the server by running node index.js in the terminal

--- 8-a Mutation, UUID, https://github.com/uuidjs/uuid#readme
      npm install uuid
      
      import { v4 as uuidv4 } from 'uuid';
      uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

--- 8-b Apollo Client for the frontend
      npm install @apollo/server graphql
      in the main.jsx/index.js file:

        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from './App'

        import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client'

        const client = new ApolloClient({
          uri: 'http://localhost:4000',
          cache: new InMemoryCache(),
        })

        ReactDOM.createRoot(document.getElementById('root')).render(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        )

      then we can start making queries in App.js

        import { gql, useQuery } from '@apollo/client'

        const ALL_PERSONS = gql`      ****!!!CAREFUL, everything inside of `` has to be correct (curly 
        query {                           braces, brackets etc) and match same order with the typeDefs in index in the backend
          allPersons {    
            name
            phone
            id
          }
        }
        `

        const App = () => {
          const result = useQuery(ALL_PERSONS)

          if (result.loading) {
            return <div>loading...</div>
          }

          return (
            <div>
              {result.data.allPersons.map(p => p.name).join(', ')}
            </div>
          )
        }

        export default App
---

--- 

-----------------------------------------------------------------------
Navigate to the local project directory and create a local git repository:

git init

Once that is successful, click on the 'Source Control' icon on the left navbar in VS-Code.One should be able to see files ready to be commit-ed. Press on 'Commit' button, provide comments, stage the changes and commit the files. Alternatively you can run from CLI

git commit -am "Your comment"

Now you need to visit your GitHub account and create a new Repository. Exclude creating 'README.md', '.gitIgnore' files. Also do not add any License to the repo. Sometimes these settings cause issue while pushing in.

Copy the link to this newly created GitHub Repository.

Come back to the terminal in VS-CODE and type these commands in succession:

  
  git remote add origin <Link to GitHub Repo,**use http not SSH**> //maps the remote repo link to local git repo

if you get an error message 'fatal: Could not read from remote repository' -> 
change your ssh url by an http url for your remote 'origin', use:

> git remote set-url origin https://github.com/<user_name>/<repo_name>.git

Please make sure you have the correct access rights
and the repository exists

git remote -v //this is to verify the link to the remote repo

git push -u origin master // pushes the commit-ed changes into the remote repo

Note: If it is the first time the local git account is trying to connect to GitHub, you may be required to enter credentials to GitHub in a separate window.

You can see the success message in the Terminal. You can also verify by refreshing the GitHub repo online.    


----------------------------------------------------------------------
** [vite] hmr invalidate /src/main.jsx Could not Fast Refresh
     If you are using .jsx files, you should modify the vite.config.js:

        plugins: [react({
          // Add this line
          include: "**/*.jsx",
        })]
    
    Or, if you are using typescript (.tsx), you can modify the vite.config.js:

        plugins: [react({
          // Add this line
          include: "**/*.tsx",
        })]

Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.

A non-serializable value was detected in an action, in the path....
  returning the entire Axios response object from async thunks can cause error. That includes some of the Axios config setup. Don't do that

  Instead, just return response.data

--- React Router: Cannot read property 'pathname' of undefined
    try to import the following on files suspected
    import { BrowserRouter as Router } from "react-router-dom"

--- React eslint error missing in props validation
    Consider just disabling this rule until the bugs are worked out or you've upgraded your tooling:
    /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
    Or disable project-wide in your eslintrc:

    "rules": {
      "react/prop-types": "off"
    }

--- If page flashes when an event handler is called, likely it's becasue it's missing:
    e.preventDefault(), or has a wrong

--- Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside of the body of a 
    function component. This could happen for one of the following reasons

    This problem can also come up when you use npm link or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming 'myapp' and 'mylib' are sibling folders, one possible fix is to run 'npm link ../myapp/node_modules/react' from 'mylib'. This should make the library use the application’s React copy.

    Thus, running the command: npm link <path_to_local_library>/node_modules/react, eg. in my case npm link ../../libraries/core/decipher/node_modules/react from the project directory has fixed the issue.

--- move style of material ui to another file in React

    You can do it like that

    export const btnStyle = { 
      sx:{m:0.5, px:0.75, py:0},
      size:'small', variant:'outlined'
    }

    export const gridProps = {
      container: true,
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }

    <Button {...btnStyle} />
    <Grid {...gridProps} />

--- infinite loops: careful, JSON.parse can possibly cause infinite loops

--- React-Redux state lost after refresh (part 7, userReducers)
    In your reducer file reducer/auth_reducer.js you can define the initial state of the reducer:

      const authenticationSlice = createSlice...
      name: 'authn',
      initialState: JSON.parse(window.localStorage.getItem('loggedBloglistUser')), <-- instead of [] or null
      reducers: ...

      ...
      const users = await userService.get()
      window.localStorage.setItem('allStoredUsers', JSON.stringify(users)) <-- local storage only takes string
    
--- ESLint Parsing error: Unexpected token
      just add:

      "parser": "@babel/eslint-parser"
      to your .eslintrc file and run npm install @babel/eslint-parser --save-dev

--- Send Token from front end with request:
      see exercise 7 bloglist-redux frontend services blogs.jsx
        
        let token;
        const config = () => ({
          headers: {
          Authorization: token,
          },
        });

        const setToken = (newToken) => {
          token = `Bearer ${newToken}`
        }
        ...

        const res = await axios.post(baseUrl.blogs, newObj, config())

--- Set password expiration time: see exercise 7 bloglist-redux, backend, controllers, login.js
        
        ...
        const token = jwt.sign(
          userForToken, 
          process.env.SECRET,
          { expiresIn: 60*60 }  <----
        )

--- redux data not saved/updated properly, showing 'type' and 'payload':
      check if async and await has been properly used in services, app creator & reducer

--- useContext is not a function or its return value is not iterable
      1. When using the useContext hook, the returned value is a single object, not an array.
      change the following statement.

        const [state, setState] = useStateContext();
        TO:
        const {state, setState} = useStateContext();

      2. or define the createContext() as createContext([])

        const UserContext98 = createContext([])
        with 
        const [state, setState] = useStateContext();

--- Cannot access [[promiseResult]] or the promise is showing pending

    - For the Front end, try use 'await' (without async) :

        const notes = notesService.getAll()  <--- returns <pending> promise

        const notes = await notesService.getAll()  <--- adding await solves the issue


    - If the .then or async/await doesn't work,
      try to store and retrieve the res.data through local storage:

        window.localStorage.setItem('allStoredUsers', JSON.stringify(res.data))

        JSON.parse(window.localStorage.getItem('allStoredUsers'))


--- Desctructured variables, curly bracets in the brackets
      this means the variable already exists in a function/object that can be desctructured to make the code more neat

      eg.
        exercise 7 bloglist-reactquery frontend,
        blogCtx and userCtx

        instead of 
          const UserCtxProvider = (props) => {
            ... {props.children} ...
        try
          const UserCtxProvider = ({children}) => {
            ... {children} ...
        
        instead of 
          export const userReducer = (state, action) => {

          switch(action.type){
          case 'setUser': 
          return action.payload...

        try 
          export const userReducer = (state, action) => {
          const {type, payload} = action
          
          switch(type){
          case 'setUser': 
          return payload...

 --- xxContext is not a function or its return value is not iterable, or
      Invalid hook call. Hooks can only be called inside of the body of a function component
        very likely it's because the <App> tag is not wrapped around by the <xxContext.Provider> tags in main.js file ( exercise 7 bloglist-reactquery frontend, main.jsx):
          
          <xxContextProvider>
            <App />  
          </xxContextProvider>

 ---  Invalid hook call. Hooks can only be called inside of the body of a function component 
      React hook cannot be called at the top level. It must be called in a react function.
      (ex 7 bloglist-reqctquery, loginReq, LoginCtx )

        Functions whose names start with use are called Hooks in React.
        Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. You can only call Hooks while React is rendering a function component:

        1. try call all the declared hook in the top-level file, say App.jsx, instead of children files
            
              const [... , ... ] = useContext(...)          <- bad. outside of function & at top level
            const App = () => {
              const dispatch = useDispatch()                      <-- good
              const [userState, userDisp] = useContext(UserCtx)   <-- good
          

        2. try move all the hook (useState, useReducer, useContext, useXXX... ) to the very top lines of
            a function. do not leave them outside a function:

              import { LoginCtx } from "../reducers/LoginCtx"
              ...
                const [loginState, loginDisp] = useContext(LoginCtx)  <--- BAD


              const login = async (username, password) => {
                const [loginState, loginDisp] = useContext(LoginCtx) <---GOOD
               try{
                 const res =....

        3. Delete node_modules and .next folders
          Run npm install or yarn
          Start your project again

        4. Try remove or add the hook's brackets "()" at the end of the hook and see how things go OR:

        5. You can only call hooks in the body of a function component, not in an onClick callback. If you were doing this inline, you would do it like:

          function Main() {
            const navigate = useNavigate();
            // ...
            <div className="post" onClick={(e) => navigate(`post/${1}`)}/>
            // ...
            <div className="post" onClick={(e) => navigate(`post/${2}`)}/>
          }
        If you want to make a reusable hook, the hooks can again only be called in the body of the component, so it would look something like this:

          export function useRedirectToPostID() {
            const navigate = useNavigate();
            const redirectToPostID = function(id) {
              navigate(`post/${id}`);
            }
            return redirectToPostID
          }

          // used like:
          function Main() {
            const redirectToPostID = useRedirectToPostID();
            // ...
            <div className="post" onClick={(e) => redirectToPostID(1)}/>
            // ...
            <div className="post" onClick={(e) => redirectToPostID(2)}/>
          }

  --- ReferenceError: require is not defined in ES module scope, you can use import instead
        change in package.json file, this line:
        "type":"module" to "type":"commonjs"
        
        Try the error quick fix "convert to ES5 module"
        google the 'import' equivalent to 'required'

  --- Exercise 8, how do I reverse-query a parent object from a child object?
        type Book {
          title: String
          publish: String
          author: String   <--- how do I query the books the author created?
        }

        creat a query 'Author' besides 'Books'
          Query: {
            bookCount: () => books.length,
            ...
          },
          Author: {
            bookCount: (root) => books.filter(b => b.author === root.name).length
          }

  --- Syntax Error: Expected Name, found } / GraphQLError(`Syntax Error: ${description}       
        This error occurs mostly when there are unclosed curly braces or when some fields are not properly defined while calling the query. Or try to remove the initial curly brackets.

  --- Apollo GraphQL local state getting undefined with useQuery on refreshing app, Ex8.9 front end App.js, 
        it's weird but after changing the sequeces of the individual useQuery components things worked:

          const authorsQry = useQuery(ALL_AUTHORS)  
          const booksQry = useQuery(ALL_BOOKS)       <- BAD bookQry.data.allBooks becomes undefined

          const booksQry = useQuery(ALL_BOOKS)       <- GOOD 
          const authorsQry = useQuery(ALL_AUTHORS)

  --- React does not recognize the X prop on a DOM element ex8.11 UpdateAuthor.jsx
       1. Check spelling of the props in the styling/props file
       2. Make sure that the props with spread operator {...Props.X} has a proper import 
        if the styling/porp file is not imported you may get this error

  --- Warning: validateDOMNesting(...): <th> cannot appear as a child of <thead>.
        The react render component structure is incorrect/missing proper components.
        check if any parent component/tag is missing, or child compoent/tag is outside of a parent
          eg: 
              <TableHead>
                <TableCell></TableCell>  <--- wrong. tableRow tag is missing
              </TableHead>

          fix: 

              <TableHead>
                <TableRow>
                  <TableCell></TableCell>  <--- correct
                </TableRow>
              </TableHead>

  --- graphql mutation / usemutation sent successfully but doesnt update the page ex 8.9, EditAuthor.jsx
        
        very likely the refetchQueries() is missing when sending the mutation so the page doesn't update

        const [editAuthor] = useMutation(
          EDIT_AUTHOR,{
            refetchQueries:[{query:ALL....], <---- refetchQueries ensures fetching is done again each mutation
            onCompleted:(res) => {
            ...

  --- How to select currently focused element/ pick the current target element when the item is clicked: ex8 frontend EditAuthor.jsx

        https://mui.com/material-ui/react-popover/

        method 1. use e.currentTarget when using the event handler:

          <Button onClick={handleOpen}>
            
          const handleOpen = (e) => {
            e.preventDefault()
            setAnchor(e.currentTarget)

        method 2. use document.activeElement to pick the current item

          <Button onClick={()=>handleOpen(a.id, )}>

          const handleOpen = (id) => {    
            setAnchor(document.activeElement)
            setId(id)

        method 3. use anchor reference

          <Popover 
            anchorReference="anchorPosition"
            anchorPosition={{ top: 200, left: 400 }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
  --- Query was already executed
        wrap your query within async-await.

          const visitorData = async() => { 
            return await Visitor.find({});
          }

  --- How to auto-reload/ refresh automatic update server/backend files in Node.js?
        $ npm install nodemon -g
        $ nodemon app.js

        "scripts": {
          "start": "nodemon app.js"
        },
        "devDependencies": {
          "nodemon": "..."
        }
  
  --- Mongoose objectID ref reference doesn't work/ cannot find mongo ids in the document

      1. use the mongoose populate() function:

          blog.js:
          ...
          const blogSchema = new mongoose.Schema({
          ...
          user: {
            type: mongoose.Schema.Types.ObjectId,   <--- 
            ref: 'User'                             <---
            },
          });

        Replace the objectID and ref by whatever elements that macthes your mongoose type:

          user: {
            userId: String,
            username: String
          },

        In index.js replace the 
        
         return await Book.find({}) , return await Author.find({}) or whatever by:

        return await Book.find({}).populate({
          path: 'author',     <-- path is the element you want to expand
          select: 'authors'   <-- authors as the collection name in your mongoonse data tree
        })


      2. if the ObjectId ref absolutely doens't work, just replace with regular attributes to get by

        blog.js:
          ...
          const blogSchema = new mongoose.Schema({
          ...
          user: {
            type: mongoose.Schema.Types.ObjectId,   <--- 
            ref: 'User'                             <---
          },
        });

        const Blog = mongoose.model('Blog', blogSchema);
        module.exports = Blog

      replace the objectID and ref by:

          user: {
            userId: String,
            username: String
          },

  --- How to use find() function on nested object with MongoDB?

      1. instead of using await Book.find({author:{name: root.name}}).countDocuments({})
        try: await Book.find({'author.name':root.name}).countDocuments()

      2. reference to the nested data tree on mongodb website 

        const cursor = db.collection('inventory').find({
          'size.uom': 'in'
        });

        await db.collection('inventory').insertMany([
          {
            item: 'journal',
            qty: 25,
            size: { h: 14, w: 21, uom: 'cm' },
            status: 'A'
          },
          {
            item: 'notebook',
            qty: 50,
            size: { h: 8.5, w: 11, uom: 'in' },
            status: 'A'
          },

  --- how to add/configure a nested query that return an nested object in mongodb? ex 8, backend, index.js

      option 1. use mongo find() and populate() function under Query in index.js:

        return await Book.find({}).populate({
          path: 'author',     <-- path is the element you want to expand to/add to the type
          select: 'authors'   <-- authors as the collection name in your mongoonse data tree
        })
        
        under Type in index.js define the type properly:

          type Book {
          title: String!
          published: String!
          author: Author      <--- where Author is a type with matching elements
          id: ID                   **if it's a list of object make sure use [Author] instead
          genres: [String]    
          }

        if needed, update the schema under models> authors.js as well:

            const authorSchema = new mongoose.Schema({
              ...
              bookListByAuthor:[{  <-- we use [ ] here because element is a list of books (array)
                title: String,
                published: Number,
                genres: [
                  { type: String} 
                ]
              }]
      
      option 2. define a new query under a target Type with a find() function

          index.js:

            const typeDefs = `
              type Author {               <-- type Author
                name: String!
                born: String!
                bookCountByAuthor: Int!   <--- we will create a query for Author below
                id: ID
                bookListByAuthor: [BookExtension] <--- we will create a query for Author below
              }
            ...

          const resolvers = {
            Query: {
                Author: {                             <-- query for Author
                  bookCountByAuthor: async(root) => 
                  await Book.find({'author.name': root.name}).countDocuments(), <- author.name is a nested obj

                  bookListByAuthor: async(root) => 
                  await Book.find({'author.name': root.name})
                },

            refer to "How to use find() function on nested object with MongoDB?"
      
  --- how to use unitcode symbols:
        in react render, use the String.fromCharCode() function:
        
          {String.fromCharCode(9998)}  <---9998 is the symbol code

  --- how to resize a mui button? it seems to have a minimum width/height that can't be overridden
        You could add max/min width/height style options.

        For instance:
        <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
        In this case button always will look like a square and have a fix size (30px).



  --- Pop(), Push(), Concat() functions doesn't seem to work well for add/remove items from an array.
      Array elements on display doesn't seem to update when clicking on the button. UseState doesn't update correctly. (ex 8, frontend, addBook):

        - concat() creates a new array with the added item, while keeping the old array unchanged.
          so when we do setElement(elements.concat(newElement)) it does not add a new item to the old array but returns a new array which, besides containing the items of the old array, also contains the new item.

          const [elements, setElements] = useState([""])

          ...
          const addGenre = () => {
            setGenres(genres.concat(" " + genre + ",")) <- set Genres with new array with new genre

          ... <Button onClick={addGenre}>

        - instead of use Pop for element removal, slice() works better:

            const undoGenre = () => {
              setGenres(genres.slice(0,-1)) <--- removes the last element in an array/object
            }
            ...<Button onClick={removeGenre}>
      
  --- The type of xx must be Output Type but got xx
      How do I create a type Mutation on a nested object with GraphQL? / MongoDB 
      ...Field of xx type xx must have a selection of subfields... when doing mutation

      ex 8 backend index.js


        solution 1. Inside your Query type definition, you wrote:

                      fields: Companies
                      It should be

                      fields: { Companies }

        solution 2. the problem was that I defined a graphql type 
                    and input type with the same name in my graphql schema file.

            I changed this:

              type InternalAttribute {
                  name: String
              }

              input InternalAttribute {
                  name: String
              }
              to this:

              type InternalAttribute {
                  name: String
              }

              input InternalAttributeInput {
                  name: String
              }

        solution 3: 
          Change the name of type xx to something else (xx01, xx02...etc) to see which element is wrong
          Either study the network > localhost > Payload and Preview to see what's the input to match the mutation, And look at the apollo server to see what is required for the mutation input.
      
        solution 4:
          create an input type "input InputAuthorInfo" under typeDefs in index.js:
              
            input InputAuthorInfo {
              id: ID
              name: String,
              born: String,
            }

          and ensure it's used in the query and mutation:

            type Query {
                ...
              allBooks(author: InputAuthorInfo, genres: String): [Book!]!
            }

            type Mutation {
              addBook(
                title: String!
                author: InputAuthorInfo
                published: String!
                genres: [String!]!
              ): Book
            }

        solution 5:
          check on mutation query in queries.jsx, mutation must return some fields:

            export const ADD_BOOK = gql`
              mutation addBook(
                $title:String!,
                $name:String, 
                $born:String, 
                $id:ID, $published:String!, 
                $genres:[String!]!
              ) 
              { 
                addBook(
                  title: $title, 
                  author: {name:$name, born:$born, id:$id}, 
                  published:$published, 
                  genres:$genres
                )                   <-- return field is missing here
              }
            `

          lets simplify the example mutation above:  

            export const SOMENAME = gql`
              mutation xxx( $var1:String, $var2:String ) {
                xxx ( var1:$var1, var2:$var2) {  <---- there should be some return field { } like a function
                  missingField1                  <--- missing fields added
                  missingField2 ...              
                }
              }
        
          so the proper mutation query of the example above should be:
                        
            export const ADD_BOOK = gql`
              mutation addBook(
                $title:String!, 
                $name: String,
                $born: String,
                $id: ID,
                $published:String!, 
                $genres:[String!]!
              ) {
                  addBook(
                    title: $title,
                    author: {
                      name: $name,
                      born: $born,
                      id: $id,
                    },
                    published: $published,
                    genres: $genres,
                  ) {                             <--- return field
                      title             
                      published
                      author{name born id}        <--- this is a nested field
                      genres
                    }
                }
            `
  
  --- How to prevent mui dialog/popover from closing when click outside of the box/ clickaway?

        try hideBackdrop='true'

  --- How to reduce or resize of MUI Input or mui Textfield, how to change font size in textfield label:

        use inputProps={{sx:{ padding:'0 !important'}}}

          inputProps={{sx:{width:'25ch', fontSize:15, padding:'1 !important'}}} 

          and play with transform (below)

        OR

        use transform 
          sx={{transform:'scale(0.7, 0.7)'}}  <--- x 0.7, 70.7
        
        include translate if needed:
          sx={{transform: "translate(-14px, -14px) scale(0.7)"}}
        
        for width, use width:
          sx={{transform:'scale(.7)', ml:'auto', width:'22ch'}}   <--- width is 22ch

        font size change:
          inputProps={{style: {fontSize: 40}}} // font size of input text
          InputLabelProps={{style: {fontSize: 40}}} // font size of input label

  --- Move focus to a text field programmatically on button click/ Javascript setting a textarea with focus() does not work 

        1. <TextField  id="authorField" />
           
          const toAddAuthor = () => {
            document.getElementById("authorField").focus()
          }

        2. if textfield doesn't work, use setTimeout irrespective of the event.

            setTimeout(function() {
                document.getElementById("elementId").focus();
            }, 0);

  --- How to use unicode in react render:

      1. google 'UTF-8 Dingbats' or go to:
          https://www.amp-what.com/unicode/search/note
          https://www.w3schools.com/charsets/ref_utf_dingbats.asp


      2. U+00F7 will be like <p> {'\u00F7'} </p>

      3. get the html entity: eg, U+26A0 = 9998

        String.fromCharCode(9998)

  --- How to save/add an new object to mongodb (ex 8 backend, index)
      "xxx.save() is not a fucntion" 

        1. first create model from Schema :

          var UserModel = mongoose.model('User', User);

        2. then create object out of User model

          var user = new UserModel(some_object/some_content/some_body)
        
        3. then call

          user.save(function(){})
          check documentation http://mongoosejs.com/docs/api.html#model_Model-save

        4. note that following may give you a 'xxx.save() is not a fuction' error:

          let user = new UserModel()  <-- created an "mongo user" object with no content

          user = (some_content/some_content/come_body) <-- entire "mongo user" got replaced

          user.save() <--- now you will get an error because it's no longer a "mongo user" with .function path

        5. proper way to avoid error in 4. is:

            let some_content = 'whatever content/object you want to assign'

            let user = new UserModel(some_content) <-- create, then assign content to "mongo user"

            user.save() <-- saves the valid "mongo user"

        6. the following procedure may lead to 'path is required' error:

            let some_content = xx

            let user = new UserModel() 

            user.save(some_content)  <--- mongo may not be able to find the proper paths in the content

          to fix it, follow step 5.

  --- Material Icons
        npm install @mui/icons-material

          import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
          import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

            OR
          
          import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

  --- How to limit text/ long strings to 2 (3, 4, 5...n) lines with CSS
        whith line-clamp syntax: 

        .noteTitle {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
                  line-clamp: 2; 
          -webkit-box-orient: vertical;
          white-space: nowrap;f
        }

  --- How to limit text/long strings to a certain width and trucate the rest with dots '...'?
        define the element width and use white-space nowrap & ellipsis

          .noteTitle {
            text-overflow: ellipsis;
            overflow: hidden; 
            width: 160px; 
            height: 1.2em; 
            white-space: nowrap;
          }

  --- Specify width in *characters*
        the unit to use is 'ch':

        pre {
          width: 80ch; /* classic terminal width for code sections */
        }

  --- How to create a React multi-word search / multiple-word search
        try the following:

          1.  const quickFilter = (terms, notes) => {
                if ("" === terms || terms.length < 2) return notes;
                terms = terms.map(val => val.replace(/\"/g, ""));
                //words.push(terms);
                return notes.filter((n) => {
                  const v = Object.values(n);
                  const f = JSON.stringify(v).toLowerCase();
                  return terms.every(term => f.includes(term));
                });
              };

              const notesToShow = quickFilter(searchTerms, notes)

          2.  const filterIt = (terms, arr) => {
                if ("" === terms || terms.length < 3) return arr;
                var words = terms.match(/"[^"]+"|\w+/g);
                
                words = words.map(val => val.replace(/\"/g, ""));
                //words.push(terms);
                
                return arr.filter((a) => {
                  const v = Object.values(a);
                  const f = JSON.stringify(v).toLowerCase();

                  return words.every(val => f.includes(val));
                });
              };

    --- Zustand/useState setState run in infinite loops:
          1. most likely it's because curly brances {} and brackets [] got mixed during useStore declaration

          2. ***DO NOT ever set value without a function/condition. 
              eg:
                    [name, setName] = useState('')

                      setName('test') <== leaving setName here is going to cause infinite loop

    --- How to sort by date:
          You can use sort() and reverse() to sort meetings in descending order

            var sorted_meetings = meetings.sort((a,b) => {
                return new Date(a.scheduled_for).getTime() - 
                    new Date(b.scheduled_for).getTime()
            }).reverse();

    --- Failed prop type: Invalid prop `children` supplied to `ForwardRef(InputLabel2)`, expected a ReactNode.
          This happends when an object or prop that contains children is used as a sigle prop in the render
          eg.
                sortType: [
                  { "id": 0, "txt": 'Newest First'},
                  { "id": 1, "txt": 'Oldest First'},
                  { "id": 2, "txt": 'Title (A-Z)'},
                  { "id": 3, "txt": 'Last Edited'},
                ],

                <p> {sortType} </p>  <--- ERROR invalid Prop because render cannot disply sortType

    --- Mui select items or fonts don't align
        How to change mui icon size?

          1. Material-UI has introduced components that handles this scenario better than using a style:|

              import Typography from '@mui/material/Typography';
              import Stack from '@mui/material/Stack';

              <Stack alignItems="center" direction="row" gap={2}>
                <LinkIcon />
                <Typography variant="body1">Revolve</Typography>
              </Stack>

              OR:

              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
              }}>
                  <LinkIcon />
                  <span>revolve</span>
              </div>  

          2. icon size can be changed by 'fontSize':
               <ChildFriendlyIcon fontSize='medium'/>

          3. This is not a bug. You need to apply size="small" to <FormControl> too.
                <FormControl fullWidth size="small">
 
                <FormControl fullWidth size="small">
                  <InputLabel id="key">Label</InputLabel>
                  <Select
                    id="key"
                    value={key}
                    label="Key"
                    onChange={handleChange}
                    required
                    size="small">

    --- How to create a backend server:

        See 3-a Simple web server
        - start in backend folder with: npm init
        - change the scripts object by adding a new script command:
           "scripts": {
              "start": "node index.js",
            },
        - add an index.js file:
            console.log('testing') <-- just to make sure it works
        - Then We can run the program directly with Node from the command line:
            node index.js or npm start
        - Now edit the index.js so it will work as a web server:

            const http = require('http')

            let notes = [    <-- this is our database
              ...
            ]

            const app = http.createServer((request, response) => {
              response.writeHead(200, { 'Content-Type': 'application/json' })
              response.end(JSON.stringify(notes))
            })
        - Install EXPRESS so we don't have to write every line of code from scratch:
          (fuzzy stuffs like http:.createServer...ect ect, with express we can replace by GET)

            npm install express
            npm update           <-- in case software is dated

          in index.js import EXPRESS:
            const express = require('express')
            const app = express()

        - Continue on with 3-a: 'Web and Express' after installing express
        - After setting up Express, install Nodemon to help auto-refresh port 3001:
            npm install --save-dev nodemon

            change script:
              "start": "node index.js",  <-- if we run 'npm start' it will run like before
              "dev": "nodemon index.js", <-- 'npm run dev' will run under nodemon
        - Then we use REST to provide the same REST http API like jason server, eg:
            notes     GET     fetch all sources in the collection
            notes/01  GET     fetch individual source
            notes/01  POST    create a new source w/ requested data
            notes/01  DELETE  remove a particular individual source
            notes/01  PUT     replace the entire individual source w/ requested data

        - Note that app.get('/api/notes/:id' ...), where the semicolon ":" means
          the Express route will handle all GET req in "api/notes/SOMETHING", where SOMETHING can
          be any string:

            app.get('/api/notes/:id', (request, response) => {
              const id = request.params.id  <-- *** note this id might be a string
              const note = notes.find(note => note.id === id)
              response.json(note)
            })

            *** if id is a 'string' type while note.id is 'number' type api/notes/SOMETHING may fail
                  we shall convert id to a number (see 3-a Fetching a single resource):
                    const id = Number(request.param.id)

        - Add Express middleware function express.json() to help parsing JSON reqs:
          (search app.use(express.json()) in 3-a)
                      
            const express = require('express')
            const app = express()

            app.use(express.json())   <--- Without the json-parser, the body property would be undefined
              
          Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called

        - To test the PUT/DELETE/POST operations in backend, look up Postman and REST Client in 3-a
          *The test will not alter the actual database

        - When use POST to add new entry, add some features like ID check, content checks...etc:
          (search 'finalize the handling of the request' in 3-a)

            eg: use uuid (look up uuid in part 8)

                const { v1: uuid } = require('uuid')

                const note = {
                  content: body.content,
                  important: Boolean(body.important) || false,
                  id: uuid(),
                }

            eg:
              const maxId = notes.length > 0
              ? Math.max(...notes.map(n => n.id)) 
              : 0

            eg:
              if (!body.content) {
                return response.status(400).json({ 
                  error: 'content missing' 
                })
              }

      - Create a requestLogger or use Morgan (see part 3 excise 3.7)
          npm install morgan

          const morgan = require('morgan')

          morgan.token("body", (req) => {
            return JSON.stringify(req.body);
          });

          app.use(morgan("method-:method, status-:status, url-:url, body-:body"));


    --- how to add an independent temporary database db.json to either fronted or backend?
          - create a file db.json
          - in the file just add:
              ***no need to declare variable, just everything in an object bracket {}
              ***no need to export anything
              {
                "persons": [
                  {
                    "name": "Arto Hellas",
                    "number": "040-123456",
                    "id": 1
                  },
                  {
                    "name": "Ada Lovelace",
                    "number": "39-44-5323523",
                    "id": 2
                  },
                ]
              }

          - In any file that requires the data just import it:

              const database = require('./db.json')
              const persons = database.persons

    --- How to pass down params like id, content of an object with usNavigate?
          - use 'useParams()':

              - in App:
                <Routes>
                  <Route path='/' element={<Notes/>} />
                  <Route path='/:id' element={<SingleNotePage/>} />
                </Routes>

              - in Notes:
                   onClick={()=>navigate(`/${n.id}`)

              - in SingleNotePage:
                  const Note = ({ notes }) => { 
                  const id = useParams().id             <-----------------
                  const note = notes.find(n => n.id === Number(id))

    --- What's the best option to store date and time into the database for easy access?
          I just want to mention Mongodb through Node.js, one thing I am suffering is that has no real concept of timezones for UTC Date() or numbers (milliseconds) in JavaScript. If I had been storing UTC dates in MongoDB, for example a Date() object, but it's unexpectedly complicated and error-prone to converted it to the timezone they are happened to. As a result, I've decided to use simple strings like the good old Date string standard yyyy-mm-dd::hh::mm::ss to store date time, and I'll parse into Date() objects as needed in the client side.

    --- How to parse a string to date?
          use moment js:
            If you know the format of an input string, you can use that to parse a moment. moment("12-25-1995", "MM-DD-YYYY"); The parser ignores non-alphanumeric characters by default, so both of the following will return the same thing.

          eg:
            import moment from 'moment'
            const note = [{date1: '2024-03-31'},{date2: '2023-01-01}]

            const date1 = moment(note.date1, 'YYYY-MM-DD').format('MMM Do YYYY')
            const date2 = moment(note.date2, 'YYYY-MM-DD').format('MMM Do YYYY')

    --- Gap on the right/left/top/bottom of the page 
          Try star with the #root setting in css:

            #root {
              width: 100%;      <---- this should eliminate the gap
              text-align: left;
            }
        
          or try the css reset:

             * { width: 100%; margin:0; padding:0; box-sizing:border-box; } 
 
    --- How to keep footer at the bottom of the page, or get the rid of the gap at page bottom?
          You need to tell your footer to position itself to the bottom of the surrounding container:

          Footer css:

          position: absolute;  <--- *** For scroll friendly solution use position: fixed; You may also need                         to add a z-index to keep it above other elements.
          left:0;
          bottom:0;
          right:0;
          And for the container (the react-root div):

          padding-bottom:60px;


          const Footer = () => (
            <Box sx={{
              left:'0', 
              right:'0', 
              bottom:'0', 
              position:'fixed', 
              color:'text.primary', 
              bgcolor:'background.default', 
            }}>

    --- How to fill the gap between an element to the fixed-position element at the bottomr of page

          <Box sx={{
            position:'fixed',  <---- keep the element fixed at the bottom
            bottom:'0', 
            right:'0', 
            left:'0', 
            height:'100%',      <----- 100% makes it covers the entire page
            zIndex:'-1'         <----- low z index ensures the 100% heigh dones't cover other elements
            display:'flex',                 <---- flex + reverse direction keeps stuffs at the bottom 
            flexDirection:'column-reverse', 
          }}>

        OR add a dummy element with some height:
                      <TableCell sx={{ height:'44vh', zIndex:'-1' }}></TableCell>

    How to make a mui select drop down menu showing image icon as label?
      - try use the "displayEmpty" property in Select tag:
                   
          <Select displayEmpty>        <---------- displayEmpty
            <MenuItem value={""}>
              <img src={h1Icon} width={'31px'}/>
            </MenuItem>
            <MenuItem>
              <img src={h1Icon} width={'31px'}/>
            </MenuItem>
          </Select>
    
    --- React Material UI createTheme_default is not a fun
          I had the same error so I removed all material ui dependency and reinstalled them, it worked for me.

          yarn remove @mui/material @emotion/react @emotion/styled 
          or

          npm uninstall @mui/material @emotion/react @emotion/styled 

    --- TipTap EditorContent / editor / useEditor dones't seem to update changed content via search:

          Try the editor's setContent command: 
            editor.commands.setContent(highlightMatch(searchTerms,content1))

          Combine the setContent with an OnClick button event to force the re-reder:

            <button 
              onClick={() => {
                editor.commands.setContent(highlightMatch(searchTerms,content1))
              }}
            >
              search: {searchTerms}
            </button>

    --- How to get the rid of dropdown icon in mui select?
        How to make mui select button size smaller?
        How to remove mui select border/outline?

          https://github.com/mui/material-ui/issues/26473
         To remove drop down icon, in the <Select> tag, add IconComponent:
          
          <Select 
            IconComponent= {() => null} <-- removes dropdown icon
            inputProps= {{ sx: { padding: '0 !important' } }} <-- this shrinks the button size
            sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}  <---removes outline
          >
          
          OR,
          
          Add IconComponent prop and throgh a random mui component (eg, Box)
          to override the arrow icon, then overwrite the padding to remove the claimed space for the icon.

          import {Box}from '@mui/material';

          <Select  
            IconComponent = {Box} <-- removes dropdown icon
            inputProps= {{ sx: { padding: '0 !important' } }} <-- this shrinks the button size
            sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}  <---removes outline
          >

  --- React state, Onclick will not fire first time.. only second
        setState is an asynchronous action so what you are displaying is the first state of addtolist that is either null | undefined. If you want to actually see the current state you setted then use useEffect hook: useEffect(() => { console.log(addtolist); }, [addtolist])

  --- Hide scrollable content behind transparent fixed position divs when scrolling the page?

        .wrapper {
            position:fixed;
            z-index:10;
            background:inherit;
        }

        .bottom-wrapper {
            z-index:5;
        }

  --- How to change the style of navbar on route change