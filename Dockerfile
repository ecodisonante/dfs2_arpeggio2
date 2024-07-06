FROM node:22-alpine3.19 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.27.0

# copiar compilacion al contenedor
COPY --from=build-step /app/dist/arpeggio2/browser /usr/share/nginx/html
# pisar index.html default de nginx
COPY --from=build-step /app/dist/arpeggio2/browser/index.csr.html /usr/share/nginx/html/index.html
# asignar puertos
EXPOSE 80:80

CMD ["nginx", "-g", "daemon off;"]