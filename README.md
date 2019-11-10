# Money Exchanger

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Anyone in the same network can open it with [http://your_ip:3000](http://your_ip:3000)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## App Description

This app consists of a widget that keeps the balance of the user for different currencies.<br />

In it you can select how much money you want to change and which currencies. The widget will offer these funcitonalities:<br />

- Swap currencies from pockets so you don't have to write quantities again
- Check rate live, refreshed every 10 seconds
- Live change while you type in the amount you want to exchange
- Keep your balances after exchanges
- Warnings in case the amount selected is wrong

## App Design

The main component is the `App` component, from this one we would use different child stateless components that will be reusable.<br />

To swap between `App` Function Component type and Class Component type,
please change the import for that component in files:<br />

- `src/index.js`
- `src/js/components/__test__/App.test.tsx`

To be `"js/components/AppClassComponent"`.

All changes in the inputs or other components are managed by the main `App` component and the result is passed as props to children.<br />

We use `redux` to manage app state, but would have been enough with `useReducer` at top level, passing any info needed via props or<br />
with `useContext`.

`Thunk` is added to manage asynchronous actions.

The app is not ejected since there was no need to configure parameters in webpack.

Hope you like it! ;)
