# Use an official Node.js runtime as a parent image
FROM node:16.14.0

# Set the working directory to /app
WORKDIR /

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 3000

# Define the command to run your application
CMD ["./script/run.sh"]
