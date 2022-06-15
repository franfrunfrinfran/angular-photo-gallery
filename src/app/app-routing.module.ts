import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(x => x.AuthModule),
  },
  {
    path: "main",
    loadChildren: () => import("./photo/photo.module").then(X => X.PhotoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
