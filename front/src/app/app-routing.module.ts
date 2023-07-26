import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    title: 'FullStackDev - Auth',
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
    title: 'FullStackDev - Post',
  },
  // { path: '', redirectTo: 'post', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
