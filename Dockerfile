# Use the latest Node.js image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json ./server/
RUN npm install --prefix server

# Bundle server source
COPY server/ ./server/

# Install client dependencies
COPY client/package*.json ./client/
RUN npm install --prefix client

# ...
ARG REACT_APP_CHAT_API_SK
ARG REACT_APP_FINE_TUNED_MODEL_API_SK
# ...

# Build client
COPY client/ ./client/
RUN npm run build --prefix client

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for API key if needed

# Start server
CMD [ "node", "./server/app.js" ]
