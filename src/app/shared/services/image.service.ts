import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
collectionName = "Images";

constructor(private afs: AngularFirestore, private storege: AngularFireStorage) { }


getAll(){
  return this.afs.collection<Image>(this.collectionName).valueChanges();
}
getImageByDay(day: string){
  return this.afs.collection<Image>(this.collectionName, ref => ref.where('day_name', '==', day)).valueChanges();
}
loadImage(imageUrl: string){

return this.storege.ref(imageUrl).getDownloadURL();
} 
}
