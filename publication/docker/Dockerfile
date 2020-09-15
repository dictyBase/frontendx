
FROM node:12.18-alpine
LABEL maintainer="Siddhartha Basu <siddhartha-basu@northwestern.edu>"
LABEL maintainer="Eric Hartline <eric.hartline@northwestern.edu>"
RUN apk update && \ 
  apk upgrade && \
  apk add --no-cache bash git openssh build-base ca-certificates jq
ADD https://raw.githubusercontent.com/dictybase-playground/client-keys/1.0.0/clientConfig.js /opt/
ENV CI true

# URL for navbar json
ARG navbar_json
ENV REACT_APP_NAVBAR_JSON ${navbar_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.json}

# URL for footer json
ARG footer_json
ENV REACT_APP_FOOTER_JSON ${footer_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/footer/footer.json}

# URL for graphql server
ARG graphql_server
ENV REACT_APP_GRAPHQL_SERVER ${graphql_server}

# URL for kubeless functions
ARG func_server
ENV REACT_APP_FUNC_SERVER ${func_server}

# Setup client keys for third party auth
ARG client_keys
ENV CLIENT_KEYS ${client_keys}

# URL for download tabs json
ARG download_tabs_json
ENV REACT_APP_DOWNLOAD_TABS_JSON ${download_tabs_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/downloads/organisms-with-citations.dev.json}

# Google Analytics tracking ID
ARG ga_tracking_id
ENV REACT_APP_GA_TRACKING_ID ${ga_tracking_id}

# base path for React Router
ARG basename
ENV REACT_APP_BASENAME ${basename:-publication}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy only necessary files
COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install

# add necessary folders
ADD src src
ADD public public

# overwrite the client key file
ADD $CLIENT_KEYS /usr/src/app/src/common/utils/clientConfig.js

RUN yarn build

FROM dictybase/static-server:develop-09ee139
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www", "--sub-url", "/publication"]
