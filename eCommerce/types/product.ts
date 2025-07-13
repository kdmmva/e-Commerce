import { ImageSourcePropType } from 'react-native';

export type ProductType = 'T-Shirt' | 'Dress' | 'Pants' | 'Shoes';

export interface Product {
  id: string;
  name: string;            
  type: ProductType;       
  description: string;     
  price: number;           
  image: ImageSourcePropType;           
  isFavorite: boolean;
  originalPrice?: number;    
}
