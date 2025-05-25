import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  // JWT
  jwt_secret_token: process.env.JWT_SECRET_TOKEN as string,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN as string,
  jwt_secret_expiration: process.env.JWT_SECRET_EXPIRATION as string,
  jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,

  node_env: process.env.NODE_ENV,
};
