FROM node:15-alpine
RUN apk add --no cache python g++ make
WORKDIR /app 
COPY . . 
RUN npm install
CMD ["npm","run","dev"]
