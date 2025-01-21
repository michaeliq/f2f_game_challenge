FROM node:20

WORKDIR /game

COPY . .

RUN npm install && npm run build

EXPOSE 4511

CMD ["npm","start"]
