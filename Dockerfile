# Use an official Node runtime as a parent image
FROM node:18-alpine3.18


# Create app directory
WORKDIR /


COPY package*.json yarn.lock ./

RUN yarn

# Bundle app source
COPY src/ ./src
COPY artifacts/ ./artifacts
COPY *.ts .
COPY tsconfig.json .

RUN yarn run build