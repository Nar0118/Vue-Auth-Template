# Use the official Node.js image as the builder stage
FROM node:18 AS builder

# Set a working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN yarn install

# Copy your Node.js application source code to the container
COPY . .

# Use the official MongoDB image for the production stage
FROM mongo:latest

# Set a working directory in the container
WORKDIR /app

# Copy data to initialize the MongoDB database (if needed)
COPY data.json /data.json

# Expose the MongoDB default port
EXPOSE 27017

# Run the MongoDB server
CMD ["mongod"]

# Use the Node.js builder stage as the production stage
COPY --from=builder /app /app

# Expose the Node.js application port
EXPOSE 8080

# Start your Node.js application
CMD ["yarn", "dev"]
