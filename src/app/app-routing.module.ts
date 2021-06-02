import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BitcoinAppComponent } from './pages/bitcoin-app/bitcoin-app.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { UserComponent } from './pages/user/user.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'main', component: BitcoinAppComponent, canActivate: [AuthGuard], children: [
      { path: 'contact/:id', component: ContactDetailsComponent, resolve: { contact: ContactResolverService } },
      { path: 'edit/:id', component: ContactEditComponent },
      { path: 'edit', component: ContactEditComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  { path: '', component: WelcomePageComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { msg: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
