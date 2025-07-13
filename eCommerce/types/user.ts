import { Order } from "./order";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    nickname: string;
    password?: string;
    orders?: Order[];
  }
  