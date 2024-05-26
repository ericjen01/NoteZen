MyNotes is the first app I create which helps to store, sort and format written ideas and instructions for the easy referencing.

Often I like to translate my learning experience and inspirations into writingss. Keeping and revisiting these written notes had grdually become a messy job as I do not have a structured way to organize the notes. The final product of his project should offer features listed above and helps to optimize the notes management.

Following amazing tools are adopted for completing this project:

  Testing:
  Postman -        Used to test various backend operations (delete, post, put...etc) for the backend
  Rest Client -    Like Postman, another tool to test backend operations

  Frontend:
  Vite -          A highly optimized frontend development server for the React development process
  Material UI -   As a React component library it offers simple but yet power design materials. 
  React Router -  Handy for creating a single-page web/app with routing effects.
  Zustand -       For state management. Shines in smaller projects (in my opionion) as its ease to use.
  Highlight-words https://github.com/bvaughn/react-highlight-words?tab=readme-ov-file

  Vite -              npm create vite@latest <project directory name> --template react
  Material UI -       npm install @mui/material @emotion/react @emotion/styled
  React Router -      npm install react-router-dom
  Materil UI Icons -  npm install @mui/icons-material
  Zustand -           npm install zustand
  Highlight-words -   npm i react-highlight-words


  Backned/Server:
  Express -         Framework for Node.js that there's no need to write every code from scratch
  Nodemon -         Tool helps develop Node.js based apps w/ automatic node app restart
  morgan -          HTTP request logger middleware for node.js
  UUID -            For the creation of unique UUID for each new note/user entry
  express.json() -  Built-in Express middleware func. Parses incoming JSON reqs, puts parsed data in req.body

  Express - npm install express, npm update
  Nodemon - npm install --save-dev nodemon
  morgan -  npm install morgan
  UUID -    npm install uuid      


Project Structure For The Frontend:

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


