/* ------ Third-party libraries ------ */
import { NgModule } from '@angular/core';

/* ------ Services ------ */
import { HackerNewsService } from './services/hacker-news.service';

@NgModule({
  providers: [HackerNewsService],
  exports: [HackerNewsService]
})
export class CoreModule {}
