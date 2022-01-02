# bookmarks

This project is a basic API used to manage bookmarks for vimeo and flickr.

## Requirements

- `Docker`
- `docker-compose`
- `node >=16.13.0` (previous versions have not been tested yet) 
- `npm`

## Deploy in a local environment

```sh
# Creates .env
$ cp .env.blank .env

# Example of populate
$ echo "
NODE_ENV=development

ADDRESS=localhost
PORT=3000

MONGO_URI=mongodb://bookmarksUser:mysecret@localhost:27017/bookmarks
" > .env

# Installs dependencies
$ npm i

# Starts mongo database
$ docker-compose up -d mongo

# Starts project
$ npm start

# Optional: starts project with nodemon
$ npm run dev
```

## Deploy in a docker container

```sh
# With docker-compose
$ docker-compose up -d bookmarks
```

## Generate API documentation

```sh
# Generates documentation in doc/
$ npm run doc

# Serves documentation
$ npm run doc:serve
```

## Reset dataset

```sh
# Stops running containers
$ docker-compose down
# Starts containers
$ docker-compose up -d mongo
```

## TODO

- Implement a cache to save data obtained from providers (flickr, vimeo)
- Implement other providers
- Implement API authentication (with 2FA)
- Add more tests

