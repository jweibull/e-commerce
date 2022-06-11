import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
