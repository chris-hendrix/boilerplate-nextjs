# Boilerplate Next.js

### Description
A boilerplate web project using Next.js and Typescript. It consists of the following
- database: Postgres
- server: Next.js with React

It allows the user to create messages that will display on the frontend.

### Technologies
A non-exhaustive list of technologies in this project:
- [Cypress](https://www.cypress.io/) - TODO
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Github Actions](https://github.com/features/actions) -TODO
- [Jest](https://jestjs.io/) - TODO
- [Material UI](https://mui.com/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [Redux RTK query](https://redux-toolkit.js.org/rtk-query/overview)
- [Typescript](https://www.typescriptlang.org/)

### Installation
1. Install [Node LTS](https://nodejs.org/en/)
2. Install [Docker](https://www.docker.com/)
3. Clone this repo
4. Run the following command in the root directory
```
npm run install
```
### Start
The following command will containerize, build, and start the database, backend, and frontend
```
npm run up
npm start
```