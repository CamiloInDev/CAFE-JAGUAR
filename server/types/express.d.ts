declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        rol: 'cliente' | 'admin';
      };
    }
  }
}

export {};
