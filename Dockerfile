FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:12-alpine AS server
WORKDIR /app
COPY package.json .
RUN npm install --production

COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build

EXPOSE 4000
CMD ["npm", "start"]
