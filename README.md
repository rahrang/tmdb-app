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

In the `tmdb-app` directory, **create a file `.env`**
In this file, **add the following**.

```bash
NODE_ENV="development"
TMDB_API_KEY={YOUR_TMDB_API_KEY}
```

(If I emailed you this project, you should have received the API Key in the email.)

Then, ensure node, npm, and yarn (optional) are installed.

```bash
node -v # Confirm node is installed
npm -v # Confirm npm is installed
yarn -v # Confirm yarn is installed (not required)
```

This project was developed with the following versions:

- node: 10.15.3
- npm: 6.4.1
- yarn: 1.16.0

Once you have Node and npm installed, run the following commands:

```bash
cd tmdb-app
yarn install # or `npm install`
cd client
yarn install # or `npm install`
```

To run locally, assuming you are in the `tmdb-app` directory:

In one terminal window, run the server.

```bash
  yarn start
```

In another terminal window, run the client.

```bash
  cd client
  yarn start
```

## Future Features

With more time to work on this project, I would flesh out the following features:

- Server
  - test endpoints and/or controller functions using Jest
  - create more endpoints to act as a proxy to the TMDb API -- use the data in the application
  - cache responses using the [memory-cache](https://www.npmjs.com/package/memory-cache) package => benchmark response times with & without cache
- Client
  - improve overall styles
    - `MovieCard` component on the landing page (add more information to this, making extra API calls if necessary)
    - mobile-responsiveness -- the page design is terrible on screens smaller than around 800px wide
  - add rank numbers to the `MovieCard` components on the landing page -- the movies displayed are not in an obvious list and so a user may not understand how the movies are sorted
  - use URL query parameters when searching for movies, paginating, or selecting filters
    - this would be simply using the `navigate` function from the `@reach/router` to update a variable in the URL query, then reading the value in the `componentDidUpdate` function of the `MovieResults` component and making the `GET` request via the server for the results that match the query
    - the above set-up would be similar for pagination, except we'd only have a `page` variable in the URL query if the current page is not `1`.
  - filter movie results by genre, year
  - allow the user to switch the language in which they receive the results (the performant storage of this information in Redux is already built, but the changing of languages is not. I realized a bit later that not every movie has every translation offered by TMDb as a whole -- movie `A` could have 25 translations while movie `B` only has 5 -- it's a little more complex to build this out.)
  - incorporation of image and video assets on the single movie page
  - better-structured (flattened) reducers, especially the movie and search reducers, where data is nested 3 or 4 layers deep
  - wrap each `MovieCard` component in a `div` that, when hovered, fetches data on the movie -- this would make the site more crisp, as if the user clicks the card they've hovered over, the data on the movie is likely to have fetched before even rendering the movie details page (thus not showing the `PageLoader` component to the user)
