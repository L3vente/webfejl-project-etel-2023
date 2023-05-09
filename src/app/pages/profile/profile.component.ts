import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/Order';
import { OrderService } from 'src/app/shared/services/order.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy,OnChanges{
editUser() {
 this.isUpdate=true; 
 this.signUpForm.setValue ({
    address: this.user?.address as string,
    phone: this.user?.phone as string,
    name: ({
      lastname: this.user?.name.lastname as string,
      firstname: this.user?.name.firstname as string
    })
});
}
  isOrders? = false;
  loading? = false;
  orderSubscription?: Subscription;
  orderObservation?: Observable<Array<Order>>;
  userDataSubscription?: Subscription;
  userDataObservation?: Observable<User>;
  orders?: Array<Order>;
  orderNumber=0;
  user?: User;
  isUpdate? = false;
  userId?: string; 
  constructor(private orderService: OrderService, private userService: UserService,private authService: AuthService){
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.orderNumber = 0;
  }


  signUpForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    name: new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required])
    }),

  }, { validators: this.passwordsMatchValidator });
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
   
    const phone = control.get('phone')?.value as string;
    const phoneno = /^(\+36|06)(20|30|31|50|70)\d{7}$/;


    if (phone && !phone.match(phoneno)) {
      return { 'badPhone': true };
    }

    return null;
  }
  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
    this.userDataSubscription?.unsubscribe();
    this.orderNumber = 0;
  }
  setOrderNumber(){
    this.orderNumber++;
  }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
   this.userId = user.uid;
    this.orderObservation = this.orderService.getAll(this.userId as string);
    this.orderSubscription = this.orderObservation.subscribe({next: (data)=>{
      this.orderNumber = 0;
        this.orders = data;
    }});
    this.userDataObservation = this.userService.getUserById(this.userId as string) as Observable<User>;
    this.userDataSubscription = this.userDataObservation.subscribe({next: (data)=>{
      this.user = data;
    }});
  }
  onSubmit(){
    this.loading = true;
    if(this.signUpForm.valid){
      const userr: User = {
        id: this.userId as string,
        email: this.user?.email as string,
        username: this.user?.username as string,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        },
        address: this.signUpForm.get('address')?.value as string,
        phone: this.signUpForm.get('phone')?.value as string
      }
      this.userService.update(userr).then(_ => {
        this.loading = false;
        this.isUpdate = false;
        
      }).catch(error => {
       
        console.error(error);
      })
     
    }
    
  }
  deleteAccount(){
    this.userService.delete(this.user as User);
    this.logout();
  }
  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');

    }).catch(error => {
      console.error(error);
    });
  }
}
