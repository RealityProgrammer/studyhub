import { Account } from './Account';

export interface Teacher {
  id: number;
  address: string;
  experience: number;
  birthday: string;
  accountDto: Account;
}
