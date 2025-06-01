import 'dotenv/config';

interface Config {
  PORT: number;
  HOST: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || 'localhost',
};

export default config;
