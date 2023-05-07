import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeeklyMenuRoutingModule } from './weekly-menu-routing.module';
import { WeeklyMenuComponent } from './weekly-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    WeeklyMenuComponent
  ],
  imports: [
    CommonModule,
    WeeklyMenuRoutingModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ]
})
export class WeeklyMenuModule { }
