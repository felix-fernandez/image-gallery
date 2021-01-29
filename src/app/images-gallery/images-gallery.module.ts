import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ImagesGalleryPageRoutingModule } from './images-gallery-routing.module';
import { ImagesGalleryPage } from './images-gallery.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesGalleryPageRoutingModule
  ],
  declarations: [ImagesGalleryPage]
})
export class ImagesGalleryPageModule {}
