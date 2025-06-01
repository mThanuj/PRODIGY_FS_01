import 'dotenv/config';

interface Config {
  PORT: number;
  HOST: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  NODE_ENV: string;
  ORIGIN: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || 'localhost',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  ORIGIN: process.env.ORIGIN as string,
};

export default config;
