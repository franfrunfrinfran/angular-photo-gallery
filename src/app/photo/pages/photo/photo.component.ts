import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  id!: string;
  photo!: Photo;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.id = param["id"];
      this.photoService.getPhoto(this.id)
        .subscribe({
          next: (res) => this.photo = res,
          error: (err) => {
            console.log(err)
            if(err.status == 401) {
              this.router.navigate(['/auth/login'])
            }
          }
        })
    })
  }

  deletePhoto(id: string){
    this.photoService.deletePhoto(id)
      .subscribe({
        next : (res) => this.router.navigate(['/main']) ,
        error : (err) => console.log(err)
      })
  }
    
  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement):boolean{
    this.photoService.updatePhoto(this.id, title.value, description.value)
    .subscribe({
      next : (res) => this.router.navigate(['/main']) ,
      error : (err) => console.log(err)
    })
    return false;
  }

}
