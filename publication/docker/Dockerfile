
FROM node:12.18-alpine
LABEL maintainer="Siddhartha Basu <siddhartha-basu@northwestern.edu>"
LABEL maintainer="Eric Hartline <eric.hartline@northwestern.edu>"

ENV CI true

ARG navbar_json
ENV REACT_APP_NAVBAR_JSON ${navbar_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.json}

ARG footer_json
ENV REACT_APP_FOOTER_JSON ${footer_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/footer/footer.json}

ARG graphql_server
ENV REACT_APP_GRAPHQL_SERVER ${graphql_server}

ARG func_server
ENV REACT_APP_FUNC_SERVER ${func_server}

ARG download_tabs_json
ENV REACT_APP_DOWNLOAD_TABS_JSON ${download_tabs_json:-https://raw.githubusercontent.com/dictyBase/migration-data/master/downloads/organisms-with-citations.dev.json}

ARG ga_tracking_id
ENV REACT_APP_GA_TRACKING_ID ${ga_tracking_id}

ARG basename
ENV REACT_APP_BASENAME ${basename:-publication}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install

ADD src src
ADD public public

ARG client_keys
ENV CLIENT_KEYS ${client_keys}
ADD $CLIENT_KEYS /usr/src/app/src/common/utils/clientConfig.js

RUN yarn build

FROM dictybase/static-server:develop-09ee139
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www", "--sub-url", "/publication"]
