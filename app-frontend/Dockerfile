# Dockerfile for React client

# Build react client
FROM node:16

# Working directory
WORKDIR /usr/src/app-frontend

COPY package*.json ./

###  Installing dependencies

RUN npm install --force

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]
