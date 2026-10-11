//shape for https://dummyjson.com/products/[id] response, returns one product object by itself
export interface ProductShape {
  //for one product, how the API sends it
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
}

