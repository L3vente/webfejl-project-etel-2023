import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dish_menu} from '../models/Dish_menu';
import { User } from '../models/User';
import { Cart } from '../models/Cart';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
collectionName = "UserCart"

  constructor(private afs: AngularFirestore) { }
  getCart(userId: string){
    return this.afs.collection<Cart>(this.collectionName).doc(userId).valueChanges();
  }
  createCart(cart: Cart, user: User){
    return this.afs.collection<Cart>(this.collectionName).doc(user.id).set(cart);
  }
   addMenu(menu: Dish_menu, userId: string) {
    // let cart
    // return this.afs.collection<Cart>(this.collectionName).doc(userId).set()  
    const cartDoc = this.afs.collection<Cart>(this.collectionName).doc(userId);
    return cartDoc.get().toPromise().then(doc => {
      const cart = doc?.data() as Cart;
      if (cart && cart.menus) {
        cart.menus.push(menu);
        return cartDoc.set(cart);
      }else{
        return null;
      }
    });
   }
  emptyCart(userID: string){
    let cart = {
      userId: userID,
      menus: []
    }
    return this.afs.collection<Cart>(this.collectionName).doc(userID).set(cart);
  }  
}
