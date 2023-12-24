# Use an official Node.js runtime as a parent image with version 16.14.2
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Create directories for upload and output
RUN mkdir upload output

# Install Python, pip, and other dependencies
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy requirements.txt from a different directory into the container
COPY script/requirements.txt /app/ 

# Install Python dependencies from requirements.txt
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Copy the sass.unix.sh script to the container
COPY script/sassunix.sh /app/script/sass.sh

# Make the script executable
RUN chmod +x /app/script/sass.sh

# Expose the port that your application will listen on
EXPOSE 3005

# Define environment variables
ENV PORT 3005
ENV OPENAI_API_KEY ""
ENV BARD_1PSID_cookie_value ""
ENV BARD_1PSIDTS_cookie_value ""
ENV BARD_1PSIDCC_cookie_value ""
ENV RAPID_API_KEY_VALUE "4749eed77fmsh282e13aab241c01p1c733djsn8a439686b347"
ENV ZERO_BOUNCE_API_KEY_VALUE ""

# Install Node.js dependencies
RUN rm -rf node_modules
RUN npm i

# Compile SCSS to CSS using the sass.unix.sh script
RUN /app/script/sass.sh

# Start your application
CMD ["npm", "start"]
