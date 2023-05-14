FROM node:16-alpine

RUN mkdir -p /home/node/node_modules && chown -R node:node /home/node

WORKDIR /home/node

COPY package*.json ./

RUN npm install

RUN mkdir -p /home/node/xenovo && chown -R node:node /home/node/xenovo

WORKDIR /home/node/xenovo

USER node

COPY --chown=node:node . .

EXPOSE 1124

CMD [ "node", "server.js" ]