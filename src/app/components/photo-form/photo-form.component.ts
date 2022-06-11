import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement | EventTarget | null;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})

export class PhotoFormComponent implements OnInit {

  file!: File;
  photoSelected!: string | ArrayBuffer | null;

  constructor(private photoService :PhotoService, private router : Router) { }

  ngOnInit(): void { }

  onPhotoSelected(event : HtmlInputEvent): void {

    let input = event.target as HTMLInputElement;
    let files = input.files; 

    if(files  && files[0]){
      this.file = <File>files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);

    }
  }
  uploadPhoto(title : HTMLInputElement, description : HTMLTextAreaElement): boolean{
    this.photoService.createPhoto(title.value, description.value, this.file)
     .subscribe({
        next : (res)=> this.router.navigate(['/photos']),
        error : (err)=> console.log(err)
      });
    return false;
}
}
      
