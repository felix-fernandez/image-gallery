import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ImagesService } from '../services/images.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-images-gallery',
  templateUrl: 'images-gallery.page.html',
  styleUrls: ['images-gallery.page.scss'],
})
export class ImagesGalleryPage implements OnInit {

  // Número de elementos en cada carga de datos
  numberToShow = 20;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  dataList: Book[];
  currentList: Book[] = [];

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.imagesService.getList().subscribe(item => {
      this.dataList = item;
      this.currentList = this.initCurrentList();
    });
  }

  private initCurrentList() {
    return this.dataList.slice(0, this.numberToShow);
  }

  loadData(event) {
    if (this.currentList.length === this.dataList.length) {
      event.target.disabled = true;
    } else {
      setTimeout(() => {
        event.target.complete();
        this.currentList = this.getItems(this.currentList.length);
      }, 500);
    }
  }

  private getItems(listLength) {
    return this.currentList.concat(this.dataList.slice(listLength, listLength + this.numberToShow));
  }

  searchChanged(event) {
    this.imagesService.filterList(event.target.value || '');
    this.infiniteScroll.disabled = this.isScrollEnd();
  }

  private isScrollEnd(): boolean {
    return this.currentList.length === this.dataList.length;
  }
}
