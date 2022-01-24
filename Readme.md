# MeetX

Anonymous P2P video chat with rooms

Demo:  https://meetx.yar.services/

## Screenshot

![screenshot](https://user-images.githubusercontent.com/42946445/150870787-5707de51-4dbc-4b36-9c2d-ae53fdb093e3.jpg)


## Features

- P2P video chat
- rooms with invite link
- off/on video
- off/on micro
- room creator can kick users


## Built With

- **aiohttp** with Python 3.9
- **React 17** with Typescript, eslint and react-router
- WebRTC by simple-peer
- socket.io
- Docker compose for easier development
- Nginx as a reverse proxy to allow backend and frontend on the same port
- letsencrypt 
- github workflow
- styled-components


## Getting Started

This project consists of aiohttp application for the backend API, React for client side application and nginx as a reverse-proxy for connecting api and the front-end. This project also use `docker-compose` to make it easy run all of the container at once.


### Prerequisites

Before you run this application make sure you have this installed in your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [docker-compose](https://docs.docker.com/compose/install/)

### Running Locally

To run the application locally, run this command

```
$ docker-compose -f docker/docker-compose.yml up
```

After you run above commands you can open the application from [http://localhost:8080/](http://localhost:8080/)
