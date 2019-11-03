
# Create image based on the official Node image from dockerhub
#FROM node
#FROM ubuntu:16.04
FROM debian:jessie
#FROM node:8-alpine

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NODE_VERSION=10.16.0 \
    NPM_VERSION=6.9.0 \
    IONIC_VERSION=4.2.1 \
    CORDOVA_VERSION=8.1.2

RUN apt-get update && \
    apt-get install -y git wget curl unzip build-essential && \
    apt-get install gcc g++ make && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm install -g npm@"$NPM_VERSION" cordova@"$CORDOVA_VERSION" ionic@"$IONIC_VERSION" && \
    npm cache clear --force && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    apt-get clean && \
    rm google-chrome-stable_current_amd64.deb && \
    mkdir Sources && \
    mkdir -p /root/.cache/yarn/ 


# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

#RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
#RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

# Install dependecies
RUN npm install
#RUN npm rebuild node-sass

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
#CMD ["npm", "start"]
CMD ["npm", "start"]