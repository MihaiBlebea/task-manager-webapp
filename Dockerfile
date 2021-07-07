# FROM node:11.13.0-alpine

# # create destination directory
# RUN mkdir -p /usr/src/nuxt-app
# WORKDIR /usr/src/nuxt-app

# # update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# # copy the app, note .dockerignore
# COPY . /usr/src/nuxt-app/
# RUN npm install

# # build necessary, even if no static files are needed,
# # since it builds the server as well
# RUN npm run build

# # expose 5000 on container
# EXPOSE 5000

# # set app serving to permissive / assigned
# ENV NUXT_HOST=0.0.0.0

# # set app port
# ENV NUXT_PORT=5000

# # start the app
# CMD [ "npm", "start" ]
### STAGE 1: Build ###
FROM node:latest as build

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm install

COPY . /usr/src/app

RUN npm run generate

### STAGE 2: NGINX ###
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]