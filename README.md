# POC

Example of a simple Single Page Application showing a list of products that updates depending on the selected category using Vite, React, Redux and Sass

## Installation

Use the package manager [nodeJS](https://nodejs.org/en/)

- First checking your version of node.
- Recommended: 18.13.0 LTS

```bash
node -v
```

### If you already have [nvm](https://github.com/nvm-sh/nvm#readme) installed, you can just run the command use

```bash
nvm use
```

### Use [npm](https://www.npmjs.com/)

```bash
npm install
```

### Or use [Yarn](https://yarnpkg.com/)

if not installed yet

```bash
npm install yarn [-g]
```

If -g is specified, this will be the value of the global prefix, see [npm config](https://docs.npmjs.com/cli/v6/commands/npm-config) for more detail.

Installing all the dependencies of project

```bash
yarn
```

or

```bash
yarn install
```

## Before run project

Create an .env file in the project root and insert the VITE_API_URL key with the endpoint to invoke to retrieve the products informations

```bash
VITE_API_URL=[YOUR ENDPOINT]
```

## Usage

Runs the app in the development mode.

```bash
npm run dev
```

or

```bash
yarn dev
```

To create a dist folder which can be deployed.

```bash
npm run build
```

or

```bash
yarn build
```

## Frontend build tooling

This project use [Vitejs](https://vitejs.dev/) a new breed of frontend build tooling that significantly improves the frontend development experience.

💡 Instant Server Start

⚡️ Lightning Fast HMR

🛠️ Rich Features

📦 Optimized Build

🔩 Universal Plugin Interface

🔑 Fully Typed APIs

For a curated list of awesome things related to ViteJs see [awesome-vite](https://github.com/vitejs/awesome-vite)

## License

[MIT](https://choosealicense.com/licenses/mit/)
