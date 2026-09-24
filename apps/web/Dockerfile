FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps ./apps
RUN npm install --no-audit --no-fund
RUN npm run build -w @portfolio/web

FROM nginx:1.27-alpine
COPY --from=builder /app/apps/web/out /usr/share/nginx/html
EXPOSE 80
