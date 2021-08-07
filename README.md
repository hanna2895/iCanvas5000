# iCanvas5000

Welcome to iCanvas5000, your friendly neighborhood canvassing app.

See it in action: [https://icanvas5000.web.app/](https://icanvas5000.web.app/)

## Local Setup

This is a React / Typescript app - to run this app locally, please make sure you have the correct files installed.

This app uses Styled Components for some (very basic) styling, and uses Firebase to handle authentication and data storage.

1. Clone this react app
2. run `yarn` to install dependencies
3. Create `.env` files and add values that can be found in your email from `hannah.werman@gmail.com`. This will allow you to connect to the firebase database and access the list of voters.
4. run `yarn start` to run start local server

## Deploying New Changes

iCanvas5000 is hosted by Google Firebase at [https://icanvas5000.web.app/](https://icanvas5000.web.app/).

To deploy:

1. run `yarn build`
2. run `firebase deploy` (you may need to first run `firebase login` if you are not already logged into your Google account in the terminal you're using)
