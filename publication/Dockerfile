FROM dictybase/frontend-builder:14.16.1

ARG graphql_server
ENV NEXT_PUBLIC_GRAPHQL_SERVER ${graphql_server}

ARG ga_tracking_id
ENV NEXT_PUBLIC_GA_TRACKING_ID ${ga_tracking_id}

ARG client_keys
ENV CLIENT_KEYS ${client_keys}

ARG basename
ENV NEXT_PUBLIC_BASENAME ${basename:-publication}

ARG NEXT_PUBLIC_DEPLOY_ENV
ENV NEXT_PUBLIC_DEPLOY_ENV ${NEXT_PUBLIC_DEPLOY_ENV}

ARG alt_graphql_server
ENV NEXT_PUBLIC_ALT_GRAPHQL_SERVER ${alt_graphql_server:-https://betagraphql.dictycr.org}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install

ADD src src
ADD public public
ADD $CLIENT_KEYS /usr/src/app/src/common/utils/clientConfig.js

RUN yarn build

FROM dictybase/static-server:2.2.1
RUN mkdir /www
WORKDIR /www
COPY --from=0 /usr/src/app/build ./
ENTRYPOINT ["/usr/local/bin/app", "run", "-f", "/www", "--sub-url", "/publication"]
