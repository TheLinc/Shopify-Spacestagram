# Shopify - Spacestagram

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Information About this Project

This project was created to be submitted with my application to Shopify's Front-end Developer Internship position

### Hosted on GitHub pages at: 
https://thelinc.github.io/Shopify-Spacestagram/

### Technical Requirements:

This project meets all the requirements specified by Shopify's documentation.

- The search results displayed are returned from Nasa's APOD API
  - `start_date` and `end_date` parameters were used to return images from the current day to 8 days prior

- Each image has a title, date, and a button to like the image
- Each image can be both liked and unliked
- The HTML served client side is accessible and semantic

### Extras:
In addition to the technical requirements I have added the following:
- A user's likes are saved after a page refresh
  - This was done using Firebase Firestore as a backend
  - This is functional for one user
  - Moving forward, if I had more time, I would implement a google sign-in using Firebase to make likes user-specific
 
- There is a loading state when the API is fetching data
- Image descriptions are displayed and can be expanded by clicking "read more"
- The web-application scales to fit both large and small screens

