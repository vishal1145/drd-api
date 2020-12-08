FROM node:lts-alpine

RUN mkdir /backend

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 80

CMD [ "node", "server", "." ]
