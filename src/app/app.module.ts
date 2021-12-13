/* ------ Third-party libraries ------ */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

/* ------ Routing ------ */
import { AppRoutingModule } from './app-routing.module';

/* ------ Modules ------ */
import { SharedModule } from './shared/shared.module';

/* ------ Components ------ */
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
