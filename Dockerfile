FROM node:12-alpine


WORKDIR /usr/app


COPY package*.json ./


RUN npm install pm2 -g


RUN npm install --production


ARG ENV=dev


COPY ./docker/enviroments/.env.$ENV ./.env


COPY . .


EXPOSE 4000


CMD ["pm2-runtime","index.js"]