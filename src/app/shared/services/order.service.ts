import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dish_menu } from '../models/Dish_menu';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  collectionName = 'Orders'

  constructor(private afs: AngularFirestore) { }
  addOrder(order: Order){
    return this.afs.collection<Order>(this.collectionName).add(order);
  }
  getAll(userID:string){
    return this.afs.collection<Order>(this.collectionName, ref => ref.where('userID', "==", userID)).valueChanges()
  }
}
