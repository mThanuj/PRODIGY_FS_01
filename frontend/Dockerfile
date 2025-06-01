FROM node:20-alpine

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /usr/frontend/dev

# Copy only essential files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start development server
CMD ["pnpm", "dev"]
