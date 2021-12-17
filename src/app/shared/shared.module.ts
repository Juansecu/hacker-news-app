/* ------ Third-party libraries ------ */
import { NgModule } from '@angular/core';

/* ------ Pipes ------ */
import { TimeSincePipe } from './pipes/time-since.pipe';

/* ------ Components ------ */
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, TimeSincePipe],
  exports: [HeaderComponent, TimeSincePipe]
})
export class SharedModule {}
