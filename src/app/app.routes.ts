import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { ListproductsComponent } from './components/listproducts/listproducts.component';
import { ReleaselistComponent } from './components/releaselist/releaselist.component';

export const routes: Routes = [
  { path: 'home', component: BannerComponent},
  { path: 'listadeprodutos', component: ListproductsComponent},
  { path: 'listadelancamento', component: ReleaselistComponent},
  // { path: 'courses/new', component: FormsComponent, resolve: { course: courseResolver } },
  // { path: 'courses/edit/:id', component: FormsComponent,resolve: { course: courseResolver } },

  { path: '**', pathMatch: 'full', redirectTo: '/home'},
];
