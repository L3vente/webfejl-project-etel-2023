import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklyMenuComponent } from './weekly-menu.component';

const routes: Routes = [{ path: '', component: WeeklyMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklyMenuRoutingModule { }
