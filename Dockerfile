# 构建阶段
FROM node:20-alpine AS build
WORKDIR /app

# 安装 pnpm
# RUN npm install -g pnpm

COPY package.json ./
COPY .npmrc ./

RUN npm install --legacy-peer-deps --registry=https://registry.npmmirror.com/

# 构建应用
COPY . .
RUN npm run build

# 部署阶段
FROM nginx:1.24-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
