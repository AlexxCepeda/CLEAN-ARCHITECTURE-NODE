import envVar from 'env-var';

export const envs = {
  PORT: envVar.get('PORT').required().asPortNumber(),
};
