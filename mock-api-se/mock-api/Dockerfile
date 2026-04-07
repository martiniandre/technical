FROM node:20-alpine

LABEL description="Mock API for Front-end Technical Test"

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY src/ ./src/
COPY data.json ./
RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
