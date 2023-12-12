# Music Streamer

This is the front end code for a music streaming application. It provies data tables and simple CRUD operations to interact with a connected database.

## Built with

React <br />
ReactQuery

## Getting Started

### Prerequisites

node.js

```
npm install npm@latest -g
```

### Installation

1. Clone the repo

```
git clone https://github.com/GarrChri/CS340_Group26_MusicStreamer.git
```

2. Install necessary packages

```
npm install
```

### Setting up a local server

1. Start your local server

```
npm start
```

The project is currently set up to run on PORT 2828, to change this back to the default PORT (3000), change the following line in the package.json file from

```
 "scripts": {
    "start": "PORT=2828 react-scripts start",
```

to

```
 "scripts": {
  "start": react-scripts start",
```

## Interacting with the API

This project uses the dotenv package to manage user information.

Create a file called .env in the root directory with the following: <br />
(_API_URL_ will need to be changed to the url you will send API calls to.)

```
REACT_APP_PROXY=*API_URL*
```

### GET requests

Sample query to fetch all songs in the database

```
const loadSongs = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/songs`);
  const data = await response.json();
```

### POST requests

Sample query to create a new song

```
const response = await fetch(`${API_ENDPOINT}/api/songs`, {
        method: "POST",
        body: JSON.stringify(*Song Data*),
        headers: {
            "content-type": "application/json"
        }
    });
```

### PUT requests

Sample query to update a song

```
const response = await fetch(`${API_ENDPOINT}/api/songs`,{
          method: "PUT",
          body: JSON.stringify(*Song Data*),
          headers: {
              "Content-Type": "application/json"
          }
      });
```

### DELETE requests

Sample query to delete a song from the database

```
const response = await fetch(`${API_ENDPOINT}/api/songs/${*Song Data*}`, {
        method: "DELETE"});
```

## Citations

This project was created using create-react-app. <br />
The following files were provided with the starter code and remain mostly unmodified from their original version:

-   index.html
-   manifest.json
-   index.css
-   package-lock.json
-   package.json
-   App.test.js

The following files were provided with the starter code, but have been completely rewritten:

-   App.css
-   App.js

All files in the components folder contain original code.
