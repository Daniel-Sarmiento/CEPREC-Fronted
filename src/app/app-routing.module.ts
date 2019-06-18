import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearcherComponent } from './components/searcher/searcher.component';
import { StatsComponent } from './components/stats/stats.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: SearcherComponent },
  { path: 'buscador', component: SearcherComponent },
  { path: 'estadisticas', component: StatsComponent },
  { path: 'acerca-de', component: AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
