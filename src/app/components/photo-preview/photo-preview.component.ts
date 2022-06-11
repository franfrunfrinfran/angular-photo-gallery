import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { PhotoService } from '../../services/photo.service';
import {Photo} from '../../interfaces/Photo'
@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id!: string;
  photo!: Photo;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private photoService:PhotoService
  ) { }

  ngOnInit(): void {
    
    this.activeRoute.params.subscribe(params =>{
      this.id = params['id']
      this.photoService.getPhoto(this.id)
      .subscribe({
        next : (res) => this.photo = res,
        error : (err) => console.log(err)
      })
    })
  }
  deletePhoto(id: string){
    this.photoService.deletePhoto(id)
    .subscribe({
            next : (res) => this.router.navigate(['/photos']) ,
            error : (err) => console.log(err)
    })
  }
    
  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement):boolean{
    this.photoService.updatePhoto(this.id, title.value, description.value)
    .subscribe({
      next : (res) => this.router.navigate(['/photos']) ,
      error : (err) => console.log(err)
    })
    return false;
  }
}
