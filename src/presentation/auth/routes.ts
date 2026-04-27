import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const database = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const { loginUser, registerUser } = new AuthController(authRepository);
    router.post('/login', loginUser);
    router.post('/register', registerUser);
    return router;
  }
}
