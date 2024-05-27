# NoteZen

NoteZen is my first app project which helps to store, sort and format written memo for easy referencing.

## Background

Often I like to translate my learning experience and inspirations into writingss. Keeping and revisiting these written notes had grdually become a messy job as I do not have a structured way to organize the notes. The final product of his project should offer features listed above and helps to optimize the notes management.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

List of things required to install the software and how to install them (Under Construction)

```
Under Construction
```

### Installing

How to get a development env running
-steps: Under Construction)

```
demo 1
```
Under Construction
```
demo2
```

## Running the tests

How to run the automated tests for this system (Under Construction)

### Break down into end to end tests

Purpose of the tests (Under Construction)

```
demo 1
```

### And coding style tests

Purpose of the tests (Under Construction)
```
demo 1
```

## Deployment

Notes about how to deploy this on a live system (Under Construction)

## Project Development

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

Tools Use for developing this project:

### Frontend:
* [Vite](https://vitejs.dev/) -          Frontend development server for the React development process.
* [Material UI](https://mui.com/material-ui/) -   A React component library w/ powerful design materials.
* [React Router](https://www.npmjs.com/package/react-router-dom) -  For making a single-page web/app with routing effects. 
* [Zustand](https://github.com/pmndrs/zustand) -       State management ideal for smaller projects.
* [Highlight-words](https://github.com/bvaughn/react-highlight-words?tab=readme-ov-file) - For making highlighted search term
   ```
   npm create vite@latest <project directory name> --template react
   npm install @mui/material @emotion/react @emotion/styled
   npm install react-router-dom
   npm install zustand 
   npm i react-highlight-words
   ```
### Backend/Server:
* [Express](https://www.npmjs.com/package/express) -    Framework for Node.js
* [Nodemon](https://github.com/remy/nodemon/) -         For devoloping Node.js apps w/ automatic restart
* [morgan](https://github.com/expressjs/morgan) -       HTTP request logger middleware for node.js
* [UUID](https://github.com/uuidjs/uuid#readme) -       For creating unique UUID for each new element entry
  ```
  npm install express, npm update
  npm install --save-dev nodemon
  npm install morgan
  npm install uuid    
  ```
### Testing:
* [Postman](https://www.postman.com/) -        For testing various backend operations (delete, post, put...etc)
* [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) -    For testing backend operations

## Authors

**Eric Jen** 

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc