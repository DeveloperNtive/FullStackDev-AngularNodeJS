import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NewpostComponent } from './newpost/newpost.component';
import { MypostComponent } from './mypost/mypost.component';
import { AllpostComponent } from './allpost/allpost.component';
import { ErropageComponent } from './erropage/erropage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'create-post', component: NewpostComponent },
      { path: 'my-post', component: MypostComponent },
      { path: 'all-post', component: AllpostComponent },
      {
        path: '',
        redirectTo: 'create-post',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: ErropageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
