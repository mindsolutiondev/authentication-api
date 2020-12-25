FROM node:14.14-alpine as build

ENV NODE_ENV=production
ENV PORT=5555
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
RUN yarn && yarn build
CMD ["yarn", "start"]