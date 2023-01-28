# Boilerplate Next.js

### Description
A boilerplate web project using Next.js and Typescript. The goal is to try to setup the following services and technologies with as little code as possible. The app allows authorized users to create messages that will display on the frontend.

### Services
The services used in this project are:
- database: Postgres
- client & server: Next.js with React

### Technologies
A non-exhaustive list of technologies in this project:
- [Cypress](https://www.cypress.io/) - TODO
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Github Actions](https://github.com/features/actions)
- [Jest](https://jestjs.io/)
- [Material UI](https://mui.com/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [React Hook Form](https://react-hook-form.com/) and [validator.js](https://github.com/validatorjs/validator.js)
- [Redux RTK query](https://redux-toolkit.js.org/rtk-query/overview)
- [Typescript](https://www.typescriptlang.org/)

### Installation
1. Install [Node LTS](https://nodejs.org/en/)
2. Install [Docker](https://www.docker.com/)
3. Obtain OAuth credentials from the [Google API Console](https://console.developers.google.com/) > Create credentials > OAuth client ID 
   
   a. Authorized JavaScript origins:  
     - `http://localhost:3000`
     - `http://localhost:3001` (for testing locally)
  
   b. Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3001/api/auth/callback/google` (for testing locally)

4. Clone this repo
5. Create the following `.env` file

`.env`
```
POSTGRES_HOSTNAME=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

SECRET=<any string>
GOOGLE_CLIENT_ID=<see step 3>
GOOGLE_CLIENT_SECRET=<see step 3>

SITE_PROTOCOL=http
SITE_HOSTNAME=localhost
PORT=3000

NEXTAUTH_URL=${SITE_PROTOCOL}://${SITE_HOSTNAME}:${PORT}
```
6. Run the following in the root directory
```
npm run install
```

### Start
The following command will containerize, build, and start the database, backend, and frontend
```
npm run up
```

### Testing locally
Create the following env file

`.env.test.local`
```
POSTGRES_HOSTNAME=postgres-test
POSTGRES_PORT=5433
POSTGRES_USER=postgres-test
POSTGRES_PASSWORD=postgres-test
POSTGRES_DB=postgres-test

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

SECRET=<any string>
GOOGLE_CLIENT_ID=<see step 3>
GOOGLE_CLIENT_SECRET=<see step 3>

SITE_PROTOCOL=http
SITE_HOSTNAME=localhost
PORT=3001
```
Create a separate dockerized server and database for testing locally:
```
npm run up:test
```
Run the tests locally in docker using
```
npm run test:local
```