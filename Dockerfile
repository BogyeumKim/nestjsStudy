FROM node

WORKDIR /app

COPY package.json,yarn.lcok /app

RUN npm install yarn

COPY . /app

EXPOSE 3000

CMD [ "yarn", "start:dev" ]