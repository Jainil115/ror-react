FROM node:latest as builder
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build
# CMD [ "npm", "start" ]
#----------------------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf 

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./key.pem /etc/ssl/private/key.pem
COPY ./cert.pem /etc/ssl/certs/cert.pem
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]