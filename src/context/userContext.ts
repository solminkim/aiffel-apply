import { createContext } from 'react';
import { TUserContext } from '@/types/context';

export const initialState: TUserContext = {
  user: {
    name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    course: '',
    platform: '',
    has_nb_card: false,
    term1: false,
    term2: false,
    term3: false,
  },
  content: {
    writing: '',
    portfolio_link: '',
  },
};

export const UserContext = createContext<TUserContext>(initialState);
