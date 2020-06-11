import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnonymousGuard } from './auth/anonymous.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: "auth",
      loadChildren: ()=>import('src/app/auth/auth.module').then(m=>m.AuthModule),
      canLoad: [AnonymousGuard]
    },
    {
        "path": "",
        canActivate: [AuthGuard],
        "children": [
          {
            path: "",
            component: DashboardComponent
          },
        ]
    },
    // {
    //     "path": "**",
    //     "redirectTo": "error_404",
    //     "pathMatch": "full"
    // },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
