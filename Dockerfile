FROM node:8.11.2-alpine

# File Author / Maintainer
LABEL maintainer="Antonio Mejias"

#Setting enviroment variables
ENV appDir /var/www/app
ENV NODE_ENV development

#Setting work directory
WORKDIR ${appDir}

# Create app directory
RUN mkdir -p $appDir
RUN apk add --no-cache git
# Install app dependencies while the images is builded
ADD package.json $appDir
#ADD yarn.lock $appDir
#RUN npm i -g pm2
RUN yarn

# Bundle app source
ADD . $appDir

# Compilate the app
RUN yarn run build

EXPOSE 8080

# Staring App
ENTRYPOINT ["node"]
CMD ["dist/server.js"]
