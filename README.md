TS_music (Solved using: Option 1 Node.js and Exoress.js)
========

## Usage
[Node.js](http://nodejs.org/) and the [Node Packaged Modules](https://npmjs.org/) have to be installed.

Install the dependancy modules with
```
npm install
```

Launch server with
```
npm start
```

## Tests

Running `npm test` will run all of the mocha tests located in the `test/` directory. The specified tests currently are integration tests for 3 endpoints. `POST /listen`,  `POST /follow` and `GET /recommendations?user=<USER_ID>`.

## API Documentation

### Follow

    POST /follow

Parameters

| Name        | Type           | Description  |
| ------------- |:-------------:|:-----|
| follower      | string      |   The username of the follower. |
| followee | string      |    The username of the followee. |

Response

    HTTP/1.1 201
### Listen

    POST /listen

Parameters

| Name        | Type           | Description  |
| ------------- |:-------------:|:-----|
| user      | string      |   The username of the listener. |
| song | string      |    The id of the song. |

Response

    HTTP/1.1 201

### Recommendations

    GET /recommendations

Parameters

| Name        | Type           | Description  |
| ------------- |:-------------:|:-----|
| user      | string      |   The username of the user the recommendation is requested for. |

Response
     
```json
    {
       "list":[
          "m4",
          "m9",
          "m8",
          "m2",
          "m11"
       ]
    }
```     
    HTTP/1.1 200
