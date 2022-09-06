## Description

This is Jodel challenge code written in the [Nest](https://github.com/nestjs/nest) framework.

## Environment Variables
You should create these files to install and run the app properly in advance.

.env file:
```env
APP_NAME=JodelChallenge
PORT=3000
DATABASE_TYPE=sqlite
DATABASE_URL=file:./dev.db
DATABASE_URL_TEST=file:./test.db
```
.env.test
```
DATABASE_URL=file:./test.db
```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash

# test integration
$ npm run test:int
```

## Swagger

After starting the app you can see all the endpoints from [here](http://localhost:3000/api) (/api).

## Stay in touch

- Author - [Shayan Karami](https://www.linkedin.com/in/shayankarami/)

## License

Nest is [MIT licensed](LICENSE).
