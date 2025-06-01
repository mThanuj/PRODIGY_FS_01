import 'dotenv/config';

interface Config {
  PORT: number;
  HOST: string;
  MONGODB_URI: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || 'localhost',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
};

export default config;
