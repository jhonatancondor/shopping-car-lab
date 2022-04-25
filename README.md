# Shopping Car CondorLabs
## Personal Project ShoppingCar 

[![N|Solid](https://c.na211.content.force.com/servlet/servlet.ImageServer?id=0150h0000056P9rAAE&oid=00DE0000000c48tMAA)](https://condorlabs.io)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://condorlabs.io)

Personal Project ShoppingCar Condor labs.

## Installation

ShoppingCar requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd shopping-car-lab
npm i
npm start
```

For production environments...

```sh
npm install --production
npm run build
```

## Docker

ShoppingCar is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd shopping-car-lab
docker build -t shopping-car --build-arg ENV=prod .
```
```sh
docker run -t -d -p 8080:4000 shopping-car
```

```sh
127.0.0.1:8080
```
