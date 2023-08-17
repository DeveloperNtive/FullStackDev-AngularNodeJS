import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { MegaMenuModule } from 'primeng/megamenu';

import { LayoutComponent } from './layout/layout.component';
import { ErropageComponent } from './erropage/erropage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './service/post.service';

@NgModule({
  declarations: [
    LayoutComponent,
    ErropageComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MegaMenuModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [LayoutComponent]
})
export class PostModule {}
