FROM node:14.16.0-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start" ]
