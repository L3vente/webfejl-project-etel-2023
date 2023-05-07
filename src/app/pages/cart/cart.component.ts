import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart';
import { Dish_menu } from 'src/app/shared/models/Dish_menu';
import { User } from 'src/app/shared/models/User';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  
  Subscription?: Subscription;
  Observation?: Observable<Cart>;
  userSubscription?: Subscription;
  userObservation?: Observable<User>;
  megrendelve?: boolean
  userData?: User;
  constructor(private cartService: CartService, private orderService: OrderService, private userService: UserService,private datePipe: DateFormatPipe) { }
  ngOnDestroy(): void {
    this.Subscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
  dateFormat: string = 'yyyy-MM-dd HH:mm:ss';
  cart?: Cart
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;;
    this.Observation = this.cartService.getCart(user.uid) as Observable<Cart>;
    this.Subscription = this.Observation.subscribe({
      next: (data) => {
        this.cart = data;
      }
    });
    this.userObservation = this.userService.getUserById(user.uid) as Observable<User>;
    this.userSubscription = this.userObservation.subscribe({
      next: (data) => {
        this.userData = data as User;
      }
      
    });
    
  }
  emptyCart() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;;
    this.cartService.emptyCart(user.uid);
  }
  orderSubmit() {
    if(this.cart?.menus.length != 0 && this.userData != null){
      const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
      const date = this.datePipe.transform(new Date().getTime());
      let order = {
        userID: user.uid,
        name: {
          firstname: this.userData.name.firstname,
          lastname: this.userData.name.lastname
        },
        address: this.userData.address,
        orderDetails: this.cart?.menus as Array<Dish_menu>,
        date: date
      }
      this.orderService.addOrder(order).then(_=>{
        this.megrendelve = true;
        this.emptyCart();
      })
     
    }
  }
}
