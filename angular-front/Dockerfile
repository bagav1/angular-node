FROM node:16 as build-front
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY . .
EXPOSE 4201
CMD ["npm", "run", "start"]
