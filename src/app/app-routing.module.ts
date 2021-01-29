import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'images-gallery',
    loadChildren: () => import('./images-gallery/images-gallery.module').then( m => m.ImagesGalleryPageModule)
  },
  {
    path: '',
    redirectTo: 'images-gallery',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
