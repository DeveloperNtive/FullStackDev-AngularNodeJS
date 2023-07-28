import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { MegaMenuModule } from 'primeng/megamenu';

import { MypostComponent } from './mypost/mypost.component';
import { AllpostComponent } from './allpost/allpost.component';
import { LayoutComponent } from './layout/layout.component';
import { ErropageComponent } from './erropage/erropage.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MypostComponent,
    AllpostComponent,
    LayoutComponent,
    ErropageComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MegaMenuModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
})
export class PostModule {}
