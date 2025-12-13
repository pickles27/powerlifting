FROM node:22-alpine

# Install standard CA certificates for general internet use
RUN apk add --no-cache ca-certificates openssl wget

# Download the Amazon RDS Global CA Bundle into a known location
ENV RDS_CA_PATH="/etc/ssl/certs/rds-ca-bundle.pem"
RUN wget -O ${RDS_CA_PATH} https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem

# Configure Node.js to use this specific bundle in addition to default CAs
# NODE_EXTRA_CA_CERTS is a Node.js specific environment variable
ENV NODE_EXTRA_CA_CERTS=${RDS_CA_PATH}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript and copy files
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]