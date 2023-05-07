import { Dish_menu } from "./Dish_menu";

export interface Order {
    userID: string;
    name: {
        firstname: string;
        lastname: string;
    }
    address: string;
    orderDetails: Array<Dish_menu>;
    date: string;
}