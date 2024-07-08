# Dolli Clud API server
- App to interface with Dolli API server 
- Built with React + Vite

## Install and start server
To install and run the server, use one of the following methods:

### 1. Using NodeJS and npm tools
- Install using: `npm install --save-dev cross-env`
- Run using: 
    - `npm run start [--port=<port>]`
    - eg. `npm run start`
    - eg. `npm run start --port=9999`
    - Note: default port is set to 7777 in vite.config.json

### 2. Using Dockerfile
- Build using: `docker build -t dolli-cloud-reservation-app .`
- Run using: 
    - `docker run -p <LOCAL_PORT_TO_EXPOSE_TO>:80 dolli-cloud-reservation-app`
    - eg. `docker run -p 8080:90 dolli-cloud-reservation-app`
    - Note: nginx by default starts on port 80 in the docker container