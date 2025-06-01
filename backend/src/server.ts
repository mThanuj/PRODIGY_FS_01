import app from './app';
import config from './config/config';
import connectDB from './config/db';

app.listen(config.PORT, config.HOST, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  await connectDB();
});
