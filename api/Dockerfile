# Use the official Node.js image
FROM node:18

WORKDIR /usr/src/app

# Install dependencies
COPY api/package.json api/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY api ./

# Expose port 3001
EXPOSE 3001

# Command to run the API
CMD ["npm", "start"]