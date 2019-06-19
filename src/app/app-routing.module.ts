import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearcherComponent } from './components/searcher/searcher.component';
import { StatsComponent } from './components/stats/stats.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  /* { path: '', component: SearcherComponent }, */
  { path: '', pathMatch: 'full', redirectTo: 'buscador' },
  { path: 'buscador', component: SearcherComponent },
  { path: 'estadisticas', component: StatsComponent },
  { path: 'acerca-de', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'buscador' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
