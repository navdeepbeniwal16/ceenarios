# Stage 1: Build the Flutter web application
FROM cirrusci/flutter:latest as build

# Set the working directory
WORKDIR /app

# Copy the Flutter project files to the container
COPY . .

# Get Flutter dependencies
RUN flutter pub get

# Build the Flutter web application
RUN flutter build web

# Stage 2: Serve the Flutter web application using Nginx
FROM nginx:alpine

# Copy the Flutter web build output to the Nginx server
COPY --from=build /app/build/web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
