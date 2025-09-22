import { Item } from './Item.ts';

export interface IBillDetail {
  id: number;
  quantity: number;
  price: number;
  item : Item;
}