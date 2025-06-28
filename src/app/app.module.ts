import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NewsComponent } from './components/news/news.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewsFilterPipe } from './pipes/newsFilter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        NewsComponent,
        NewsFilterPipe
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ]
})
export class AppModule { }
