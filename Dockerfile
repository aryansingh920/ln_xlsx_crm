# Use an official Node.js runtime as a parent image with version 16.14.2
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Copy your application files to the container
COPY . /app

# Install Python, pip, and other dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# Expose the port that your application will listen on
EXPOSE 3000

# Define environment variables
ENV PORT 3000
ENV OPENAI_API_KEY ""
ENV BARD_1PSID_cookie_value ""
ENV BARD_1PSIDTS_cookie_value ""
ENV BARD_1PSIDCC_cookie_value ""
ENV RAPID_API_KEY_VALUE "4749eed77fmsh282e13aab241c01p1c733djsn8a439686b347"
ENV ZERO_BOUNCE_API_KEY_VALUE ""

# Install Node.js dependencies
RUN rm -rf node_modules
RUN npm ci

# Compile SCSS to CSS
RUN bash sass.sh

# Start your application
CMD ["npm", "start"]
