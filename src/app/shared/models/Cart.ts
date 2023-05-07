import { Dish_menu } from "./Dish_menu";

export interface Cart{
    userId: string;
    menus: Array<Dish_menu>
}