# Readme

## Migration with Kysley

Doc: https://kysely.dev/docs/migrations
We have written a script in the package.json file called `db:migrate`.
Notes:

==========

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

## I. Development Environment Setup

1. Clone the repository
   ```
   $ git clone https://github.com/odesseyHQ/nibbles-logtrack.git
   ```
2. Navigate to the server directory
3. Setup the [env variables needed](#ii-environment-variables-needed) in the `.env` file
4. Run this command to install all the dependencies

   ```bash
   $ pnpm install
   ```

## III. Running the app

```bash
# watch mode
$ pnpm run start:dev
```
