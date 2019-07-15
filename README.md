# tmdb-app

A backend-first web application using the TMDb API (https://www.themoviedb.org/documentation/api)

## Table of Contents

- [Local Development](#local-development)
- [Future Features](#future-features)

## Local Development

Open your terminal, navigate to a directory of your choosing, and run

```bash
git clone https://github.com/rahrang/tmdb-app.git
```

This will create a directory `tmdb-app` in your directory.

If you do not yet have Node and npm (node package manager) installed, follow the directions below.

You can download Node and npm [here](https://nodejs.org/en/download/). You can also use [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) as an alternative for npm. If you have a Mac, you can easily install it using [Homebrew](https://brew.sh/).

After download, ensure installation. Restart your terminal, open a window, and then run:

```bash
node -v # Confirm node is installed
npm -v # Confirm npm is installed
yarn -v # Confirm yarn is installed (not required)
```

This project was developed with the following versions:
node: 10.15.3
npm: 6.4.1
yarn: 1.16.0

Once you have Node and npm installed, run the following commands:

```bash
cd tmdb-app
yarn install # or `npm install`
cd client
yarn install # or `npm install`
```

To run locally, assuming you are in the `tmdb-app` directory:

In one terminal window, run the server:

```bash
  yarn start
```

In another terminal window, run the client:

```bash
  cd client
  yarn start
```

## Future Features

With more time to work on this project, I would flesh out the following features:
