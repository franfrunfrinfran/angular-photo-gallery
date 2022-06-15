import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement | EventTarget | null;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  file!: File;
  photoSelected!: string | ArrayBuffer | null;

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
  }

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
        next : (res)=> this.router.navigate(['/main']),
        error : (err)=> console.log(err)
      });
    return false;
  }

}
