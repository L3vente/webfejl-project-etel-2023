import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Dish_menu } from 'src/app/shared/models/Dish_menu';
import { Image } from 'src/app/shared/models/Image';
import { CartService } from 'src/app/shared/services/cart.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';


@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.scss']
})
export class WeeklyMenuComponent implements OnInit, OnDestroy {
  imagesSubscription?: Subscription;
  imagesObservation?: Observable<Array<Image>>;
  menusSubscription?: Subscription;
  menusObservation?: Observable<Array<Dish_menu>>;
  user:any;
  constructor(private imageService: ImageService, private cartService: CartService, private menuService: MenuService, private orderService: OrderService) { }
  ngOnDestroy(): void {
    this.imagesSubscription?.unsubscribe();
    this.menusSubscription?.unsubscribe();
  }
  toCart(menu: Dish_menu | undefined) {
    if (menu) {
      const userId = this.user.uid;
      this.cartService.addMenu(menu, userId);


    }
  }
  napok: Array<string> = ["hetfo", "kedd", "szerda", "csutortok", "pentek"];
  images: Array<Image> = [];
  menus: Array<Dish_menu> = [];
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    for (let index = 0; index < this.napok.length; index++) {
      this.imageService.loadImage("images/" + this.napok.at(index) + ".jpg").subscribe({
        next: (data) => {
          let image = {
            url: data as string,
            dayName: this.napok.at(index) as string,
          }
          this.images.push(image)
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {

        }
      });

    }
    this.menusObservation = this.menuService.getAllMenus();

    this.menusSubscription = this.menusObservation.subscribe({
      next: (data) => {
        this.menus = data;
      }, error: (err) => {
        console.error(err);
      }
    })


  }
  loadimage(day: string) {
    for (let index = 0; index < this.images.length; index++) {
      if (day === this.images[index].dayName) {
        return this.images[index].url;
      }

    }
    return null;

  }
}
