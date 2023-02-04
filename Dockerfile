FROM node:16

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci

USER node

CMD npm run dev:migrate