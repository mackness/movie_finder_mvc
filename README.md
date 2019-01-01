# Netflix Take Home Assessment
Welcome to my Netflix take home assessment. Take a look at the instructions below to setup the project.

## Setup:
```
> git clone https://macksol@bitbucket.org/macksol/netflix-assessment.git
> cd netflix-assessment
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
