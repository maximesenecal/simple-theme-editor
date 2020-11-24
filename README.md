# Simple Theme Editor

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionnalities

You can edit a simple theme with the following design categories :
- colors
- buttons
- textfield
- sizes

Each property have a reference key {category.component} where you can reuse in other properties to create references.
When you type a wrong reference in a property, the "Update" button is disabled and an error message is displayed.

You can save you config theme in the local store when clicking on "Save" button.
Later, when you reload the app, the local theme will be loaded.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!