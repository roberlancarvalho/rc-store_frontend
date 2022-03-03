export interface Product {
  id?: string;
  name: string;
  image: string;
  description: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
  stock: number;
  status: boolean;
  price: number;
  category_id: string;
}
