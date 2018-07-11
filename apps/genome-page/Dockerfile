# It's a multi stage build https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# The first one build single file js for the web app
# The second one copies the file and server with a golang static web server
FROM node:10.4.0-alpine
LABEL maintainer "Siddhartha Basu <siddhartha-basu@northwestern.edu>"
LABEL maintainer "Eric Hartline <eric.hartline@northwestern.edu>"

# include git, otherwise npm install doesn't work
RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh jq

# URL for api server
ARG api_server
ENV REACT_APP_API_SERVER ${api_server:-https://betaapi.dictybase.local}

# URL for auth server
ARG auth_server
ENV REACT_APP_AUTH_SERVER ${auth_server:-https://betaauth.dictybase.local}

# base path for React Router
ARG basename
ENV REACT_APP_BASENAME ${basename:-gene}

# Setup client keys for third party auth
ARG client_keys
ENV CLIENT_KEYS ${client_keys:-https://raw.githubusercontent.com/dictybase-playground/client-keys/master/clientConfig.js}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy only necessary files
COPY package-lock.json ./

# package.json have to be modified later on, so 
ADD package.json package-dev.json
# create new package.json with relative path
RUN jq '. + {"homepage": "/gene"}' package-dev.json > package.json \
  && rm package-dev.json

# add necessary folders
ADD src src
ADD public public

# overwrite the client key file
ADD $CLIENT_KEYS /usr/src/app/src/utils/clientConfig.js

# Use same node path
ENV NODE_PATH src

# standard install/build commands
RUN npm install && npm run build

FROM dictybase/static-server:1.0.0
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www", "--vf", "/static", "--sub-url", "/gene"]
