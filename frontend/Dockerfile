FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG API_URL=http://backend:3001
ENV API_URL=$API_URL

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
