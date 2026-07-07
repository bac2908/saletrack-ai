import app from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`SaleTrack AI backend running at http://localhost:${env.PORT}`);
});
