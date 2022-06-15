import { Component, OnInit } from '@angular/core';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private photoService: PhotoService, private router: Router) { }


  ngOnInit(): void {
    this.photoService.getPhotos()
      .subscribe({
        next: (res) => {
          this.photos = res;
        },
        error: (err) => {
          console.log(err)
          if(err.status == 401) {
            this.router.navigate(['/auth/login'])
          }
        }
      })
  }

  selectedCard(id?: string) {
    this.router.navigate(['/main/photo', id])
  }

}
