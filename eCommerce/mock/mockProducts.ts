import { Product } from "@/types/product";
import { product1, product2, product3, product4 } from "../assets/images";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Modern Light Clothes",
    type: "T-Shirt",
    description: "Comfortable and stylish t-shirt",
    price: 212.99,
    image: product2,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Light Dress Bless",
    type: "Dress",
    description: "Elegant modern dress",
    price: 162.99,
    image: product4,
    isFavorite: false,
  },
  {
    id: "3",
    name: "Classic Pants",
    type: "Pants",
    description: "Classic fit pants",
    price: 89.99,
    image: product1,
    isFavorite: true,
  },
  {
    id: "4",
    name: "Running Shoes",
    type: "Shoes",
    description: "Comfortable running shoes",
    price: 120.99,
    image: product3,
    isFavorite: false,
  },
];
