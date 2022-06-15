import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: "photo/:id",
    component: PhotoComponent,
    pathMatch: 'full'
  },
  {
    path: "photoNew",
    component: CreateComponent,
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "main"
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhotoRoutingModule { }
