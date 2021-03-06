import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { StatsComponent } from './components/stats/stats.component';
import { AboutComponent } from './components/about/about.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ExcelService} from 'src/app/service/excel.service';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule} from '@angular/common/http';
import 'chartjs-plugin-labels';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearcherComponent,
    StatsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
