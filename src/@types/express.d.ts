import { id } from 'date-fns/locale';

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
