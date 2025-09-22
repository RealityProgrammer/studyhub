export interface Course {
  id: number;
  code:string;
  name: string;
  description: string;
  price: number;
  discount: number;
  status: string;
  categoryId:number;
  aim:string;
  imageUrl:string;
  createdDate:string;
}