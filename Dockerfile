FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Use development mode for the MVP
ENV NODE_ENV=development

EXPOSE 3000

# Use dev server in development
CMD ["npm", "run", "dev"] 