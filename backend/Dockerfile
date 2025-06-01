# Use Node 20 to match engine requirements (important for packages like react-router@7+)
FROM node:20-alpine

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /usr/backend/dev

# Copy only package manager files first (for layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy remaining app files
COPY . .

# Expose app port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
