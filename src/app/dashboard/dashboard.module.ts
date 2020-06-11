import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PostCreateModule } from '../post/post-create/post-create.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    PostCreateModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
