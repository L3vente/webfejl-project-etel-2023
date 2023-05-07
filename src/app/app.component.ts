import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedInUser?: firebase.default.User | null;
  userDataSubscription?: Subscription;
  userDataObservation?: Observable<firebase.default.User>;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }


  ngOnInit() {
    // this.routes = this.router.config.map(conf => conf.path) as string[];
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
    //   const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
    //   if (this.routes.includes(currentPage)) {
    //     this.page = currentPage;
    //   }

    // });
    this.userDataObservation = this.authService.isUserLoggendIn() as Observable<firebase.default.User>;
    this.userDataSubscription = this.userDataObservation?.subscribe({
      next: (data) => {
        this.loggedInUser = data;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }, error: (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    });
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }


  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/main");
      console.log('Logged out successfully');

    }).catch(error => {
      console.error(error);
    });
  }

  onClose($event: any, _t9: MatSidenav) {
    if ($event === true) {
      _t9.close();
    }
  }

  onToggleSidenav(_t9: MatSidenav) {
    _t9.toggle();
  }

}
