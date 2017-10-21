import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

import { DataService } from "./data/data.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search', component:SearchComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
