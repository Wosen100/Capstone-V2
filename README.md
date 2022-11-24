CapStone Fullstack Application
Supporting your churches can't get easier than this, donate to your favorate angel!

Table of Contents

About The Project
This app build with the existing knowledge of the React basics, and give you further practice working with codebase linting, component testing, Redux Toolkit, and TypeScript.

The user are two kinds one is the donners and the other will be the beneficiaries. Beneficiaries as defiend this app are people who be able to add a post, images, edit and update their description and request for funding. On the other hand donners are people who reads the post and donate monetry support.

This app used Redux Toolkit and state slices to manage any state data needed across multiple components. In the case where data is created and used only within one component (or possibly one and a few of its direct children), consider using useState() or useReducer() and traditional prop drilling. Most apps will use a combination of "local" state management (useState() and useReducer()) and "global" state management (Redux or Context API).

Apply the TypeScript static typing system. try to use TypeScript for the majority of React components! installed typescript, add support for TypeScript linting, and use either .ts or .tsx extension for the files to apply TypeScript type-checking on.

Use the BLANK_README.md to get started.

Built With
A few of the frameworks/libraries that were used to build the project are:


- React
- Express
- Node.js
- React Redux
- Axios
- React Router
- JWT Authentication
- Mongoose
- MongoDB
- EsLint

## Wireframes

Before Getting Started here are the detailed wireframes that was designed.

#### List of beneficiaries

The list of all beneficiaries will be shown as the following wireframe

![App Screenshot](https://github.com/Wosen100/Bekurat/blob/development/readmeimages/beneficiaries.png?raw=true)

#### Register new Beneficiary

Registering a new beneficiary will be as follows.

![App Screenshot](https://github.com/Wosen100/Bekurat/blob/development/readmeimages/register_new_beneficiary.png?raw=true)

## Getting Started
=======
[![React][React.js]][React-url]
[![Express][Express.js]][Express-url]
Node.js
React Redux
Axios
React Router
JWT Authentication
Mongoose
MongoDB
EsLint and AirBnb
json server


#### Beneficiary Details

Complete Details of the selected beneficiary will be shown as follows.


This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo

   ```sh
   git clone https://github.com/Wosen100/Bekurat.git
   ```

2. Install NPM packages for both client and server

   #### client

   ```sh
   npm install
   ```

   #### server

   ```sh
   cd server
   npm install
   ```

3. Create an account at [MongoDB](https://www.mongodb.com/) and create your own cluster for the database and obtain the connection string.

   \*\* Don't forget to [allow your IP](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) for the connection

4. Enter your mongoDB link in your `.env` file in your backend and also enter your token secret key (can be any text you decide on)

   ```js
   DB_URL = 'ENTER YOUR MONGODB CONNECTION STRING';
   ```

5. npm start for both your frontend and backend

```sh
 npm start
```

```sh
 cd server
 nodemon
```
