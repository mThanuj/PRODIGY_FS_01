import app from './app';
import config from './config/config';

app.listen(config.PORT, config.HOST, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
