import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT,
  jwt: {
    secret_token: process.env.JWT_SECRET,
    expire_in: process.env.JWT_EXPIRE_IN,
    secret_refresh_token: process.env.JWT_REFRESH_SECRET,
    secret_refresh_token_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  },
};
