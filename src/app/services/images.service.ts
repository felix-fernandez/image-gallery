import { Injectable } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';
import { Book } from '../models/book.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  // Número de elementos del array
  listSize = 4000;

  public list: Book[];
  public filteredList: BehaviorSubject<Book[]>;

  constructor() {
    this.list = this.createImageList(this.listSize);
    this.filteredList = new BehaviorSubject<Book[]>(this.list);
  }

  public getList() {
    return this.filteredList.asObservable();
  }

  public filterList(text: string) {
    this.filteredList.next(this.list.filter(item => String(item.id).includes(text) || item.text.includes(text)));
  }

  private createImageList(size: number) {
    const list: Book[] = [];

    for (let i = 1; i <= size; i++) {
      list.push({id: i, photo: this.getUrlPhoto(i), text: loremIpsum({count: 1, units: 'sentences'})});
    }

    return list;
  }

  private getUrlPhoto(id: number) {
    return `https://picsum.photos/id/${id}/500/500.jpg`;
  }
}
