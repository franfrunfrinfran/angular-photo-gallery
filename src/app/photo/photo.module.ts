import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../auth/services/token-interceptor.service';



@NgModule({
  declarations: [
    MainComponent,
    PhotoComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
})
export class PhotoModule { }
