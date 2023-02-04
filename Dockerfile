ARG BASE=node:16-bullseye
FROM ${BASE} AS dependencies

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate
RUN rm -rf prisma

# volumes folders must be created and chowned before docker-compose creates them as root
# create them during docker build
RUN mkdir -p .next
RUN chown node:node . node_modules .next
RUN chown -R node:node node_modules/.prisma

USER node

CMD npm run dev