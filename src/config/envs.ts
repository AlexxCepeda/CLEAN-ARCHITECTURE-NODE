import envVar from 'env-var';

export const envs = {
  PORT: envVar.get('PORT').required().asPortNumber(),
  DATABASE_URL: envVar.get('DATABASE_URL').required().asString(),
  JWT_SECRET_KEY: envVar.get('JWT_SECRET_KEY').required().asString(),
};
