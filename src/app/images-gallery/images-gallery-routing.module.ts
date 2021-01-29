import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesGalleryPage } from './images-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesGalleryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesGalleryPageRoutingModule {}
