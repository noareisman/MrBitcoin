import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BitcoinAppComponent } from './pages/bitcoin-app/bitcoin-app.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AboutComponent } from './pages/about/about.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LineChartPipe } from './pipes/line-chart.pipe';
import { MoveListComponent } from './cmps/move-list/move-list.component';
import { MovePreviewComponent } from './cmps/move-preview/move-preview.component';
import { LoginComponent } from './pages/login/login.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserPreviewComponent } from './cmps/user-preview/user-preview.component';
import { UserSearchComponent } from './cmps/user-search/user-search.component';
import { MobileContactListComponent } from './pages/mobile-contact-list/mobile-contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BitcoinAppComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    WelcomePageComponent,
    AboutComponent,
    AppHeaderComponent,
    StatisticsComponent,
    LineChartPipe,
    MoveListComponent,
    MovePreviewComponent,
    LoginComponent,
    TransferFundComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    UserComponent,
    UserListComponent,
    UserPreviewComponent,
    UserSearchComponent,
    MobileContactListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
