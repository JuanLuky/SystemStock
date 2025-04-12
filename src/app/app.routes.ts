import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListproductsComponent } from './pages/listproducts/listproducts.component';
import { ReleaselistComponent } from './pages/releaselist/releaselist.component';
import { WaitProcessComponent } from './shared/wait-process/wait-process.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Listadeprodutos', component: ListproductsComponent},
  { path: 'Listadelancamento', component: ReleaselistComponent},
  { path: 'Sair', component: WaitProcessComponent},
  // { path: 'courses/new', component: FormsComponent, resolve: { course: courseResolver } },
  // { path: 'courses/edit/:id', component: FormsComponent,resolve: { course: courseResolver } },

  { path: '**', pathMatch: 'full', redirectTo: '/home'},
];
