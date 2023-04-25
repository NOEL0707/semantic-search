#Installation Steps

## How to run in your local system?

### `Git Clone`
Use git clone command to clone this repository.

## How to run Frontend?

### `npm install`
Go to frontend directory and run this command will install all the dependencies

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `Connecting to the server`
Inside the src folder inside the serverLink.js file make sure you keep the below line if you are running your backend code/image on 'abcd' port: 
export const serverLink="http://localhost:abcd"

## How to run Backend?

### `install dependencies`
Go to backend directory install libraries pymilivus,fastapi

### `uvicorn app:app --reload`
type this command to run backend

## How to run Database?

### `docker compose up`
You need to have docker to run it.