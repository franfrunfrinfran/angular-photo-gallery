import { Injectable } from '@angular/core';
import { Photo } from '../interfaces/photo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  
  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.baseURL}/photos`);
  }

  getPhoto(id : string): Observable<Photo>{
    return this.http.get<Photo>(`${environment.baseURL}/photos/${id}`);
   }

  deletePhoto(id:string){
    return this.http.delete(environment.baseURL + '/photos/' + id);
   }

  updatePhoto(id: string, title: string, description: string){
   return this.http.put((`${environment.baseURL}/photos/${id}`), {title, description});
   } 

   createPhoto(title: string, description: string, photo: File){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    console.log(fd)
    
    return this.http.post(`${environment.baseURL}/photos`, fd);
  }

}
