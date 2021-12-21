# estágio de compilação
FROM node:lts as build-stage
ARG vuemode=development
WORKDIR /app
COPY . .
RUN npm run $vuemode

# estágio de produção
FROM nginx:stable as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]