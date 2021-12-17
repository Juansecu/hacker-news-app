/* ------ Third-party libraries ------ */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/* ------ Modules ------ */
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';

/* ------ Pages ------ */
import { NewsPageComponent } from './news-page.component';

@NgModule({
  declarations: [NewsPageComponent],
  imports: [CommonModule, InfiniteScrollModule, NewsRoutingModule, SharedModule]
})
export class NewsModule {}
