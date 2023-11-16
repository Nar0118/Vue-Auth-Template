# Frontend (client / Vue js)

# vue-js-template

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

# Backend (server / node js)

## Installation

Clone the repository or download the source code for the app.

### Starting the Development Server

Install the required dependencies by running the following command:

### `yarn install`

## Run the project

In the project directory, run docker compose:

### `docker-compose up`

Then In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `http://localhost:8080`

## Prettier Formatting

To format the code using Prettier, run the following command:

### `npx prettier --write .`

This command will format the project files according to the Prettier configuration.

## ESLint Linting

To lint the code using ESLint and automatically fix any fixable issues, use the command:

### `npx eslint --fix .`

This command will analyze the project files, identify any code style or formatting issues, and attempt to fix them automatically.

# Tools and Middleware Used

## body-parser

body-parser is a middleware that parses the request body and makes it available under the req.body property. This is essential for handling JSON and URL-encoded data from POST and PUT requests.

## cors

cors is a middleware that enables Cross-Origin Resource Sharing (CORS) in the application. It allows defining which origins are permitted to access the server's resources, thus enhancing security for client-server communication.

## morgan

morgan is a logging middleware that generates detailed request logs. It provides various logging formats, including 'combined' which logs the IP, date, request method, URL, status code, and response size.

## winston

winston is a versatile logging library that supports multiple transports (outputs). In the setup, two transport options are used: console output and log files. Different log levels (e.g., 'info', 'error') can be specified for each transport.

## helmet

helmet is a collection of security middleware functions that help secure Express applications by setting various HTTP headers. These headers mitigate common security vulnerabilities such as cross-site scripting (XSS), content sniffing, and more.

## csurf

csurf is a middleware that provides Cross-Site Request Forgery (CSRF) protection by adding a CSRF token to requests. It helps prevent unauthorized actions by requiring clients to include this token in their requests.

## cookie-parser

cookie-parser is a middleware that parses HTTP cookies and makes them available in the req.cookies object. This is useful for handling cookies sent by the client

## bcrypt

bcrypt is a library used for hashing passwords securely. It helps in protecting user passwords by applying a one-way hash function, making it difficult for attackers to reverse-engineer the original password from the hash.

## JWT (JSON Web Tokens)

JSON Web Tokens (JWT) is a compact, URL-safe means of representing claims between two parties. It's commonly used for authentication and authorization purposes. JWTs consist of three parts: a header, a payload, and a signature, which can be used to securely transmit information between parties.

## Multer

Multer is a middleware for handling multipart/form-data, which is typically used for uploading files. It makes it easy to handle file uploads on the server, process the files, and store them in a designated location.

Enjoy running and working with the project!
