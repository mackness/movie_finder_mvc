# MVC Movie Finder
An application that fetches movies from the IMDB API. I wanted to build this app to take a step back from JS framekworks. I wrote this app with as few rumtime dependencies as possible. It depends on lodash.throttle and axios at runtime, that's it.

## Setup:
```
> git clone https://macksol@bitbucket.org/macksol/movie-finder.git
> cd movie-finder
> echo API_KEY=[YOUR_IMDB_API_KEY] > .env
> yarn
> yarn start
> Navigate to http://localhost:1234/?search=batman in Chrome, Firefox, Safari or Edge.
```

## Test:
```
> yarn test
```

## Notes:
- Decided to take a very standard MVC approach to application structure.
- Used Parcel because I wanted to use JS modules but didn't want to setup Webpack.
- Used Axios for data fetching becuase it's very easy to use and has a great testing story.

## TODO:
- Improve animation handling.
- Implement pagination or continuous loading of movie results.
