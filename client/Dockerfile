# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY client ./

# Build the React app
RUN npm run build

# Check the build output directory
RUN ls -al /app/dist

# Step 2: Serve the React app
FROM nginx:alpine

# Copy the build artifacts from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]