# Ethereum Blockchain Explorer

A very basic ethereum blockchain explorer in pure html.

![](https://i.imgur.com/Q6bdhsG.png)

## Features
* Show Network Id
* Show Peer Counts
* Show Latest 20 Blocks
* Private Chain Support

## Library Versions
| Name | Version |
| --- | --- |
| bootstrap4 | 4.0.0 |
| jquery | 3.2.1 |
| popper | 1.12.9 |
| web3 | 1.3.4 |

## Running Locally
Change the infura project id in `index.html`
```
const provider = 'https://mainnet.infura.io/v3/<infura_project_id>'; //Your Infura Endpoint
```

With help of vscode [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), simply git the go live button to run the web. Your site will be available on http://127.0.0.1:5500.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
