/* ------ Third-party libraries ------ */
import { NgModule } from '@angular/core';

/* ------ Components ------ */
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class SharedModule {}
