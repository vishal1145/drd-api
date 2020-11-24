FROM node:lts-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

CMD [ "node", "server", "." ]
