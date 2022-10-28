#stage 1
FROM node:latest as node
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
COPY package*.json ./
RUN npm install -g @angular/cli@latest
RUN npm install 
COPY . ./
#RUN npm run build:dev
RUN npm run build --prod
 
#stage 2
FROM nginx:alpine
#RUN rm -rf /usr/share/nginx/html/*
#COPY  --from=node /app/nginx/*  /etc/nginx/conf.d/default.conf
COPY --from=node /usr/local/app/dist/vouchainclient /usr/share/nginx/html

#EXPOSE 9898