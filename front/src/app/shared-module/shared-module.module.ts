import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../auth/components/header/header.component';
import { PostHeaderComponent } from '../post/components/header/header.component';
import { ButtonComponent } from '../post/components/button/button.component';
import { PostcardComponent } from '../post/components/postcard/postcard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PostHeaderComponent,
    ButtonComponent,
    PostcardComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    PostHeaderComponent,
    ButtonComponent,
    PostcardComponent,
  ],
})
export class SharedModuleModule {}
