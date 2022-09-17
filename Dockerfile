FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/server
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]
