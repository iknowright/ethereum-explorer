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