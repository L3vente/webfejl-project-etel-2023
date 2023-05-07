import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dish_menu } from '../models/Dish_menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
colletionName = "Menus"
  constructor(private afs: AngularFirestore) { }
  getAllMenus(){
    return this.afs.collection<Dish_menu>(this.colletionName).valueChanges();
  }
}
