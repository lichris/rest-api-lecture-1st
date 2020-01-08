FROM node:12.14-alpine

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY prepare.sh /usr/bin/prepare-server
RUN chmod 700 /usr/bin/prepare-server

RUN apk --no-cache add --virtual builds-deps build-base python mysql-client
RUN npm i -g npm nodemon sequelize-cli

RUN mkdir -p /home/app
WORKDIR /home/app