FROM node:16-alpine

RUN mkdir -p /home/node/xenovo/node_modules && chown -R node:node /home/node/xenovo

WORKDIR /home/node/xenovo

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

EXPOSE 1124

CMD [ "node", "server.js" ]